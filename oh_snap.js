var system = require('system');
var page = require('webpage').create();
var fs = require('fs');

if (system.args.length === 4) {
    console.log('Usage: snap.js <some hostname> <some path> <view port width> <target image name>');
    phantom.exit();
}
var host = system.args[1];
var path = system.args[2];
var view_port_width = system.args[3];
var image_name = system.args[4];
console.log("Viewing " + host + path);

if (! fs.isFile('passwords.json')) {
    console.log('Cannot find passwords.json file.');
    var passwords = []
} else {
    var passwords = JSON.parse(fs.read('passwords.json'));
}

page.viewportSize = { width: view_port_width, height: 5000};
page.settings = {
    loadImages: true,
    javascriptEnabled: true,
    userName: passwords.ssl_username,
    password: passwords.ssl_password
};

//if you want to use additional phantomjs commands, place them here
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.17'

//You can place custom headers here, example below.
// page.customHeaders = {

//      'X-Candy-OVERRIDE': 'https://api.live.bbc.co.uk/'

//  };

var LOGIN_PATH = "/client/login";

/***
 * Will grab csrfmiddlewaretoken from a page and use that to login.
 */
function loginToWebSite(username, password) {
    return function(status) {
        if (status === 'success') {
            var csrf_token = page.evaluate(function() {
                return jQuery("input[name=csrfmiddlewaretoken]").val();
            });

            data = (
                "username=" + username + "&password=" + password
                + "&csrfmiddlewaretoken=" + csrf_token
            );
            page.open(host + LOGIN_PATH + "?next=" + path, "POST", data, redirectToPage);
        } else {
            console.log('Error with page ' + url);
            phantom.exit();
        }
    }
}

function redirectToPage(status) {
    if (status === 'success') {
      page.render(image_name);
    } else {
        console.log('Error with page ' + url);
    }
    phantom.exit();
}

page.open(host, loginToWebSite(passwords.username, passwords.password));
