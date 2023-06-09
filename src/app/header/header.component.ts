import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  userSubscription:Subscription;
  isAuthenticated:boolean=false;
  
  constructor(private dataStorageService:DataStorageService,private authService:AuthService) {
  }
 
  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((response)=>{
      this.isAuthenticated = response?true:false;
      console.log("Logged In status:",this.isAuthenticated);
    })
  }
  onSaveRecipes(){
    this.dataStorageService.storeRecipes();
  }
  onFetchRecipes(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.Logout();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
