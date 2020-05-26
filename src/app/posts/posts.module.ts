import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CountryComponent } from './country/country.component'
import { StagemakerComponent } from "./stagemaker/stagemaker.component"
import { MapComponent } from './map/map.component'
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [ 

    DashboardComponent, 
    CountryComponent, 
    StagemakerComponent,
    MapComponent, 
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FusionChartsModule,
    NgbModule.forRoot()
  ]
})
export class PostsModule {}
