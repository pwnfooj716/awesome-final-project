function apiRequest (apiStr, method, sendData, onRes) {
  var settings = {
    'async': true,
    'crossDomain': true,
    'url': `/${apiStr}`,
    'method': method.toUpperCase(),
    'headers': {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
    'processData': false,
    'data': JSON.stringify(sendData)
  }

  $.ajax(settings).done(function (response) {
    onRes(response)
  })
}