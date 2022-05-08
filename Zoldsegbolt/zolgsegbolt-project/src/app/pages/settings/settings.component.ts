import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loading:boolean = false;
  user?: User
  // updated?: Date

  settingsForm = new FormGroup({
    id: new FormControl(''),
    in_bucket: new FormControl(''),
    // updated: new FormControl(''),
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

  constructor(private location: Location,
              private authService: AuthService,
              private userService: UserService,
              private router: Router
              ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;

      this.settingsForm.get('id')?.setValue(this.user?.id);
      this.settingsForm.get('email')?.setValue(this.user?.email);
      this.settingsForm.get('in_bucket')?.setValue(this.user?.in_bucket);
      // this.settingsForm.get('updated')?.setValue(this.user?.updated);

      this.settingsForm.get('username')?.setValue(this.user?.username);
      this.settingsForm.get('name')?.get('firstname')?.setValue(this.user?.name.firstname);
      this.settingsForm.get('name')?.get('lastname')?.setValue(this.user?.name.lastname);
      this.settingsForm.get('address')?.setValue(this.user?.address);

    }, error => {
      console.log(error);
    });

    // todo test
    console.log('test:')
    console.log(this.userService.getAllOrderByEmail());
  }

  onSubmit(){
    this.loading = true;

    // this.settingsForm.get('updated')?.setValue(new Date(Date.now()).toISOString());

    this.userService.update(this.settingsForm.value).then(_ => {
      console.log('User updated');
      this.loading = false;
      this.router.navigateByUrl('/main');
    }).catch(error => {
      console.error(error);
      this.loading = false;
    });



  }

  goBack() {
    this.location.back();
  }

  deleteAcc() {
    this.loading = true;

    if (this.user != undefined){
      console.log(this.user.id);
      this.userService.delete(this.user.id).then(_ => {

        this.authService.deleteUser().then(_ => {
          this.loading = false;
          this.router.navigateByUrl('/login');
        }).catch(error => {
          console.error(error);
          this.loading = false;
        });


      }).catch(error => {
        console.error(error);
        this.loading = false;
      });
    }


  }

  // deleteAcc(){
  //   if (this.user != undefined)
  //     this.userService.delete(this.user?.id);
  // }

}
