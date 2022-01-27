import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../model/city";
import {User} from "../model/user";
import {CityPaging} from "../model/city-paging";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseURL = "http://localhost:8080/api/cities";
  private user: User = new User();

  constructor(private httpClient: HttpClient) {
  }

  getCityList(): Observable<City[]> {
    return this.httpClient.get<City[]>((`${this.baseURL}`));
  }

  getCityById(id: number): Observable<City> {
    return this.httpClient.get<City>(`${this.baseURL}/${id}`);
  }

  getCityByName(name: string): Observable<City> {
    return this.httpClient.get<City>(`${this.baseURL}/search?name=${name}`);
  }

  updateCityByNameOrPhoto(id: number, name: string, photo: string): Observable<Object> {
    const authHeaders = new HttpHeaders({Authorization: 'Basic ' + btoa(this.user.username + ":" + this.user.password)});
    return this.httpClient.put(`${this.baseURL}/${id}?name=${name}&photo=${photo}`, null, {headers: authHeaders});
  }

  getCityListPaging(pageNumber: number, pageSize: number): Observable<CityPaging> {
    return this.httpClient.get<CityPaging>(`${this.baseURL}/pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  setUserProperty(username: string, password: string) {
    this.user.username = username;
    this.user.password = password;
  }

  getLoginFlag(): boolean {
    return (this.user.username && this.user.password) != null;
  }

}
