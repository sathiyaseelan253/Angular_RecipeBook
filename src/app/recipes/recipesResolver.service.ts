import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './Recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

constructor(private dataStorageService:DataStorageService, private recipeService:RecipeService) { }

  resolve(): any{
    const recipes = this.recipeService.getRecipes();
    if(recipes.length == 0){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipes;
    }
  }

}