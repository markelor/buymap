angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})
//Loginaren controllera
.controller('LoginCtrl', function($scope) {})
//registroaren controllera
.controller('RegistroCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

//listado de cesta controller
.controller('ListadoCestaCtrl', function($scope,$ionicSideMenuDelegate,Productos) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.data = {
    showDelete: false
  };
  //editar
  
  $scope.edit = function(producto) {
    alert('Edit producto: ' + producto.id);
  };
  //compartir
  $scope.share = function(producto) {
    alert('Share producto: ' + producto.id);
  };
  //mover
  
  $scope.moveItem = function(producto, fromIndex, toIndex) {
    $scope.productos.splice(fromIndex,1);
    $scope.productos.splice(toIndex, 0, producto);
  };
  //borrar
  
  $scope.onItemDelete = function(producto) {
    $scope.productos.splice($scope.productos.indexOf(producto), 1);
  };
  //ver productos
 $scope.productos=Productos.all();
 })
 /*

 // Triggered on a button click, or some other target
 $scope.show = function(producto) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     producto: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your album',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };
});


*/

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapCtrl', function($scope,$ionicSideMenuDelegate, $ionicLoading, $compile) {

      $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
      $scope.init = function (){
      //function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
        
        
      };
    //  google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }


        /*$scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });*/


        navigator.geolocation.getCurrentPosition(function(pos) {

          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          //$scope.loading.hide();
          console.log(pos.coords.latitude);
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
        
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click');
      };
      
    });

//});

  

