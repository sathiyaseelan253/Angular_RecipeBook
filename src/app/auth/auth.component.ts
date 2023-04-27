import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, SignUpResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs-compat";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
    isLoginMode:boolean=true;
    isLoading:boolean = false;
    @ViewChild(PlaceholderDirective,{static:false}) alertHost : PlaceholderDirective
    closeSubcription : Subscription
    constructor(private authService:AuthService, private router:Router, private companyFactoryResolver: ComponentFactoryResolver) {
    }
    ngOnDestroy(): void {
        if(this.closeSubcription){
            this.closeSubcription = null;
        }
    }
    @ViewChild('authForm') authForm : NgForm
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onAuthformSubmit(){
        let authObservable : Observable<SignUpResponseData>;
        if(this.authForm.invalid){
            return;
        }
        this.isLoading = true;
        if(this.isLoginMode){
            authObservable =  this.authService.onLoginUser(this.authForm.value.email,this.authForm.value.password);
        }
        else{
            authObservable = this.authService.onSignUpUser(this.authForm.value.email,this.authForm.value.password)                               
        }
            authObservable.subscribe((responseData)=>{
                this.isLoading = false;
                this.router.navigate(['/recipes']);
                // this.error=null;
            },
            errorMessage=>{
                this.isLoading = false;
                this.showAlertPopup(errorMessage)
                console.log(errorMessage);
            });
       this.authForm.reset();
    }
    onClosePopup(){
        // this.error = null;
    }
    private showAlertPopup(message:string){
        const alertComponentFactory = this.companyFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const newComponent = hostViewContainerRef.createComponent(alertComponentFactory);
        newComponent.instance.message = message;

        this.closeSubcription = newComponent.instance.closePopupEvent.subscribe(()=>{
            this.closeSubcription.unsubscribe();
            hostViewContainerRef.clear();
        })
    }
}