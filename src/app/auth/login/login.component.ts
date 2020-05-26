import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import Amplify, { Auth } from 'aws-amplify';

const config = {
	apiGateway: {
		REGION: 'ap-south-1',
		URL: 'http://covid-analytics.s3-website-us-east-1.amazonaws.com/'
	},
	cognito: {
		REGION: 'ap-south-1',
		USER_POOL_ID: 'ap-south-1_Ct79Btiw9',
		APP_CLIENT_ID: '5r7q0v7fn977hjuh4h7qfi1knt',
		IDENTITY_POOL_ID: 'ap-south-1:d8388abb-7353-47f9-bd94-ca7c519058bc'
	}
};

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: 'testApiCall',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			}
		]
	}
});

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit() {
    localStorage.clear()
  }

  async onLogin(form: NgForm) {
    var country;
    var latitude;
    var longitude;
    var AWS = require("aws-sdk");
		let awsConfig = {
			"region": "ap-south-1",
			"endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
			"accessKeyId": "AKIAYXEEGLFNPT2PSEMH", "secretAccessKey": "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"
		};
    AWS.config.update(awsConfig);
    fetch('http://ip-api.com/json')
			.then(response => response.json())
			.then(data => {
				country = data.country;
				latitude = data.lat;
				longitude = data.lon;
			});
      try {
        //connection with cognito
        await Auth.signIn(form.value.email, form.value.password);
        
        //on successfull authenitcation with cognito, store data to dynamo db
        var email_id = form.value.email;
        var country = country;
        var latitude = latitude;
        var longitude = longitude;
        var password = password;
        var uui = Date.now();
        var input = {
          "user_id": uui,
          "email_id": email_id,
          "country": country,
          "latitude": latitude,
          "longitude": longitude,
          "password": password
        };
        var params = {
          TableName: "covid_analytics_users",
          Item: input
        };

        // connection with dynamodb
        let docClient = new AWS.DynamoDB.DocumentClient();
        docClient.put(params, function (err, data) {
          if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));
          } else {
            localStorage.setItem('token', 'eyJraWQiOiI5dDV5eEpDVFBhSHNnWjFCQ1k5S3U4YkRUMmNWeHhrYVArZ3BNYmtoVFQ4PSIsImFsZyI6IlJTMjU2In0')
            window.location.href = window.location.origin+"/dashboard?userid="+uui;
          }
        });
      } catch (e) {
        alert(e.message);
      } 
  }

  ngOnDestroy() {
  }
}
