import { EventEmitter } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredients.model";
import { Subject } from "rxjs";

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    private recipes : Recipe[] =[];

      selectedRecipe = new EventEmitter<Recipe>();

      setRecipesFromDatabase(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes():Recipe[]{
        return this.recipes.slice();
      }
      getRecipeByID(index:number){
        return this.recipes.slice()[index];
      }
      AddRecipe(newRecipe:Recipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      UpdateRecipe(index:number,updatedRecipe:Recipe){
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      DeleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}