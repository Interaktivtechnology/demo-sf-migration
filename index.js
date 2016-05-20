
var jsforce = require('jsforce')
var faker = require('faker')

var conn = new jsforce.Connection({
  serverUrl : 'https://test.interaktiv.sg/'
});

var listOfData = () => {
  var data = []
  for(var x = 0; x < 1000; x++)
    data.push({
      name : faker.name.findName()
    })
  return data
}
console.log(listOfData())
