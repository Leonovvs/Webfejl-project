import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import { Location } from '@angular/common';
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading:boolean = false;

  registrationForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    }),
    address: new FormControl('')
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    console.log(this.registrationForm.value);
    this.authService.signup(this.registrationForm.get('email')?.value, this.registrationForm.get('password')?.value).then(credential => {
      console.log(credential);
      const user: User = {
        id: credential.user?.uid as string,
        email: credential.user?.email as string,
        username: this.registrationForm.get('username')?.value,
        name: {
          firstname: this.registrationForm.get('name.firstname')?.value,
          lastname:this.registrationForm.get('name.lastname')?.value,
        },
        address: this.registrationForm.get('address')?.value,
        in_bucket: [],
        // updated: new Date(Date.now()).toISOString()
      }

      this.userService.create(user).then(_ => {
        console.log('User added to database');
        this.loading = false;
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
        this.loading = false;
      });

    }).catch(error => {
      console.error(error);
      this.loading = false;
    });
  }


  goBack() {
    this.location.back()
  }
}
