# AngularJS Carvoyant Client
A sample AngularJS application that authorizes your Carvoyant account and displays some basic vehicle information.

## Technical Requirements
+ Running this project requires that it is served by a webserver. This is because of the Carvoyant authorization mechanism. When the user authorizes their Carvoyant account, the authorization server will issue an HTTP Redirect taking the user back to the application. This requires an HTTP URI. In development we have used both node (https://github.com/indexzero/http-server) and Python (https://docs.python.org/2/library/simplehttpserver.html). Both are zero configuration basic HTTP servers. But use whatever you want.

+ The source code contains a Carvoyant developer key that works in our production environment but it is severely throttled and we reserve the right to disable that key at any time if we see it being used outside of our sample applications.

+ The source code contains one of our Google Maps API Keys. If you run this code yourself you are required (by Googles TOS) to use your own Google Maps Key.

+ You must have a Carvoyant user account. The code as is points to the production environment and requires a production account. Connecting to our sandbox is a simple configuration change so you can test this without a production account if you prefer.

## Design Overview
This is a very basic AngularJS application meant to show how to connect to the Carvoyant platform and begin making API calls against your account. The intent here is not to necessarily show AngularJS "best practices". We're not AngularJS developers :). Having said that, here's the basic structure.

### js/app.js
Contains the basic configuration properties for the application.

<table>
	<tr><th>Property</th><th>Description</th></tr>
	<tr><td>carvoyantBaseApi</td><td>The base URL for the Carvoyant system. Production and Sandbox values are in the file already.</td></tr>
	<tr><td>carvoyantOAuth2Uri</td><td>The URL to the Carvoyant authorization server. Production and Sandbox values are in the file already.</td></tr>
	<tr><td>carvoyantClientId</td><td>This is the developer client Id for the Carvoyant API. When you register your developer account you can create your client Id.</td></tr>
	<tr><td>googleMapsKey</td><td>This is your Google Maps API Key. You need to replace this with your own. Head over to the <a href="https://developers.google.com/maps/">Google Developer</a> site to get one.</td></tr>
</table>

### js/carvoyantService.js
This is an AngularJS service that encapsulates all of the logic to call the Carvoyant API. Note that it uses asynchronous calls and each call will return a promise that will be updated with the results of the API call.

### js/controllers.js
All of the controllers used to manage the application.

## Gotchas
This is a pretty simple application but there are two gotchas to be aware of.

+ If you run this locally it cannot be running on http://localhost:8080. Don't ask me why, I honestly can't figure it out. For some reason the redirect from the authorization server does not work to that URL. Use your local IP or change the port and you'll be fine.

+ The application expects to be running at the root of your server. If you need to run it on a sub path on your server you will need to update the redirect uri that is sent to the authorization server. In the LoginController (in js/controllers.js), look for the redirectUri variable and update it as needed.