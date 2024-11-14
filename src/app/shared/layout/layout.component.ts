import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  username: string = '';

  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    const userToken = this.sharedService.getSession();

    if (userToken != null) {
      this.username = userToken.username;
    }
  }

  logOut(): void {
    this.sharedService.deleteSession();
    this.router.navigate(['login']);
  }
}
