import {Component, OnInit} from '@angular/core';
import {CityService} from "../service/city.service";
import {ActivatedRoute, Router} from "@angular/router";
import {City} from "../model/city";

@Component({
  selector: 'app-update-city', templateUrl: './update-city.component.html', styleUrls: ['./update-city.component.css']
})
export class UpdateCityComponent implements OnInit {

  id: number;
  city: City = new City();

  constructor(private cityService: CityService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cityService.getCityById(this.id).subscribe(data => {
      this.city = data;
    })
  }

  onSubmit() {
    this.cityService.updateCityByNameOrPhoto(this.id, this.city.name, this.city.photo).subscribe(data => {
      this.showCityList();
    });
  }

  showCityList() {
    this.router.navigate(['/cities']);
  }

}
