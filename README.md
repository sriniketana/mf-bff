# Node.js Mobile Foundation Stack

The Node.js Mobile Foundation stack extends the Node.js Express stack. Mobile Foundation service is a scalable, secure Mobile access gateway that radically simplifies integration with backend and cloud services. This stack provides clean and low-code path to consume some prominent Mobile Foundation services directly.

This stack is based on Node.js v12, Express v4.17.x and Mobile Foundation v8.0. The Mobile Foundation services provided in this stack are push, liveupdate and analytics.


#Templates
<h2>Simple</h2>
A single template "simple" is provided in this stack. The developer can directly start with their Node.js application development. The starting point in the "simple" template is the `app.js` file. The developer can introduce their application logic by including the starter code already provided in this file. All the APIs are available to use with this template.


#Push
Push notification is the ability of a mobile device to receive messages that are pushed from a server. Notifications are received regardless of whether the application is currently running.

<h4>Push APIs provided in this stack:</h4>
- sendNotification
- sendNotificationByTags
- sendNotificationByPlatform

#Live Update
The Live Update feature in Mobile Foundation provides a simple way to define and serve different configurations for users of an application. It includes a component in the MobileFirst Operations Console for defining the structure of the configuration as well as the values of the configuration. 

<h4>Live update APIs provided in this stack:</h4>
- isFeatureEnabled
- toggleFeature
- enableFeature
- disableFeature
- getProperty
- setProperty

#Analytics
To keep your user engagement relevant and effective you must obtain insights into how your application is performing with users. IBM MobileFirst Foundation Operational Analytics provides this capability with in-built visualizations (charts and tables). With very minimal instrumentation of your application, you can readily visualize, on the Mobile Foundation Analytics console various actionable insights

<h4>Analytics APIs provided in this stack:</h4>
- sendCustomLogs
- sendNetworkTransactions


##Getting Started
1. Create a new folder in your local directory and initialize it using the Appsody CLI, e.g.:

    ```bash
    mkdir mf-project
    cd mf-project
    appsody init nodejs-mobile-foundation
    ```

    This will initialize a Node.js Mobile Foundation project using the default "simple" template. 
    
1. After your project has been initialized you can then run your application using the following command:

    ```bash
    appsody run --docker-options "--env MF_ENVVARS={\"push\":{\"mf_url\":\"<MFSERVER>\",\"mf_app_id\":\"<APPID>\",\"username\":\"<UNAME>\",\"password\":\"<PWD>\"},\"liveupdate\":{\"mf_url\":\"<MFSERVER>\",\"mf_app_id\":\"<APPID>\",\"username\":\"<UNAME>\",\"password\":\"<PWD>\"},\"analytics\":{\"mf_url\":\"<MFSERVER>\",\"mf_app_name\":\"<APPNAME>\",\"username\":\"<UNAME>\",\"password\":\"<PWD>\"}}""
    ```
Each of the placeholder is explained below :
	*	\<MFSERVER>    
	`The Mobile Foundation server URL. Example :"https://1.2.3.4:5678" (Note the complete server address including the port is necesssary)`
	* \<APPID>    
	`The application's app ID. Example : "com.ibm.mf"`
	* \<UNAME>	
	`The confidential client username. Example : "test"`
	* \<PASSWORD>		
		`The confidential client' password. Example : "test"`
	* \<APPNAME>		
	 	`The application's name. Example : "IBM MF App"`


    This launches a Docker container that continuously re-builds and re-runs your project, exposing it on port 3000.

    You can continue to edit the application in your preferred IDE (VSCode or others) and your changes will be reflected in the running container within a few seconds.


#API Reference

##Push
    sendNotification

    Description      : Sends a push notification to all registered devices with the provided message.
    Input paramaters : 'messageText'    : string (ex. "Hi from Mobile First!")
                       'messageOptions' : json (Various settings can be sent in a valid json)
    Output           : returns          : promise => on success resolves with the schema
                                                  on error, rejects with the error
                   
                                                  
    sendNotificationByTags     

    Description      : Sends a push notification to all registered devices with specified tags with the provided message.
    Input paramaters : 'messageText'    : string (ex. "Hi from Mobile First!")
                       'tags'           : array of strings (ex. ["tag1","tag2"])
                       'messageOptions' : json (Various settings can be sent in a valid json)
    Output           : returns          : promise => on success resolves with the schema
                                                  on error, rejects with the error
                  
                  
                                                  
    sendNotificationByPlatforms 

    Description      : Sends a push notification to all registered of specified platforms devices with the provided message.
    Input paramaters : 'messageText'    : string (ex. "Hi from Mobile First!")
                       'platforms'      : array of strings (ex. ["A,G"])
                       'messageOptions' : json (Various settings can be sent in a valid json)
    Output           : returns          : promise => on success resolves with the schema
                                                  on error, rejects with the error

##Live Update
    isFeatureEnabled      

    Description      : Checks if the feature with provided feature id is enabled or not
    Input paramaters : 'featureId'   : string (ex. "samplefeature1"),
    Output           : returns       : promise => on success resolves with boolean value - true if feature is enabled, false if it is disabled, 
                                                  on error, rejects with the error
                                                  
                                                  
	toggleFeature      

    Description      : Toggles the feature with provided feature id. Sets the feature to enabled if it is disabled,
                       sets the feature to disabled if it is enabled 
    Input paramaters : 'featureId'   : string (ex. "samplefeature1"),
    Output           : returns       : promise => on success (response status code = 200) resolves with success message
                                                  on any other response (status code != 200), rejects with a failure message
                                                  on error, rejects with the error
                                                  
                                                  
    enableFeature      

    Description      : Enables the feature with provided feature id. 
    Input paramaters : 'featureId'   : string (ex. "samplefeature1"),
    Output           : returns       : promise => on success (response status code = 200) resolves with success message
                                                  on any other response (status code != 200), rejects with a failure message
                                                  on error, rejects with the error
                                                  
                                                  
                                                  
    disableFeature      

    Description      : Disables the feature with provided feature id. 
    Input paramaters : 'featureId'   : string (ex. "samplefeature1"),
    Output           : returns       : promise => on success (response status code = 200) resolves with success message
                                                  on any other response (status code != 200), rejects with a failure message
                                                  on error, rejects with the error
                                                  
                                                  
    getProperty      

    Description      : Gets the property value of the provided property id.
    Input paramaters : 'propertyId'   : string (ex. "propertyId1"),
    Output           : returns        : promise => on success resolves with property value
                                                  if property not found, rejects with a failure message
                                                  on error, rejects with the error
                                                  
                                                  
                                                  
    setProperty      

    Description      : Sets a new property with the provided values
    Input paramaters : 'propertyId'   : string (ex. "propertyId4"),
                       'propertyName' : string (ex. "Property Name 4"),
                       'value'        : simple data type (ex. 4812),
                       'description'  : string (ex. "Property description"),
    Output           : returns        : promise => on success resolves with success message
                                                  if property not found, rejects with a failure message
                                                  on error, rejects with the error
                                                  

##Analytics

    sendCustomLogs      

    Description      : Sends the custom data that is mentioned as "customDataMap" in the input json. 
                       This custom data is available on the analytics console to build custom charts.
    Input paramaters : type               = json
                       sample parameter   = customLogInputs = {
                                                                "serverIpAddress": "9.1.2.34",
                                                                "customDataMap": {
                                                                    "Test": "Test logs"
                                                                },
                                                                "timestamp": "2020-05-03T05:12:53.432Z",
                                                                "timezone": "60",
                                                                "appVersion": "2.0 Beta",
                                                                "appName": "IBM Acme App",
                                                                "appID": "com.ibm.acme",
                                                                "appVersionCode": "2",
                                                                "deviceID": "518c66913ec337f0",
                                                                "deviceModel": "iPhone6,2",
                                                                "deviceBrand": "Apple",
                                                                "deviceOS": "iOS",
                                                                "deviceOSversion": "9.2.1"
                                                              };
    Output            :      returns      = promise => on success resolves with response status, 
                                                       on error, rejects with the error
                                                       
                                                       
                         
                         
    sendNetworkTransactions      

    Description      : Sends network transactions data to the analytics server.
    Input paramaters : type               = json
                       sample parameter   = networkLogInputs = {
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
    Output            :      returns      = promise => on success resolves with response status, 
                                                       on error, rejects with the error
    
    