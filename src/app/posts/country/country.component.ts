import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from "../posts.service";
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: "country",
  templateUrl: "./country.component.html",
  styleUrls: ["./country.component.scss"]
})
export class CountryComponent implements OnInit {

  highcharts = Highcharts;
  isLoading = false;
  userIsAuthenticated = false;
  newCasesTimelineCountryDetails: any = {};
  casesTimelineCountryDetails: any = {};
  recoveredTimelineCountryDetails: any = {};
  deathsTimelineCountryDetails: any = {};
  confirmTimelineCountryDetails: any = {};

  countryTotalCases: any;
  countryTotalDeaths: any;
  countryTotalRecovered: any;
  countryTotalConfirmed: any;

  summaryData: any;
  summaryDetailData: any;
  countryList: any;

  total_cases_per_million: any;
  new_cases_per_million: any;
  population: any;
  median_age: any;
  aged_65_older: any;
  aged_70_older: any;

  closeResult: string;
  selectedOption: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public postsService: PostsService
  ) {
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') == undefined || localStorage.getItem('token') == null) {
      window.location.href = window.location.origin + "/login";
      return
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.country == undefined || params.country == null || params.country == '') {
        var details = JSON.parse(localStorage.getItem('userDetails'));
        this.countryList = details.country;
      } else {
        this.countryList = params.country;
      }
    });
  }

  ngOnInit() {
    this.getCountryTimelineDetails(this.countryList);
    this.getCountryDailyTimelineDetails(this.countryList);
  }

  getCountryTimelineDetails(country) {
    this.postsService.getCountryTimelineDetails(country).subscribe((data: any) => {
      this.summaryData = data;
      this.casesTimelineCountryDetails = this.getCharts(data, 'Date', "Active", '#4469ad')
      this.recoveredTimelineCountryDetails = this.getCharts(data, 'Date', "Recovered", '#398f46')
      this.deathsTimelineCountryDetails = this.getCharts(data, 'Date', "Deaths", '#e44a00')
      this.confirmTimelineCountryDetails = this.getCharts(data, 'Date', "Confirmed", '#278a81');

      var lastElement = data[data.length - 1];
      this.countryTotalCases = lastElement['Active'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.countryTotalDeaths = lastElement['Deaths'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.countryTotalRecovered = lastElement['Recovered'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.countryTotalConfirmed = lastElement['Confirmed'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }, () => {
      this.isLoading = false;
    });
  }


  getCountryDailyTimelineDetails(country) {
    this.postsService.getCountryDailyTimelineDetails(country).subscribe((data: any) => {
      this.newCasesTimelineCountryDetails = this.getCharts(data, 'date', "new_cases", '#4469ad')
      var lastElement = data[data.length - 1];
      this.total_cases_per_million = lastElement['total_cases_per_million'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.new_cases_per_million = lastElement['new_cases_per_million'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.population = lastElement['population'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.median_age = lastElement['median_age'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.aged_65_older = lastElement['aged_65_older'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.aged_70_older = lastElement['aged_70_older'].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }, () => {
      this.isLoading = false;
    });
  }

  getCharts(data, param1, param2, colorparam) {
    // adding data to chart
    let chartData = [];
    let map = {};

    data.forEach(function (item) {
      map = {};
      map['label'] = moment(item[param1]).format('DD-MM-YYYY');
      if (item[param1] == null) {
        map['value'] = 0;
      } else {
        map['value'] = parseInt(item[param2])
      }
      map['color'] = colorparam;
      chartData.push(map);
    });
    return {
      chart: {
        "formatnumberscale": "1",
        "formatnumber": "1",
        "numberscalevalue": "1000,1000,1000",
        "numberscaleunit": "K,M,B",
        "plotToolText": "Date: $label <br> Cases: $dataValue <br> $displayValue",
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    };
  }
}
