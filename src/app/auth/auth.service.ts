import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

export interface SignUpResponseData{
    idToken:string
    email:string
    refreshToken:string
    expiresIn:string
    localId:string
    registered?:boolean
}
@Injectable({
    providedIn:'root'
})
export class AuthService{
    authApiNewUserURL : string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.fireBaseAPIKey;
    authApiLoginURL : string ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.fireBaseAPIKey;
    user = new BehaviorSubject<User>(null);
    tokenExpiryTimer : any;
    constructor(private http: HttpClient,private router:Router) {
    }
    onSignUpUser(userEmail:string,userPassword:string){
        return this.http.post<SignUpResponseData>(this.authApiNewUserURL,
        {
            email:userEmail,
            password:userPassword,
            returnSecureToken:true
        })
        .pipe(
            catchError(this.onHandleError),tap((responseData)=>{
                const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn*1000);
                this.onHandleAuthentication(responseData.email,responseData.localId,responseData.idToken,responseData.expiresIn)
            }))
    }
    private onHandleAuthentication(email,id,token,expiresIn){
        const expirationDate = new Date(new Date().getTime() + + expiresIn*1000);
        const user = new User(email,id,token,expirationDate);
        this.user.next(user);
        this.AutoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }
    onLoginUser(userEmail:string,userPassword:string){
        return this.http.post<SignUpResponseData>(this.authApiLoginURL,
        {
            email : userEmail,
            password:userPassword,
            returnSecureToken:true
        })
        .pipe(
            catchError(this.onHandleError),tap(responseData=>{
                const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn*1000);
                this.onHandleAuthentication(responseData.email,responseData.localId,responseData.idToken,responseData.expiresIn)
            })
        )
    }
   
    AutoLogin(){
        const userData : {
            email:string,
            id:string,
            _token:string,_tokenExpirationDate:string }
            = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expiryDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.AutoLogout(expiryDuration);
        }
    }

    Logout(){
        this.user.next(null);
        this.router.navigate(['./auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpiryTimer){
            clearTimeout(this.tokenExpiryTimer);
        }
        this.tokenExpiryTimer = null
    }
    
    AutoLogout(tokenExpiryDuration:number){
        this.tokenExpiryTimer = setTimeout(() => {
            this.Logout();
        }, tokenExpiryDuration);
    }
    private onHandleError(errorRes:HttpErrorResponse){
        let errorMessage = "An unknown error occurred!!";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case "EMAIL_EXISTS":
                errorMessage = "Email already exists!!";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "Email does not exists!!";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "Invalid password!!";
                break;
        }
        return throwError(errorMessage);
    }
}