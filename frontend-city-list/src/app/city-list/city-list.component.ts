import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {City} from "../model/city";
import {CityService} from "../service/city.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {map, switchMap} from "rxjs";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements AfterViewInit {

  cities: City[];
  searchText = "";
  displayedColumns = ["id", "name", "photo", "action"];
  recordCount: number = 0;
  city: City = new City();
  loginFlag: boolean = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;

  constructor(private cityService: CityService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.loginFlag = this.cityService.getLoginFlag();
    this.initialLoad();
    this.paginator?.page.pipe(
      switchMap(() => {
        let currentPage = (this.paginator?.pageIndex ?? 0);
        let pageSize = (this.paginator?.pageSize ?? 0);
        return this.cityService.getCityListPaging(currentPage, pageSize);
      }),
      map(result => result)
    ).subscribe(result => {
      if (result) {
        this.cities = result.content;
        this.recordCount = result.recordCount;
      }
    });
  }

  initialLoad() {
    let currentPage = (this.paginator?.pageIndex ?? 0);
    let pageSize = (this.paginator?.pageSize ?? 0);
    this.cityService.getCityListPaging(currentPage, pageSize).subscribe(result => {
      if (result) {
        this.cities = result.content;
        this.recordCount = result.recordCount;
      }
    });
  }

  private getCityByName() {
    this.cityService.getCityByName(this.searchText).subscribe(data => {
      this.city = data;
      this.cities = [];
      this.cities.push(this.city);
    });
  }

  updateCity(id: number) {
    this.router.navigate(['update-city', id]);
  }

  homeCities() {
    this.router.navigate(['cities']);
  }

  searchCity() {
    this.getCityByName();
    this.homeCities();
  }

}
