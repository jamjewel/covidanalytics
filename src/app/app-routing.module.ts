import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./posts/dashboard/dashboard.component";
import { CountryComponent } from "./posts/country/country.component";
import { MapComponent } from "./posts/map/map.component";
import { StagemakerComponent } from "./posts/stagemaker/stagemaker.component"

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "country", component: CountryComponent },
  { path: "map", component: MapComponent },
  { path: "analytics", component: StagemakerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
