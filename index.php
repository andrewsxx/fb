<?php
    require 'facebook.php';

// Create our Application instance (replace this with your appId and secret).
    $facebook = new Facebook(array(
      'appId'  => '159162207495855',
      'secret' => '8bb887a4b36f9c841f2c19803e2e0975',
    ));
    
    $user = $facebook->getUser();
    if ($user) {
    try {
      // Proceed knowing you have a logged in user who's authenticated.
      $user_profile = $facebook->api('/me');
    } catch (FacebookApiException $e) {
      error_log($e);
      $user = null;
    }
  }

  // Login or logout url will be needed depending on current user state.
  if ($user) {
    $logoutUrl = $facebook->getLogoutUrl();
  } else {
    $statusUrl = $facebook->getLoginStatusUrl();
    $loginUrl = $facebook->getLoginUrl();
  }
?>
<html>
    <head>
        <link rel="stylesheet" href="css/bootstrap.css">
        <script type="text/javascript" src="js/jquery-1.11.0.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </head>
    <body>
        <div id="fb-root"></div>
        <div class="container" style="margin-top: 20px;">
            <div class="row">
                <a href="#" class="btn btn-default facebook-btn">connect by JS</a>
                <?php if(!$user){ ?>
                    <a href="<?= $facebook->getLoginUrl(array('scope' => 'email')); ?>" class="btn btn-default">connect by PHP</a>
                <?php } ?>
            </div>
            
            <?php if($user) { ?>
                <div class="row user-info"style="min-height: 100px; margin-top: 20px;">
                    <img src="https://graph.facebook.com/<?php echo $user; ?>/picture">
                    <?php print_r($user_profile); ?>
                    <?php print_r($facebook->api()); ?>
                </div>
            <?php } else {?>
            
            
                <div class="row user-info"style="min-height: 100px; margin-top: 20px; display: none;">
                    <img>
                </div>
            <?php } ?>
        </div>
    </body>
</html>