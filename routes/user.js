var express = require('express');
var router = express.Router();
var db = require('../config/db');
var bcrypt = require('bcryptjs');

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
    errors.email = "Veuillez saisir un nom d'utilisateur"
  }

  if(req.body.email == ""){
    errors.email = "Veuillez saisir une adresse mail"
  }

  if(req.body.password == ""){
    errors.password = "Veuillez saisir un mot de passe"
  }
  
  if(req.body.username != "" && req.body.email != "" && req.body.password != ""){

    const username = req.body.username
    const email  = req.body.email
    const password = bcrypt.hashSync(req.body.password, 8);

    user_query = `INSERT INTO users (email, username, password) VALUES ("${email}", "${username}", "${password}")`

    db.connect(function(err) {

        db.query(user_query, function (err, result) {
            console.log('erreurs DB',err);
            res.render('register', {success : 'Bravo !! Vous etes maintenant inscrit sur le site !'})
        });

    });

  }else{
    res.render('register', {validation_errors : errors})
  }

})

router.get('/login', (req,res) => {
  res.render('login')
});

router.post('/login', (req,res) => {
  const email = req.body.email
  const password = req.body.password
  const hashed_password = bcrypt.hashSync(req.body.password, 8)

  user_query = `SELECT * FROM users WHERE email="${email}"`

  db.connect(function(err) {

    db.query(user_query, function (err, result) {

        bcrypt.compare(password, result[0].password, function(err, check) {
          if (check) {
            res.send("Vous etes connecté")
          }else{
            res.render('login',{error : "Mot de passe ou adresse mail incorrecte"})
          }
        });

    });

  });

});

module.exports = router;
