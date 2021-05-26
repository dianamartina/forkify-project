import * as model from './model.js';
import recipeView from './view/recipeView.js';

import 'core-js/stable'; //for polyfilling  others, provide modern functionality on older browsers that do not natively support it.
import 'regenerator-runtime/runtime'; // for polyfilling async-await, provide modern functionality on older browsers that do not natively support it.

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // preluam query string
    console.log(id);
    // daca nu avem id
    if (!id) return;
    recipeView.renderSpinner();

    renderSpinner(recipeContainer); // afiseaza spinner pana primim datele

    //1) Loading recipe
    await model.loadRecipe(id);

    //2) Rendering recipe
    //render este o metoda
    recipeView.render(model.state.recipe);
  } catch (err) {
    // afiseaza eroarea preluata mai sus
    alert(err);
  }
};

// controlRecipes();

// Event listeners

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
//rescriem ce este mai jos
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
