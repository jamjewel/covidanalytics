import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = true;

  constructor(private router: Router) {
    if(window.location.pathname == "/login") {
      this.userIsAuthenticated = false;
    } else {
      this.userIsAuthenticated = true;
    }
  }

  ngOnInit() {
    console.log(this.router.url);
  }

  onLogout() {
    
  }

  ngOnDestroy() {
   
  }
}
