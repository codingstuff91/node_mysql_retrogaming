var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req,res) => {
  res.render('register')
});

router.post('/register', (req,res) => {

  errors = {}

  if(req.body.username == ""){
    errors.username = "Veuillez saisir un nom d'utilisateur"
  }
  if(req.body.email == ""){
    errors.email = "Veuillez saisir une adresse mail"
  }

  if(req.body.password == ""){
    errors.password = "Veuillez saisir un mot de passe"
  }
  
  console.log(errors);
  res.render('register', {validation_errors : errors})

})

router.get('/login', (req,res) => {
  res.send('login route')
});

module.exports = router;
