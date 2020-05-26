import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(
  ) {
    if(localStorage.getItem('token') === "" || localStorage.getItem('token') == undefined || localStorage.getItem('token') == null) {
      window.location.href = window.location.origin+"/login";
      return
    }
  }
}
