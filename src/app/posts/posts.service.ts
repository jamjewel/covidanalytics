import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/globalCovid/";

@Injectable({ providedIn: "root" })
export class PostsService {

  constructor(private http: HttpClient, private router: Router) {}

  getTotalDetails() {
    return this.http.get(BACKEND_URL + 'totalDetails')
  }

  getUserCountry(country) {
    return this.http.get(environment.apiUrl + "/user/userlog/" + country)
  }

  getCountryDetails() {
    return this.http.get(BACKEND_URL + 'getAllCountrywise')
  }

  getTop10Countries() {
    return this.http.get(BACKEND_URL + 'getTop10Countries')
  }

  getCountryTimelineDetails(country) {
    return this.http.get(BACKEND_URL + 'getTimelineCountrywise/'  + country)
  }

  getCountryDailyTimelineDetails(country) {
    return this.http.get(BACKEND_URL + 'country/' + country)
  }
  
}
