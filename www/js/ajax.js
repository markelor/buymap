angular.module('starter.ajax', [])

.factory('AJAX', function(){
	var cargarDatos = function(success) {
		$.getJSON('server/productos.json', {}, function(json){
			success(json);
		});
	};

	return {
		cargarDatos : cargarDatos
	};
})

;