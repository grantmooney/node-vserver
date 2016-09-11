"use strict"
const express = require('express');
const app = express();

// Put application logic here! (app.use(), etc.)

exports.app =  app;
exports.domains = ['sub1.example.com', '*.sub1.example.com'];
exports.use = function(utility) { app.use(utility); }
exports.onListen = function(server) {
  // Server listening logic goes here (socket.io, etc.)
  console.log("sub1.example.com listening!");
};

