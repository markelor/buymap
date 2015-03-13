angular.module('starter.db', [])

.factory('Db', function() {
    var localDB = new PouchDB("buymap");

    var getAllProductos = function(success) {
        localDB.get().then(function(data){
            success(data);
        });
    };
    var addAllProductos = function(success) {
       //añadir 
    };

    return {
        getAllProductos: getAllProductos,
        addAllProductos: addAllProductos
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
});
