import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface AfterViewInitt {
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInitt {

  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  @Input() loggedInUser?: firebase.default.User | null;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  menuSwitch(){
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean){
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }

}
