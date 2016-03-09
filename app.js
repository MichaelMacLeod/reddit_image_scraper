var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
results = [];

request('http://www.reddit.com', function(err, resp, body){
  if(!err && resp.statusCode == 200){
    //now load the html into cheerio
    var $ = cheerio.load(body);
    $('a.title', '#siteTable').each(function(){
      var url = $(this).attr('href');
      if(url.indexOf('i.imgur.com')!= -1){
        results.push(url);
      }
    });
    console.log(results);
    console.log("Finished scraping. There are " + results.length + " results.");
//now looping over urls in results array. We use .pipe to put it into a string
for (var i = 0; i < results.length; i++) {
  request(results[i]).pipe(fs.createWriteStream('resultsFile/' + i + '.jpg'));
};
}
});