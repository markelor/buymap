angular.module('starter.controllers', ['starter.db', 'starter.geolocation', 'starter.popup'])

//mislistas controller
.controller('MisListasCtrl', function($scope, $ionicSideMenuDelegate, $ionicActionSheet,
    $ionicPopup, $timeout, $location, Db, Popup) {

    //mostrar listas con fecha de creacion y una lista en la vista
    $scope.listas = [];
    $scope.productos = [];
    Db.getAllListas(function(datos) {
        $scope.listas = datos;
        //enseñar primera lista por defecto
        $scope.productos = datos[0].productos;
        // lista para añadir, por defecto tomar el primero
        $scope.listToAdd = $scope.listas[0];
        console.log($scope.productos);

        //poner men a la izquierda
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        //mover
        $scope.moveItem = function(producto, fromIndex, toIndex) {
            $scope.productos.splice(fromIndex, 1);
            $scope.productos.splice(toIndex, 0, producto);
        };
        // addLista()
        // deleteLista()
        $scope.addLista = function() {
            // Crear una copia del producto
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            console.log(today);

            indice = $scope.listas.length - 1;
            idLista = parseInt($scope.listas[indice]._id) + 1;
            idLista = idLista.toString();


            lista = {
                "_id": idLista,
                "fecha": today,
                "productos": [{
                    "_id": "1",
                    "name": "Pimiento",
                    "price": "12.50"
                }]
            };
            $scope.listas.push(lista);
            console.log($scope.listas);
            Db.addLista(lista);
        };
        /* $scope.showPopupDeleteLista = function() {
            // Crear una copia del producto
            $scope.producto = Object.create(producto);
            operacion="Editar";
            titulo='Escribe el nuevo nombre';
            texto='Guardar';
            // El popup
            //Popup.insertPopup($scope,operacion,titulo,producto);
        };
        */


        // Crear el popup para editar 
        $scope.showPopupEditProducto = function(producto) {
            // Crear una copia del producto
            $scope.producto = Object.create(producto);
            operacion = "Editar";
            titulo = 'Escribe el nuevo nombre';
            texto = 'Guardar';
            // El popup
            Popup.insertPopup($scope, operacion, titulo, producto);
        };
        // Crear el popup para añadir ptoducto
        $scope.showPopupAddProducto = function(producto) {
            // El popup
            // Crear una copia del producto
            $scope.producto = {};
            operacion = "Añadir";
            titulo = 'Añadir producto';
            texto = 'Añadir';
            Popup.insertPopup($scope, operacion, titulo, producto);

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
                destructiveButtonClicked: function() {
                    //obtener indice del producto

                    //borrar producto
                    indice = $scope.productos.indexOf(producto);
                    $scope.productos.splice(indice, 1);
                    Db.deleteProducto($scope.listToAdd);
                    return true;
                }

            });

            // Desaparece despues de los segundos que queramos
            /* $timeout(function() {
                 hideSheet();
             }, 10000);*/

        };

    });

    //mostrar lista al elejir el producto
    $scope.showLista = function(lista, index) {

        var datos = $scope.listas;
        $scope.productos = datos[index].productos;
        //guardamos la lista que hemos elejido para luego añadir aqui el producto
        $scope.listToAdd = datos[index];

    };
    //los botones estan ocultos por defecto
    $scope.showButtons = false;
    $scope.showOperationButtons = function() {
        $scope.showButtons = !$scope.showButtons;
    };
    //ocultar botones siempre que cerremos el navbar
    $scope.hideOperationButtons = function() {
        $scope.showButtons = false;
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
