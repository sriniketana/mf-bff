module.exports = (options) => {
	const app = require('express')()
	const mf = options.mf;
	/********************************************************************************
	Below is a sample.

	sendNotification 		: Sends a notification to all devices that have registered for push service.
							  Consumes a single string as a mandatory paramter that contains the message of the push notification.


	setProperty		 		: Sets a live update property on the MF server's live update settings
							  Consumes below parameters in order :
							  	1. Property ID (mandatory)
							  	2. Property name (mandatory)
							  	3. Property default value (mandatory)
								4. Property descriptioon (optional)
								  
	sendCustomLogs 			: Sends the custom data that is mentioned as "customDataMap" in the input json. 
					 		  This custom data is available on the analytics console to build custom charts.

	********************************************************************************/
	app.post('/order',mf.securityUtils.mfpAuth('accessRestricted'), (req, res) => {
		var messageText = "Hello world from MFP";
		mf.push.sendNotification(messageText);

		mf.liveupdate.setProperty('bcg1', 'background', 'blue', "Property that is used to set background color");
		
		/* Below push related user context data is obtained using the "securityUtils.mfpAuth" filter in the app.get request and 
		sent to the analytics server. Hence the push parameters are passed to the "mf-security" module and push scope is sent to the 
		filter as a parameter. */

		var userContext = JSON.stringify(req.securityContext);
		userContext = userContext.replace('mfp-application', 'mfpapplication'); //This is done to avoid json accessing errors
		userContext = userContext.replace('mfp-device', 'mfpdevice'); 
		userContext = userContext.replace('mfp-user', 'mfpuser');
		userContext = JSON.parse(userContext);
			
			var datetime = new Date();
			var customLogInputs = {
				"serverIpAddress": mf.analytics.mf_url,
				"customDataMap": {
					"client id": userContext.client_id
				},
				"timestamp": datetime,
				"timezone": "60",
				"appVersion": userContext.mfpapplication.version,
				"appName": "IBM Acme App",
				"appID": userContext.mfpapplication.id,
				"appVersionCode": userContext.mfpapplication.version,
				"deviceID": userContext.mfpdevice.id,
				"deviceModel": "iPhone6,2",
				"deviceBrand": "Apple",
				"deviceOS": "iOS",
				"deviceOSversion": "9.2.1"
			};
			
		mf.analytics.sendCustomLogs(customLogInputs);

		mf.push.sendNotificationByUsers(messageText, [userContext.mfpuser.id] );
		
		mf.push.sendNotificationByDeviceIds(messageText, [userContext.mfpdevice.id]);

		res.send("Order placed!");
	});
	
	var port = process.env.PORT || 8080;
	app.listen(port);
	console.log('Node.js web server at port 7000 is running..');
	
	/*
	app.get('/analytics/networktransactions', (req, res) => {
		
		
		var networkLogInputs = {
			"resourceURL": "http://9.8.7.6:9080/some/path",
			"responseCode": "200",
			"requestMethod": "GET",
			"loginModuleName": "My Login Module",
			"realmName": "userCredChallengerRealm",
			"sessionID": "jfkld789087f908s",
			"trackingID": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
			"serverIpAddress": "172.16.254.1",
			"bytesReceived": "2300",
			"bytesSent": "120",
			"serverProcessingTime": "289",
			"backendProcessingTime": "95",
			"adapterName": "MyAdapter",
			"procedureName": "MyProcedure",
			"authenticator": "com.ibm.acme.MyAuthenticator",
			"loginModule": "com.ibm.acme.MyLoginModule",
			"authSuccess": false,
			"validationCode": "TOKEN_FAILED_MISSING_PARAMETER",
			"roundTripTime": "598",
			"inboundTimestamp": "2020-05-03T05:12:53.459Z",
			"outboundTimestamp": "2020-05-03T05:12:53.459Z",
			"userAgent": "Mozilla/5.0 (Linux; U; Android 4.0.3; ...",
			"appVersion": "2.0 Beta",
			"appName": "IBM Acme App",
			"appID": "com.ibm.acme",
			"appVersionCode": "2",
			"deviceID": "518c66913ec337f0",
			"deviceModel": "iPhone6,2",
			"deviceBrand": "Apple",
			"deviceOS": "iOS",
			"deviceOSversion": "9.2.1",
			"timestamp": "2020-05-03T05:12:53.459Z",
			"timezone": "60"
		};
		
		analytics.sendNetworkTransactions(networkLogInputs);
		res.send("Network logs have been sent!");
		
	});*/
	
	return app;
};
