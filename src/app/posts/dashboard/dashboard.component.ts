import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from "../posts.service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  totalWorldDetails: any;
  totalCountryWiseDetails: string[];
  top10Countries = {};
  countryWithHeightIssues: any;
  chartOptions = {}
  countryActive: any = {};
  countryDeaths: any = {};
  countryRecovered: any = {};
  countryCases: any = {};
  countryCritical: any = {};

  isLoading = false;
  userIsAuthenticated = false;

  constructor(
    public postsService: PostsService
  ) {
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') == undefined || localStorage.getItem('token') == null) {
      window.location.href = window.location.origin + "/login";
      return
    }

  }

  ngOnInit() {
    this.getUserCountry();
    this.getCountryDetails();
    this.getTotalDetails();
    this.getTop10Countries();
  }

  getUserCountry() {
    var country = parseInt(window.location.search.split('=')[1])
    debugger
    if ((country == undefined || country == null)) return
    this.postsService.getUserCountry(country).subscribe((data: any) => {
      debugger
      localStorage.setItem('userDetails', JSON.stringify(data.Item))
    }, () => {
      this.isLoading = false;
    });

  }

  getTotalDetails() {
    this.postsService.getTotalDetails().subscribe((data: any) => {
      this.totalWorldDetails = data.filter(function (obj) {
        return obj.country == 'World';
      })[0];
    }, () => {
      this.isLoading = false;
    });

  }

  getCountryDetails() {
    this.postsService.getCountryDetails().subscribe((data: any) => {
      this.totalCountryWiseDetails = data.filter((item) => item.country !== 'World');;
      this.countryActive = this.getCountryWiseCases("active", "#4469ad");
      this.countryDeaths = this.getCountryWiseCases("deaths", "#e44a00");
      this.countryRecovered = this.getCountryWiseCases("recovered", "#398f46");
      this.countryCases = this.getCountryWiseCases("cases", "#4469ad");
      this.countryCritical = this.getCountryWiseCases("critical", "#e44a00");
    }, () => {
      this.isLoading = false;
    });
  }

  getTop10Countries() {
    this.postsService.getTop10Countries().subscribe((data: any) => {
      this.top10Countries = data.filter((item) => item.country !== 'World');
      this.countryWithHeightIssues = this.top10Countries[0];
    }, () => {
      this.isLoading = false;
    });
  }

  getCountryWiseCases(param, colorparam) {
    let chartData = [];
    let map = {};

    this.totalCountryWiseDetails.forEach(function (item) {
      map = {};
      map['label'] = item['country'];
      if (item[param] == null) {
        map['value'] = 0;
      } else {
        map['value'] = parseInt(item[param])
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
        "plotToolText": "Country: $label <br> Cases: $dataValue <br> $displayValue",
        "theme": "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    };
  }

  selectedCountry(country) {
    window.open(location.origin + "/country?country=" + country, '_blank');

  }
}
