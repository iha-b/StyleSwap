import { Component } from '@angular/core';
import {Parse} from 'parse';

import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router
  ) { }

  title = 'angular-integration';
  ngOnInit(): void {
    if (!Parse.User.current()) {
      this.router.navigateByUrl('/');
    }
  }
  logOut() {
    Parse.User.logOut();
    this.router.navigateByUrl('/');
  }

}
