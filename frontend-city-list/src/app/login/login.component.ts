import { Component, OnInit } from '@angular/core';
import {CityService} from "../service/city.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.cityService.setUserProperty(this.username, this.password);
    this.homeCities();
  }

  homeCities() {
    this.router.navigate(['/cities']);
  }

}
