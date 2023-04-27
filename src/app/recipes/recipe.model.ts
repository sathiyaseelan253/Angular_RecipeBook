import { Ingredients } from "../shared/ingredients.model";

export class Recipe{
    public name : string;
    public description : string;
    public imagePath : string;
    public ingredients : Ingredients[]

    constructor(recipeName:string,recipeDesc : string, imgPath : string, ingredients : Ingredients[]) {
        this.name = recipeName;
        this.description = recipeDesc;
        this.imagePath = imgPath;
        this.ingredients = ingredients;
    }
}