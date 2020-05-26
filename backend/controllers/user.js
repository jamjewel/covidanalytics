
exports.userLogin = (req, res, next) => {
 
  var id = req.params.id;
  console.log(id)
  var AWS = require("aws-sdk");
  debugger
  let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAYXEEGLFNPT2PSEMH", "secretAccessKey": "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"
  };
  AWS.config.update(awsConfig);
  
  let docClient = new AWS.DynamoDB.DocumentClient();
  
  var params = {
    TableName: "covid_analytics_users",
    Key: {
      "user_id": parseInt(id)
    }
  };
  docClient.get(params, function (err, data) {
    if (err) {
      console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
    }
    else {
      console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
      res.json(data);
    }
  })
  
  
}
