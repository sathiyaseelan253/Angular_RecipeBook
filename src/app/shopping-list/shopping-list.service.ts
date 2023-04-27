import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredients } from "../shared/ingredients.model";

export class ShoppingListService{
    startedEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredients[]>();
    private ingredients : Ingredients[]= [
        new Ingredients('Apples','10'),
        new Ingredients('Oranges','20'),
        new Ingredients('Gauva','30')
      ];
      OnAdd(ingredients:Ingredients){
        this.ingredients.push(ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      OnUpdateIngredient(newIngredent:Ingredients,index:number){
        this.ingredients[index]=newIngredent;
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      getAllIngredients(){
        return this.ingredients.slice();
      }
      AddIngredientsToshoppingList(ingredients:Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
      getIngredient(index:number){
        return this.ingredients[index];
      }
      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

}