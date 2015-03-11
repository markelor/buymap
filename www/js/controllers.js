angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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

});

  
