$(document).ready(function() {
    var appId = '159162207495855';
    var secret = '8bb887a4b36f9c841f2c19803e2e0975';

    window.fbAsyncInit = function() {
        FB.init({appId: appId, status: true, cookie: true,
            xfbml: true, oauth: true});
//        for(var item = 0; item < this.onLoadMethods.length; item++){
//            this.onLoadMethods[item]();
//        }
    };
    (function() {
        var e = document.createElement('script');
        e.async = true;
        e.src = document.location.protocol +
                '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
    }());

    $(".facebook-btn").click(function(e){
        facebookLogin();
        e.preventDefault();
    });
});

function facebookLogin() {
    FB.login(function(response) {
        console.info(response);
        if(response.status == "connected"){
            $(".user-info img").attr("src", "https://graph.facebook.com/" + response.authResponse.userID + "/picture");
            $(".user-info").show();
        }
//        sendMessage();
    }, {scope: "email"});
}

function facebookApi(response){
    var facebookInfo = {};
    if (response.authResponse) {
        facebookInfo.token = response.authResponse.accessToken;
        facebookInfo.uid = response.authResponse.userID;
        FB.api({
            method: 'fql.query',
            query: 'select current_location, email, name, sex from user where uid=' + response.authResponse.userID
        }, function(response) {
            response = response[0];
            if (!response || response.error) {//facebook error
//                callback({result: "refused"});
            } else {
                facebookInfo.email = response.email;
                facebookInfo.full_name = response.name;
                facebookInfo.current_location = response.current_location;
                facebookInfo.gender = response.sex;
                console.info(response);
            }
        });
    } else {
        //do nothing
    }
}

function facebookApi2(response){
    FB.api(
        "/me",
        function (response) {
            console.info(response);
        }
    );
}


function facebookApi2(response){
    FB.api(
        "/me/feed",
        function (response) {
            console.info(response);
        }
    );
}

function apprequests(){
    FB.ui({method: 'apprequests',
        message: 'YOUR_MESSAGE_HERE'
    }, function(){});
}

function sendMessage() {
    FB.ui({
      method: 'send',
      link: 'http://inventiba.com',
      to : '748399156'
    });
};