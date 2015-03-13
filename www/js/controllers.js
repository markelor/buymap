angular.module('starter.controllers', ['starter.db'])

//mislistas controller
.controller('MisListasCtrl', function($scope, $ionicSideMenuDelegate, $ionicActionSheet, $ionicPopup, $timeout, $location, Productos) {

    var myPopup;

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.data = {
        showDelete: false
    };

    //mover

    $scope.moveItem = function(producto, fromIndex, toIndex) {
        $scope.productos.splice(fromIndex, 1);
        $scope.productos.splice(toIndex, 0, producto);
    };
    //ver productos
    $scope.productos = Productos.all();
    // Crear el popup para editar y añadir
    $scope.showPopup = function(producto) {
        console.log("aaa");
        // Crear una copia del producto
        $scope.producto = Object.create(producto);

        // El popup
        myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="producto.name">',
            title: 'Escribe el nuevo nombre',
            scope: $scope,
            buttons: [{
                text: 'Cancelar'
            }, {
                text: '<b>Guardar</b>',
                type: 'button-positive',
                onTap: function(e) {
                    producto.name = $scope.producto.name;
                }
            }]
        });
        myPopup.then(function(res) {
            console.log(res);
        });
        $timeout(function() {
            myPopup.close(); //cerrar el popup despues de 20 segundos
        }, 20000);
    };
    // Popup de comfirmacion para eliminar producto
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Eliminar producto',
            template: '¿Quiere eliminar este producto de la lista?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                console.log('Estas seguro');
            } else {
                console.log('Estas seguro');
            }
        });
    };

    // Al hacer click, ver menu para editar, borrar, modificar...
    $scope.show = function(producto) {

        console.log(producto);

        // ver tab
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: 'Añadir'
            }, {
                text: 'Editar'
            }],

            destructiveText: 'Borrar',
            titleText: 'Modifica tu producto',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                hideSheet();
                //editar
                if (index === 1) {
                    $scope.showPopup(producto);

                } else {
                    //añadir un producto

                }
            },
            destructiveButtonClicked: function(index) {
                //borrar producto
                $scope.productos.splice($scope.productos.indexOf(producto), 1);
                return true;
            }

        });

        // Desaparece despues de los segundos que queramos
        $timeout(function() {
            hideSheet();
        }, 10000);

    };
})



.controller('RutaCtrl', function($scope, $ionicSideMenuDelegate, $ionicLoading, $compile) {

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.init = function() {

        navigator.geolocation.getCurrentPosition(function(pos) {

            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //$scope.loading.hide();
            console.log(pos.coords.latitude);
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
        //function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493, -89.381388);
        // var myLatlng=new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Ubicación actual'
        });


        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        $scope.map = map;


    };
    //  google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
        if (!$scope.map) {
            return;
        }

    };

})

//Loginaren controllera

.controller('LoginCtrl', function($scope) {
    console.log('LoginCtrl');
})

.controller('RegistroCtrl', function($scope) {


    $scope.guardar = function() {
        Registro.guardar($scope.username, $scope.password, $scope.email);
    };


});
