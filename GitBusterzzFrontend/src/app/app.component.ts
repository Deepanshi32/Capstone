import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GitBusterzzFrontend';
  value = false;

  getHeaderState(){
    // console.log("calling header state")
    if(localStorage.getItem ("token")){
      this.value =true ;
    }
    return this.value;
  }

  logOut(){
    localStorage.removeItem("token");
    this.value =false ;
    this.router.navigateByUrl('/login');
  }

  constructor(private router: Router) { }

}
