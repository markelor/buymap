// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.db', 'starter.ajax'])

.run(function($ionicPlatform, AJAX, Db, Registro) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    //obtener datos ajax

    AJAX.cargarDatos(function(datos) {
        console.log(datos);
    });

    //obtener los usuarios
    AJAX.cargarUsuarios(function(datos) {
        console.log(datos);
        for(var i=0; i<datos.length;i++){
        Registro.guardar(datos[i].username, datos[i].password, datos[i].email);
      }
    });



})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.misListas', {
        url: '/misListas',
        views: {
            'misListas': {
                templateUrl: 'templates/misListas.html',
                controller: 'MisListasCtrl',
                css: 'css/misListas.css'
            }
        }
    })

    .state('tab.ruta', {
        url: '/ruta',
        views: {
            'ruta': {
                templateUrl: 'templates/ruta.html',
                controller: 'RutaCtrl'
            }
        }
    })



    .state('registro', {
        url: '/registro',
        templateUrl: 'templates/registro2.html',
        controller: 'RegistroCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    });

    // ir a esta ruta por defecto
    $urlRouterProvider.otherwise('/login');
});