import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {linkWithCredential} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loading: boolean = false;

  loadingSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  async login() {
    this.loading = true;

    this.authService.login(this.email.value, this.password.value).then(linkWithCredential => {
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      this.loading = false;
    });
  }

}
