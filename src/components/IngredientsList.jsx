export default function IngredientsList(props) {

  const ingredientsListItems = props.ingredients.map(item => (
    <li key={item}>{item}</li>
  ))

  return (
    <section className="ingredients-container">
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && <div className="get-recipe-container">
        <div ref={props.ref}>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button onClick={props.displayRecipe}>Get a recipe</button>
      </div>}
    </section>
  )
}