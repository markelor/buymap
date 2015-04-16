angular.module('starter.db', [])


.factory('Db', function() {
    var localDB = new PouchDB("buymap");

    var getDb = (function(db) {
        db(localDB);
    });

    var getAllListas = function(success) {
        localDB.allDocs({
            include_docs: true
        }).then(function(data) {
            var datos = [];
            for (var i = 0; i < data.rows.length; i++) {
                datos.push(data.rows[i].doc);
            }
            success(datos);
        });
    };



    var addAllListas = function(data) {

        var insertarListaDb = function(misListas) {
            localDB.put(misListas).then(function(result) {
                // handle response
            }).catch(function(err) {
                console.log(err);
            });
        };
        var indexListas = Object.keys(data.listas.lista).length;

        for (var i = 0; i < indexListas; i++) {
            insertarListaDb(data.listas.lista[i]);
        }

    };
    var addLista = function(lista) {

        localDB.put(lista).then(function(result) {
            // handle response
        }).catch(function(err) {
            console.log(err);
        });

    };
    var deleteLista = function(lista) {

        localDB.put(lista).then(function(result) {
            // handle response
        }).catch(function(err) {
            console.log(err);
        });

    };


    var addProducto = function(listToAdd, producto) {
        // handle response
        //se añade el producto a la lista
        listToAdd.productos.push(producto);
        localDB.put(listToAdd, listToAdd._id, listToAdd._rev).then(function(result) {
            // handle result
            listToAdd._rev = result.rev;
        }).catch(function(err) {
            console.log(err);
        });

    };
    var editProducto = function(listToAdd, producto, indice) {
        // handle response
        //se añade el producto a la lista


        listToAdd[indice] = producto;
        console.log(listToAdd);
        localDB.put(listToAdd, listToAdd._id, listToAdd._rev).then(function(result) {
            // handle result
            listToAdd._rev = result.rev;
        }).catch(function(err) {
            console.log(err);
        });
    };
    var deleteProducto = function(listToAdd) {
        // handle response
        //se añade el producto a la lista
        console.log(listToAdd);

       localDB.put(listToAdd, listToAdd._id, listToAdd._rev).then(function(result) {
            // handle result
            listToAdd._rev = result.rev;

        }).catch(function(err) {
            console.log(err);
        });

    };

    /*var addProducto = function(listToAdd, producto) {
        // handle response
        //se añade el producto a la lista
        listToAdd.productos.push(producto);
        console.log(listToAdd);
        //editamos la lista, se supone que bulkDocs al ver que _rev de la lista
        //y el _rev de la base de datos son las mismas, sobreescribe la lista, y
        //esto queda actualizado. En realidad, añade esta lista camiandole el _rev
        localDB.put(listToAdd, listToAdd._id, listToAdd._rev).then(function(result) {
            // handle result
            console.log(result);
        }).catch(function(err) {
            console.log(err);
        });
    };
    */

    var addAllValoraciones = function(data) {

        var insertarValoracionesDb = function(valoraciones) {
            localDB.put(valoraciones).then(function(result) {
                //console.log(result);
                //se añade el producto a la lista
                listToAdd.productos.push(producto);
                console.log(listToAdd);
                console.log(producto._id);
                localDB.put(listToAdd, listToAdd._id, listToAdd._rev).then(function(result) {
                    // handle result
                    listToAdd._rev = result.rev;
                }).catch(function(err) {
                    console.log(err);
                });

            });
        };

        var editProducto = function(listToAdd, producto, indice) {
            // handle response
            //se añade el producto a la lista
            listToAdd[indice] = producto;
            console.log(listToAdd);
            localDB.bulkDocs([listToAdd], new_edits = false).then(function(result) {
                // handle result
            }).catch(function(err) {
                console.log(err);
            });
        };
        var deleteProducto = function(listToAdd) {
            // handle response
            //se añade el producto a la lista
            console.log(listToAdd);

            localDB.bulkDocs([listToAdd]).then(function(result) {
                // handle result
                console.log("hemen");
            }).catch(function(err) {
                console.log(err);
            });

        };

        /*var addProducto = function(listToAdd, producto) {
>>>>>>> 5ed6d2537a4f1bdbf8b3ab36ff42985923538b4f
                // handle response
                //se añade el producto a la lista
                listToAdd.productos.push(producto);
                console.log(listToAdd);
                //editamos la lista, se supone que bulkDocs al ver que _rev de la lista
                //y el _rev de la base de datos son las mismas, sobreescribe la lista, y
                //esto queda actualizado. En realidad, añade esta lista camiandole el _rev
                localDB.put(listToAdd, listToAdd._id, listToAdd._rev).then(function(result) {
                    // handle result
                    console.log(result);
                }).catch(function(err) {
                    console.log(err);
                });
            };
            */
        var getAllComercios = function(success) {


            localDB.allDocs({
                include_docs: true,
                attachments: true,
                startkey: 'C_'
            }, function(err, response) {
                success(response);
            });
        };

        var addAllComercios = function(data) {


            var insertarComerciosDb = function(comercios) {
                localDB.put(comercios).then(function(result) {
                    //console.log(result);
                    // handle response
                }).catch(function(err) {
                    console.log(err);
                });
            };

            var indexComercios = Object.keys(data.comercios.comercio).length;

            for (var i = 0; i < indexComercios; i++) {
                insertarComerciosDb(data.comercios.comercio[i]);
            }

        };

        /* var addAllValoraciones = function(data) {

             var insertarValoracionesDb = function(valoraciones) {
                 localDB.put(valoraciones).then(function(result) {
                     //console.log(result);
                     // handle response
                 }).catch(function(err) {
                     console.log(err);
                 });
             };

             for (var i = 0; i < data.length; i++) {
                 insertarValoracionesDb(data[i]);
             }

         };
         */

        var getAllValoraciones = function(success) {
            console.log("getAllValoraciones");
            localDB.allDocs({
                include_docs: true
            }).then(function(data) {
                var datos = [];
                for (var i = 0; i < data.rows.length; i++) {
                    datos.push(data.rows[i].doc);
                }
                success(datos);
            });

        };
        var cargar = function(username, password) {
            //console.log("kaixo "+username+" pasahitza "+password);




            localDB.get(username).then(function(doc) {
                if (doc.password === password) {
                    console.log("funtziona");
                    location.href = "#/tab/misListas";

                } else {
                    console.log("noooooo");
                }
                // handle doc
            }).catch(function(err) {
                console.log("erabiltzaile hori ez da existitze");
            });



        };

        var guardar = function(username, password, email) {

            var user = {
                '_id': username,
                'password': password,
                'email': email
            };

            console.log(user);

            localDB.put(user).then(function(result) {
                // handle result
                console.log(result);
            }).catch(function(err) {
                console.log(err);
            });

        };

        return {
            getAllListas: getAllListas,
            addAllListas: addAllListas,
            addLista: addLista,
            deleteLista: deleteLista,
            addProducto: addProducto,
            editProducto: editProducto,
            deleteProducto: deleteProducto,
            addAllValoraciones: addAllValoraciones,
            getAllValoraciones: getAllValoraciones,
            addAllComercios: addAllComercios,
            getAllComercios: getAllComercios,
            cargar: cargar,
            guardar: guardar

        };

    };

    /*for (var i = 0; i < data.length; i++) {
        insertarValoracionesDb(data[i]);
    }*/



    var getAllValoraciones = function(success) {
        console.log("getAllValoraciones");
        localDB.allDocs({
            include_docs: true
        }).then(function(data) {
            var datos = [];
            for (var i = 0; i < data.rows.length; i++) {
                datos.push(data.rows[i].doc);
            }
            success(datos);
        });

    };

    return {
        getDb: getDb,
        getAllListas: getAllListas,
        addAllListas: addAllListas,
        addLista: addLista,
        addProducto: addProducto,
        editProducto: editProducto,
        deleteProducto: deleteProducto,
        addAllValoraciones: addAllValoraciones,
        getAllValoraciones: getAllValoraciones
    };

})







.factory('Establecimientos', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var establecimiento = [{
        id: 0,
        name: 'Bar Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];

    //cambiar las funciones necesarias para establecimientos 
    return {
        all: function() {
            return productos;
        },
        get: function(productoId) {
            // Simple index lookup
            return productos[productoId];
        }
    };

    /*

<<<<<<< HEAD
})

.factory('Registro', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data

    var db = new PouchDB('dbname');
    var guardar = function(username, password, email) {

        var user = {
            '_id': username,
            'password': password,
            'email': email


        };

        db.put(user).then(function(result) {
            // handle result
            console.log(result);
        }).catch(function(err) {
            console.log(err);
        });

    };

    var cargar = function(username, password) {

        var user=username;
        var pas=password;
        

        //hemen ide bidez bilatzen dugu
        db.get('user').then(function(doc) {
            // handle doc
            if (doc._id === user && doc.password===pas) {
                console.log('ondo');
            }
         
        }).catch(function(err) {
            console.log(err);
        });

    };


    //cambiar las funciones necesarias para establecimientos 
    return {
        cargar: cargar
    };
=======
>>>>>>> db3ef6a2a1c3f074f0d76cdb2fcec905c15a7b0b
*/
});
