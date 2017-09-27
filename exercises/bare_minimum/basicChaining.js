/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'));



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath)
    .then(function(data) {
      if (data) {
        return data.toString().slice('\n')[0];
      } else {
        console.log('could not find any data there');
      }
    })
    .then(function(username) {
      var options = {
        url: 'https://api.github.com/users/' + user,
        headers: { 'User-Agent': username },
        json: true // will JSON.parse(body) for us
      };
      return request.get(options);
    })
    .then (function(err, res, body){
      if (err){
        console.log('Could not get response form Github');
      } else {
        return res.json;
      }
    })
    .then (function(profileData){
      fs.writeFileAsync(profileData, writeFilePath);
    })
    .catch (function(err){
      console.log('oops we caught an error');
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
