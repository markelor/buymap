angular.module('starter.controllers', ['starter.db', 'starter.geolocation', 'starter.popup', 'ui.router'])

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
            Db.addLista(lista);
        };
        $scope.deleteLista = function(index) {
            //borrar producto
            $scope.listas.splice(index, 1);
            Db.deleteLista($scope.listToAdd);
        };



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



.controller('RutaCtrl', function($scope, $ionicSideMenuDelegate,
    Geolocation, Db) {
    //var distancia = 10000;
    $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleRight();
        console.log("menu desplazate");
    };

    $scope.GeoPosicionar = function() {
        Geolocation.localizar(function(coords) {
            var myLatlng = new google.maps.LatLng(coords.latitude, coords.longitude);
            Geolocation.insertarMapa(myLatlng);
        });
    };

    $scope.DibujarMapa = function(distancia, myLatlng) {

        Db.getAllComercios(function(datos) {
            console.log(datos + "data");
            var waypts = new Array;
            var directionsService = new google.maps.DirectionsService();

            //var myLatlng = new google.maps.LatLng(43.1741766, -2.3199273);
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var mapOptions = {
                center: myLatlng,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            directionsDisplay.setMap(map);
            for (var i = 0; i <= datos.rows.length - 1; i++) {
                lat = datos.rows[i].doc.latitud;
                lng = datos.rows[i].doc.longitud;
                nombre = datos.rows[i].doc.nombre + " " + datos.rows[i].doc.categoria;
                var LatlngC = new google.maps.LatLng(lat, lng);
                console.log("buymap" + LatlngC);
                console.log("buymap2" + myLatlng);
                var dist = (google.maps.geometry.spherical.computeDistanceBetween(LatlngC, myLatlng));
                console.log("jaione" + dist);
                console.log("irizar" + distancia);
                if (dist <= distancia) {
                    waypts.push({
                        location: LatlngC,
                        stopover: false
                    });
                    var marker = new google.maps.Marker({
                        position: LatlngC,
                        map: map,
                        title: nombre
                    });

                    console.log(waypts[0].location);
                    var request = {
                        origin: myLatlng,
                        destination: LatlngC,
                        waypoints: waypts,
                        travelMode: google.maps.TravelMode.WALKING
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });


                    console.log(nombre);
                    google.maps.event.addListener(marker, 'click', showInfo);

                    function showInfo() {
                        //Aumentar el zoom del mapa
                        map.setZoom(16);
                        map.setCenter(marker.getPosition());
                        //Construir una ventana de información
                        var contentString = marker.title;
                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        //Abrir la ventana de información
                        infowindow.open(map, marker);
                    }

                }

            }

        });
    };


    $scope.show = function(value) {
        distancia = value * 1000;
        Geolocation.localizar(function(coords) {
            var myLatlng = new google.maps.LatLng(coords.latitude, coords.longitude);
            // Db.getAllComercios(function(datos) {
            $scope.DibujarMapa(distancia, myLatlng);
            //});
        });


    };


})

//Loginaren controllera

.controller('LoginCtrl', function($scope, Db) {
    console.log('LoginCtrl');
    $scope.cargar = function(user) {

        Db.cargar(user.username, user.password);

    };
})

.controller('RegistroCtrl', function($scope, Db) {
    console.log('Registro');

    $scope.guardar = function(user) {
        Db.guardar(user.username, user.password, user.email);
    };


})


.controller('valoracionesCtrl', function($scope, Db, AJAX, $ionicPopover, $ionicSideMenuDelegate) {
    console.log('valoracionesCtrl');

    var valoraciones = null;

    AJAX.cargarValoraciones(function(valoraciones) {
        Db.addAllValoraciones(valoraciones);
        console.log('cargarValoraciones: ' + JSON.stringify(valoraciones));
        $scope.valoraciones = valoraciones;
    });


    $ionicPopover.fromTemplateUrl('addReview.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function(e) {
        console.log('openPopover');
        $scope.popover.show(e);
    };

    $scope.closePopover = function(e) {
        console.log('closePopover');
        $scope.popover.hide();
    };

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});


