var DEVICE_ID = 'YOUR DEVICE ID HERE';
var ACCESS_TOKEN = 'YOUR ACCESS TOKEN HERE';

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
      url: 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/params?access_token=' + ACCESS_TOKEN,
      method: 'post',
      type: 'json',
      data: { m: 'mode=' + mode }
    },
    function(e){ console.log('ajax success: ' + e); },
    function(e){ console.log('ajax failure: ' + e); }
  );
});

var flame_up = function() {
  var flame_down = function () {
    ajax(
      {
        url: 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/params?access_token=' + ACCESS_TOKEN,
        method: 'post',
        type: 'json',
        data: { m: 'up_rad=40' }
      },
      function(e){ console.log('ajax success: ' + e); },
      function(e){ console.log('ajax failure: ' + e); }
    );
  };

  ajax(
    {
      url: 'https://api.spark.io/v1/devices/' + DEVICE_ID + '/params?access_token=' + ACCESS_TOKEN,
      method: 'post',
      type: 'json',
      data: { m: 'up_rad=150' }
    },
    function(e){
      console.log('ajax success: ' + e);
      setTimeout(flame_down, 1500);
    },
    function(e){ console.log('ajax failure: ' + e); }
  );
};

simply.on('accelTap', function(e) {
  console.log('accelTap ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
  flame_up();
});

simply.setText({
  title: 'Spark Torch',
  body: 'Press buttons to control the torch!',
}, true);
