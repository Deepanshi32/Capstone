import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginAdminData = {};
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = false;
  login: any;
  loginData = {
    "username": "admin",
    "password": "admin123"
  }

  @Output()
  newEventItem = new EventEmitter<string>();




  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private notifyService: NotificationService,) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      _id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    const { username } = this.loginForm.value;
    const { password } = this.loginForm.value;
  }

  // loginAdmin(){
  //   // if(this.username == 'admin' && this.password == 'admin'){
  //   //   this.router.navigate(["user"]);
  //   //  }else {
  //   //    alert("Invalid credentials");
  //   //  }
  //   this.loginService.getAuthentication().subscribe((res) =>{
  //         console.log(res);
  //         this.login = res;
  //       })
  // }

  // loginAdmin(){
  //   this.loginService.getAuthentication().subscribe((res) =>{

  //     console.log(res);
  //     this.login = res;

  //     this.router.navigate(["home"])
  //   })
  // }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  // }

  AdminLogin() {
    var loginData12 = {
      "username": this.loginForm.value.username,
      "password": this.loginForm.value.password
    }
    this.loginService.create(loginData12).subscribe((res) => {
      console.log(res);
      if (res.token !== null) {
        localStorage.setItem("token", res.token);
        this.notifyService.showSuccess("Correct Credentials !!", "Succesfully Login")
        this.router.navigateByUrl('/home');
      }
      else {
        console.log('Invalid Credentials');
      }
    },
      error => {

        this.error = true;

        // this.showToasterError();
        // alert('Invalid Credentials');

        this.notifyService.showError("Invalid Credentials !!", "OOPS!!")

      }
    )
    this.newEventItem.emit();
  }


}




