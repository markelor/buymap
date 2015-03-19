angular.module('starter.db', [])


.factory('Db', function() {
    var localDB = new PouchDB("buymap");


    var getAllProductos = function(success) {
        console.log("getAllProductos");
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

    var getAllValoraciones = function(success){
        console.log("getAllValoraciones");
        localDB.allDocs({
            include_docs: true
        }).then(function(data){
            var datos = [];
            for (var i = 0;i<data.rows.length; i++) {
                datos.push(data.rows[i].doc)    
            };
            success(datos);
        });

    };


    var addAllProductos = function(data) {
        
        var insertarDb = function(producto) {
            localDB.put(producto).then(function(result) {

                //console.log(result);
                // handle response
            }).catch(function(err) {
                console.log(err);
            });
        };

        for (var i = 0; i < data.length; i++) {
            insertarDb(data[i]);
        }

    };

    return {
        getAllProductos: getAllProductos,
        addAllProductos: addAllProductos,
        getAllValoraciones: getAllValoraciones
    };

})




.factory('Productos', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var productos = [{
        id: 0,
        name: 'Tomate',
        notes: 'Enjoys drawing things',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Lechuga',
        notes: 'Odd obsession with everything',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Sardina',
        notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Acelga',
        notes: 'I think he needs to buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Esparrago',
        notes: 'Just the nicest guy',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];


    return {
        all: function() {
            return productos;
        },
        get: function(productoId) {
            // Simple index lookup
            return productos[productoId];
        }
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
