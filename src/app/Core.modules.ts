import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./auth/auth.interceptor.service";
import { RecipeService } from "./recipes/Recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AuthGuard } from "./auth/auth-guard";

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService, 
        AuthGuard,
        {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
      ],
})
export class CoreModule{}