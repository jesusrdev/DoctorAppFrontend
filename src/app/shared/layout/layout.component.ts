import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  username: string = '';

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const userSession = this.sharedService.getSession();

    if (userSession != null) {
      this.username = userSession;
    }
  }

  logOut(): void {
    this.sharedService.deleteSession();

    this.cookieService.delete('Authorization', '/');

    this.router.navigate(['login']);
  }
}
