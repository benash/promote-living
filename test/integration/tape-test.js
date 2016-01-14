var test = require('tape');

const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

test('timing test', function (t) {
  t.plan(2);

  var containsString = function(subStr, str) {
    return ~str.indexOf(subStr);
  };

  const browser = new Browser();
  browser.visit('/', function () {
    t.equal('PromoteLiving', browser.text('title'));
    t.assert(containsString('Healthy Rewards', browser.text()));
  });
});