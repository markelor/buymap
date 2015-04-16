angular.module('starter.popup', [])
    .factory('Popup', function($ionicPopup, $timeout,Db) {

        // El popup para añadir o editar
        var insertPopup = function(scope, operacion, titulo,producto) {
            $scope = scope;
            //elejir el titulo

            myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="producto.name">',
                title: titulo,
                scope: $scope,
                buttons: [{
                    text: 'Cancelar'
                }, {
                    text: '<b>Gardar</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (operacion === "Editar") {
                            producto.name = $scope.producto.name;

                        } else if (operacion === "Añadir") {
                            if (!$scope.producto.name) {
                                //no dejar al usuario hasta que añada un producto
                                e.preventDefault();
                            } else {
                                return $scope.producto.name;
                            }

                        }

                    }
                }]
            });
            myPopup.then(function(res) {

                 if(operacion === "Editar") {
                    var indice;
                   // sacar el indice
                   //console.log("scope"+$scope.productos[i]._id);
                   for(i=0;i<$scope.productos.length;i++){
                    if($scope.productos[i]._id===producto._id){
                        indice=i;
                    }
                    
                   }
                    var idProducto = producto._id;
                    producto = {
                        "_id": idProducto,
                        "name": producto.name,
                        "price": "12.50"
                    };
                    //eliminar producto
                    
                    Db.editProducto($scope.listToAdd, producto,indice);

                 }else if (operacion === "Añadir") {
                    //creamos el producto

                    var ultimoProducto = $scope.productos.length;
                    id=parseInt($scope.productos[ultimoProducto-1]._id)+parseInt(1);
                    id = id.toString();
                    producto = {
                        "_id": id,
                        "name": res,
                        "price": "12.50"
                    };
                    Db.addProducto($scope.listToAdd, producto);
                    console.log('Tapped!', res);

                }
            });
            /*$timeout(function() {
                myPopup.close(); //cerrar el popup despues de 20 segundos
            }, 20000);
*/
        };
        return {
            insertPopup: insertPopup
        };
    });
 // Popup de comfirmacion para eliminar producto
    /*$scope.showConfirm = function() {
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
    */