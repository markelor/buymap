angular.module('starter.geolocation', [])

.factory('Geolocation', function() {
    var localizar = function(success) {
        console.log('Geolocation...');
        navigator.geolocation.getCurrentPosition(function(position) {
            
            success(position.coords);
        });
    };
    var insertarMapa = function(latlng) {
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            scrollwheel: false,
            dragable: false
        };
        var stylez = [{
            featureType: "all",
            elementType: "all",
            stylers: [{
                saturation: -100
            }]
        }];

        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Usted está aquí"
        });
    };

    return {
        localizar: localizar,
        insertarMapa: insertarMapa
    };
});