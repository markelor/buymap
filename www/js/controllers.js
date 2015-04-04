angular.module('starter.controllers', ['starter.db', 'starter.geolocation'])

//mislistas controller
.controller('MisListasCtrl', function($scope, $ionicSideMenuDelegate, $ionicActionSheet,
    $ionicPopup, $timeout, $location, Db) {


    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    //mover

    $scope.moveItem = function(producto, fromIndex, toIndex) {
        $scope.productos.splice(fromIndex, 1);
        $scope.productos.splice(toIndex, 0, producto);
    };

    // Crear el popup para editar 
    $scope.showPopupEditProducto = function(producto) {
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
    // Crear el popup para añadir ptoducto
    $scope.showPopupAddProducto = function() {
        // El popup
        // Crear una copia del producto
        $scope.producto = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="producto.name">',
            title: 'Añadir producto',
            scope: $scope,
            buttons: [{
                text: 'Cancelar'
            }, {
                text: '<b>Añadir</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.producto.name) {
                        //no dejar al usuario hasta que añada un producto
                        e.preventDefault();
                    } else {
                        return $scope.producto.name;
                    }
                }
            }, ]
        });
        myPopup.then(function(res) {
            //creamos el producto

            var id = $scope.productos.length + 1;
            id = id.toString();
            console.log(id);
            producto = {
                "_id": id,
                "name": res,
                "price": "12.50"
            };
            Db.addProducto($scope.listToAdd,producto);
            console.log('Tapped!', res);
        });
        $timeout(function() {
            myPopup.close(); //Cerrar eel popup despues de 20 segundos
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
                    $scope.showPopupEditProducto(producto);

                } else {
                    //añadir un producto
                    $scope.showPopupAddProducto();


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

    //mostrar listas con fecha de creacion y una lista en la vista
    $scope.listas = [];
    $scope.productos = [];
    Db.getAllListas(function(datos) {
        $scope.listas = datos;
        //enseñar primera lista por defecto
        $scope.productos = datos[0].productos;
        // lista para añadir, por defecto tomar el primero
        $scope.listToAdd=$scope.listas[0];

    });
 

    //mostrar lista al elejir el producto
    $scope.showLista = function(lista, index) {

        var datos = $scope.listas;
        $scope.productos = datos[index].productos;
        //guardamos la lista que hemos elejido para luego añadir aqui el producto
        $scope.listToAdd=datos[index];

    };

    //eliminar lista
    $scope.onListDelete = function(lista) {
        $scope.lista.splice($scope.lista.indexOf(lista), 1);
    };
    //los botones estan ocultos por defecto
    $scope.showButtons = false;
    $scope.showOperationButtons = function() {
        $scope.showButtons = !$scope.showButtons;
    };
    //ocultar botones siempre que cerremos el navbar
    $scope.hideOperationButtons = function() {
        $scope.showButtons =false;
    };


})



.controller('RutaCtrl', ['$scope', '$ionicLoading', 'Geolocation', function($scope, $ionicLoading, Geolocation) {

    $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    Geolocation.localizar(function(coords) {
        console.log(coords);

        console.log('RutaCtrl initialize');
        var myLatlng = new google.maps.LatLng(coords.latitude, coords.longitude);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        console.log(document.getElementById("map"));

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Zona'
        });

        $scope.map = map;
    });
}])






/*.controller('RutaCtrl', function($scope, $ionicSideMenuDelegate, $ionicLoading, $compile,geolocation) {

    $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleRight();
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

})*/

//Loginaren controllera

.controller('LoginCtrl', function($scope) {
    console.log('LoginCtrl');
})

.controller('RegistroCtrl', function($scope) {


    $scope.guardar = function() {
        Registro.guardar($scope.username, $scope.password, $scope.email);
    };


})


.controller('valoracionesCtrl', function($scope, Db, AJAX) {
    console.log('valoracionesCtrl');

    var valoraciones = null;

    AJAX.cargarValoraciones(function(valoraciones) {
        Db.addAllValoraciones(valoraciones);
        console.log('cargarValoraciones: ' + JSON.stringify(valoraciones));
        $scope.valoraciones = valoraciones;
    });


});
