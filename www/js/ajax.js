angular.module('starter.ajax', [])

.factory('AJAX', function() {
    var cargarDatos = function(success) {
        $.getJSON('server/productos.json', {}, function(json) {
            success(json);
        });
    };
    var cargarUsuarios = function(success) {
        $.getJSON('server/usuarios.json', {}, function(json) {
            success(json);
        });
    };
    var cargarValoraciones = function(success) {
        $.getJSON('server/valoraciones.json', {}, function(json) {
            success(json);
        });
    };

    return {
        cargarDatos: cargarDatos,
        cargarUsuarios: cargarUsuarios,
        cargarValoraciones: cargarValoraciones
    };
})

;
