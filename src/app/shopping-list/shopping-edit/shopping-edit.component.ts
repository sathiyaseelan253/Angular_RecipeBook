import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('shoppingListForm',{static:false}) shoppingFormInputs : NgForm
  constructor(private shoppingListService:ShoppingListService){}
  editMode:boolean;
  editITemIndex:number;
  subscription:Subscription;
  editedIngredient : Ingredients
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index:number)=>{
      this.editITemIndex = index;
      this.editMode = true;
      this.editedIngredient = this.shoppingListService.getIngredient(index);

      this.shoppingFormInputs.setValue({
        Name:this.editedIngredient.name,
        amount:this.editedIngredient.amount
      });
    });
  }
  
  AddOrUpdateShoppingList(){
    const ingredients = new Ingredients(this.shoppingFormInputs.value.Name,this.shoppingFormInputs.value.amount);
    if(this.editMode){
      this.shoppingListService.OnUpdateIngredient(ingredients,this.editITemIndex);
    }else{
      this.shoppingListService.OnAdd(ingredients);
    }
    this.editMode = false;
    this.shoppingFormInputs.reset();
  }
  onClearShoppingList(){
    this.shoppingFormInputs.reset();
    this.editMode = false;
  }
  OnDeleteIngredient(){
    this.shoppingFormInputs.reset();
    this.shoppingListService.deleteIngredient(this.editITemIndex);
    this.editMode = false;
  }
}
