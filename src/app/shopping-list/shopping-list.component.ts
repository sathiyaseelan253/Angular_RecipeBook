import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredients[] =[];
  ingredientsChangedSubject : Subscription

  constructor(private shoppingListService:ShoppingListService){}
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAllIngredients();
    this.ingredientsChangedSubject = this.shoppingListService.ingredientsChanged.subscribe((updatedIngredients)=>{
      this.ingredients = updatedIngredients;
    })
  }
  ngOnDestroy(): void {
    this.ingredientsChangedSubject.unsubscribe();
  }
  onEditShoppingListItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
}
