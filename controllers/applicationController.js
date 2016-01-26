'use strict';

var applicationController = function (req, res) {

  return {
    home: home
  };

  function home(req, res) {
    
    res.render('index', {
      title: 'Express'
    });
    
  }

}


module.exports = applicationController;