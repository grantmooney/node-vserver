"use strict"
const express = require('express');
const app = express();

// Put application logic here! (app.use(), etc.)

exports.app =  app;
exports.domains = ['localhost', 'example.com', 'www.example.com'];
exports.use = function(utility) { app.use(utility); }
exports.onListen = function(server) {
  // Server listening logic goes here (socket.io, etc.)
  console.log("example.com listening!");
};

