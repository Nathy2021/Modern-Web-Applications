import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm")
  loginForm!: NgForm;
  constructor(private userService: UserServiceService,private _router:Router ) { }

  ngOnInit(): void {
  }

  onClear() : void {

  }

  onRegister() : void {
    this._router.navigate([""])
    
  }

  onLogin(): void {
    console.log("user form submitted");
    console.log("body ", this.loginForm.value);
    this.userService.login(this.loginForm.value)
    this._router.navigate(["/games"])
    
  }
  

}

export class User {
  username!: string;
  password!: string;  
}

