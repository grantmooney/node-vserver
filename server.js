// Constant Modules (like "includes")
const express = require('express'),
  vhost = require('vhost')
  fs = require('fs'),
  path = require('path');

// Constant variables
const appsPath = path.join(__dirname,'/apps'),
  port = process.env.PORT || 80;

// Constant instances
const mainApp = express();

// Get names of folders in "./apps"
var sites = fs.readdirSync(appsPath).filter(function(file) {
  return fs.statSync(path.join(appsPath, file)).isDirectory();
});

// Load Applications and add them to "appModules[]" array
var appModules = [];
for (var s in sites) {
  var appModule = require(path.join(appsPath, sites[s],'app.js'));
  for (var d in appModule.domains) {
    appModule.use(express.static(path.join(appsPath, sites[s],'public'))); // Serve app's public folder
    mainApp.use(vhost(appModule.domains[d], appModule.app)); // Assign application to domain
  }
  appModules.push(appModule); // For future reference
}

// Start server
const server = mainApp.listen(port, function() { 
  console.log('Express server listening on port ' + port);
  for (var am in appModules) { // Referencing from the future
    appModules[am].onListen(server); // Call module's "onListen" method 
  }
});
