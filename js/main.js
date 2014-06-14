$(document).ready(function(){
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
});