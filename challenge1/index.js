/**
This application should accept a command line argument using process.argv.
The command line argument should be a search term and your application should make
an API request to the dad joke API to search for a joke based on the search term.
 If it finds jokes matching the term, it should output a random joke, and should also
 save the joke to a file called jokes.txt.
  If it doesn't find a joke, it should log a message to the console telling
  the user that no jokes were found for that search term.

**/
const fs = require('fs')
const request = require('request')

const term = process.argv[2]
const apiUrl = 'https://icanhazdadjoke.com/search?term='
var fullUrl = apiUrl+String(term)

var options = {
    url: fullUrl,
    json:  true,
    headers: {
      'content-type' : 'application/json'
    }
  }

request.get(options, function(err, response, body){
    if (err) throw err
    console.log('Statuscode: '+response.statusCode)
    var total = body.total_jokes
    if (total == 0) console.log('No jokes were found using the search term: ' + term)
    else{
      var luckyNumber = getRandomArbitrary(0,total)
      console.log(luckyNumber)
      console.log(body.results[luckyNumber].joke)
    }
  }
)

function getRandomArbitrary(min, max) {
  var num = Math.random() * (max - min) + min;
  return Math.floor(num)
}
  /**
  .on('response', function(response){
    if (response.total_jokes > 0){

    }
    else{
      console.log("No jokes found for the search term specified")
    }
  })
**/
