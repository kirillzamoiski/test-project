import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CityListComponent} from "./city-list/city-list.component";
import {UpdateCityComponent} from "./update-city/update-city.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'cities', component: CityListComponent},
  {path: 'update-city/:id', component: UpdateCityComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'cities', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
