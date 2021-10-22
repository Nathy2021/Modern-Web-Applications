import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FooterComponent } from '../footer/footer.component';
import {User} from "../login/login.component"
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  @ViewChild("registrationForm")
  registrationForm!: NgForm;

  user!: User;
  constructor(private userService: UserServiceService,private _router:Router ) { }

  ngOnInit(): void {
  }
  onLogin() : void {
    this._router.navigate(["/login"])
  }

  onRegister(): void {
    console.log("user form submitted");
    console.log("body ", this.registrationForm.value);
    this.userService.addUser(this.registrationForm.value)
    this._router.navigate(["/games"])
    
  }
  // onClear() : void{

  // }

  // onSubmit() : void{

    
  // }

}
