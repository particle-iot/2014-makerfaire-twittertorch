var https = require('https');
var particle_api_options = {
  hostname: 'api.particle.io',
  method: 'POST',
  path: '/v1/devices/' + process.env.twittertorch_deviceid + '/message',
  headers: {
    'Authorization': 'Bearer ' + process.env.twittertorch_particletoken,
    'Content-Type': 'application/json'
  }
};
var Twit = require('twit');
var twitter = new Twit({
  consumer_key:         process.env.twittertorch_consumerkey,
  consumer_secret:      process.env.twittertorch_consumersecret,
  access_token:         process.env.twittertorch_twittertoken,
  access_token_secret:  process.env.twittertorch_twittertokensecret
});
var stream = twitter.stream('statuses/filter', { track: '@particle #makerfaire' });
stream.on('tweet', function(tweet){
  console.log('TWEET: ' + tweet.text);
  var t = tweet.text.replace(/#/g, ''); ///[^a-z0-9 ]/gi, '');
  console.log('STRIPPED: ' + t);

  var req = https.request(particle_api_options, function(res){
    console.log('PARTICLE: status ' + res.statusCode);
    res.on('data', function(d){
      console.log('PARTICLE: ' + d);
    });
  });
  req.write(JSON.stringify({t:t}));
  req.end();
  req.on('error', function(e){
    console.error('PARTICLE: error ' + e);
  });
});
