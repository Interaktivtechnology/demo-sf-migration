var express = require('express');
var router = express.Router();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/SfDemo';

// Use connect method to connect to the Server
var jsforce = require('jsforce')
var faker = require('faker')

var listOfData = () => {
  var data = []
  for(var x = 0; x < 1000; x++)
    data.push({
      name : faker.name.findName(),
      Email__c : faker.internet.email(),
      BillingAddress : faker.address.streetName(),

    })
  return data
}

var getDataFromSf = (callback) =>{
	req.conn = new jsforce.Connection();

}

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
      var collection = db.collection('SfDemo')
      console.log(listOfData())
      collection.insert(listOfData(), (err, result) => {

        db.close();
      })


    }
  });
  res.send('respond with a resource');
});

router.post('/save', (req,res,next) =>{
  var conn1 = new jsforce.Connection({
    serverUrl : req.body.server1
  });

  conn1.login(req.body.id1, req.body.pwd1, function(err, result) {
    if (err) {

      res.json({
        error : true,
        errorMessage : "Invalid Login"
      })
    }
    else{
      conn1.query('SELECT Id, Name FROM Account LIMIT 10', function(err, result) {
        res.send(err ? err : result)
      });
    }
  });

})

router.post('/migrate', (req, res, next) =>{
  var conn1 = new jsforce.Connection({
    serverUrl : req.body.server2
  });
  var obj = JSON.parse(req.body.data)
  for(var i in obj.records){
    delete obj.records[i].attributes
  }
  //console.log(req.body)
  conn1.login(req.body.id2, req.body.pwd2, function(err, result) {
    conn1.sobject("Account").create(obj.records, function(err, ret) {
      if (err || !ret.success) {
        console.log(err)
        res.send(ret)
      }
      else res.send(ret)
    });
  });
})
module.exports = router;
