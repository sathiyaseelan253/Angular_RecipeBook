import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../Recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  recipeForm : FormGroup
  id : number;
  editMode : boolean = false;
  constructor(private route:Router, private activedRouter : ActivatedRoute, private recipeService : RecipeService){}
  ngOnInit(): void {
    this.activedRouter.params.subscribe((param:Params)=>{
      this.id = param["id"];
      this.editMode = param["id"] != null;
      this.initForm()
    });
  }

  private initForm(){
    let recipeName : string=''
    let description : string =''
    let imagePath : string = ''
    let ingredients = new FormArray([]);

    if(this.editMode){
      const fecthedRecipe = this.recipeService.getRecipeByID(this.id);
      recipeName = fecthedRecipe.name;
      description = fecthedRecipe.description;
      imagePath = fecthedRecipe.imagePath;
      if(fecthedRecipe['ingredients']){ 
        for(let ingredient of fecthedRecipe.ingredients){
          ingredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      name : new FormControl(recipeName,Validators.required),
      description : new FormControl(description,Validators.required),
      imagePath : new FormControl(imagePath, Validators.required),
      ingredients : ingredients
    });
  }
  onRecipeFormSubmit(){
    if(this.editMode){
      this.recipeService.UpdateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.AddRecipe(this.recipeForm.value);
    }
    this.OnClearRecipe();
  }
  get allIngredient(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }
  OnAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
      name:new FormControl(null,Validators.required),
      amount:new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }
  OnClearRecipe(){
    this.route.navigate(['../'],{ relativeTo:this.activedRouter});
  }
  OnDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
