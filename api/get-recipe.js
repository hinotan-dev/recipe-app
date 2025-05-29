import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `
You're Chef Claude, a friendly expert in turning everyday ingredients into delicious meals.
You receive a list of ingredients that a user has and suggest a recipe they could make with some 
or all of those ingredients. You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many 
extra ingredients. Format your response in markdown to make it easier to render to a web page. 
Use metric system for the units. Use abbreviation for tablespoon and teaspoon.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ingredients } = req.body;

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid ingredients format' });
  }

  try {
    const ingredientsString = ingredients.join(', ');

    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });

    res.status(200).json({ recipe: msg.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
}
