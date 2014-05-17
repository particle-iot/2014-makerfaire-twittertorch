simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  var mode = 1;
  if ('up' == e.button) {
    mode = 2;
    simply.subtitle('RAINBOWS!');
  } else {
    simply.subtitle('FIRE!');
  }
  ajax(
    {
      url: 'https://api.spark.io/v1/devices/{{DEVICE_ID}}/params?access_token={{ACCESS_TOKEN}}',
      method: 'post',
      type: 'json',
      data: { m: 'mode=' + mode }
    },
    function(e){ console.log('ajax success: ' + e); },
    function(e){ console.log('ajax failure: ' + e); }
  );
});

simply.setText({
  title: 'Spark Torch',
  body: 'Press buttons to control the torch!',
}, true);
