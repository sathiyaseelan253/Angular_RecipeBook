import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../Recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipeSelected:Recipe;
  id : number;
  
  constructor(private shoppingListService:ShoppingListService,private activatedRoute:ActivatedRoute, private recipeService : RecipeService, private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params)=>{
      this.id = +param["id"];
      this.recipeSelected = this.recipeService.getRecipeByID(this.id);
    })
  }
  AddIngredientsToshoppingList(){
    this.shoppingListService.AddIngredientsToshoppingList(this.recipeSelected.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.activatedRoute});
  }
  onDeleteRecipe(){
    this.recipeService.DeleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo:this.activatedRoute});
  }
}
