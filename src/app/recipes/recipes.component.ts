import { Component, OnInit } from '@angular/core';

import { RecipeService } from './Recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(){}
}
