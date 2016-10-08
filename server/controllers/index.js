var models = require('../models');
// var router = require('router');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('GET GET', req, res);
      // console.log(router);
    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

