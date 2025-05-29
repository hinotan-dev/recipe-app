import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
// import { getRecipeFromChefClaude, getRecipeFromMistral } from "../ai"

export default function Main() {

  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe] = React.useState("Loading...")
  const [recipeShown, setRecipeShown] = React.useState(false)

  const recipeSection = React.useRef(null)
  
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  async function displayRecipe() {
    setRecipeShown(true)
    setRecipe("Loading...")

    // const recipeMarkdown = await getRecipeFromChefClaude(ingredients)

    try {
      const recipeMarkdown = await getRecipe(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error(err);
      setRecipe("Sorry, I couldn't generate a recipe at this time. Please try again.");
    }
  }

  async function getRecipe(ingredientsArr) {
    const res = await fetch('/api/get-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Unknown error occurred');
    }
    const data = await res.json();
    return data.recipe;
  }

  React.useEffect(()=>{
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe])

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input 
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 &&
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          displayRecipe={displayRecipe}
        />}
      
      {recipeShown && <ClaudeRecipe recipe={recipe} />}
    </main>
  )
}