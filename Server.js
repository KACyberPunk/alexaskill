var violet = require('violet').script();
var nforce = require('nforce');
var request = require('sync-request');


var APP_ID = 'amzn1.ask.skill.edffd17c-2468-4435-878e-391972bc1379';



var org = nforce.createConnection({
  clientId: "NA",
clientSecret: "NA",
redirectUri: "NA"
});

violet.respondTo({
  expecting: [
    'Login to my org',
    'Open my org'
  ],
  resolve: function (response) {
    var access = response.platReq.request.sessionDetails.user.accessToken;

console.log('accesstoken '+response.platReq.request.sessionDetails.user.accessToken);
if(!access)
{
  var res = request('GET', 'https://login.salesforce.com/services/oauth2/userinfo?oauth_token='+access, {
  headers: {
    'Content-Type': 'application/json',
  },
});
var data = res.getBody();
var parserData =JSON.parse(data.toString('utf8'));
instanceUrl = parserData.urls.custom_domain;
  
// session.attributes.url = instanceUrl;

response.say(`Welcome to your salesforce org`);
}
response.say(`Sorry`);

}});

violet.respondTo({
  expecting: [
    'Can you help me',
    'What can I do'
  ],
  resolve: function (response) {
    response.say(`I can help you with your current account balance, with
    financial planning, budgeting, investing, or taking out a
    loan`);
}});

violet.appName = APP_ID; 
module.exports = violet;