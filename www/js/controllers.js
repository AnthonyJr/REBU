angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


// .controller('MapCtrl', function($scope, $ionicLoading, $compile){
//   var lat;
//   var lng;
//   $scope.init = function() {
//     navigator.geolocation.getCurrentPosition(function(pos){
//       $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//       lat = pos.coords.latitude;
//       lng = pos.coords.longitude;
//     })
//      var myLatLng = new google.maps.LatLng(lat,lng);

//     var mapOptions = {
//       center: myLatLng, 
//       zoom: 16, 
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };

//     var map = new google.maps.Map(document.getElementById('map'),mapOptions);
//     $scope.map =map; 

//     var marker = new google.maps.Marker({
//       position: myLatLng,
//       map: map,
//       title: "You Are Here"

//     });

//     marker.setMap(map);



//   } 
// });


// .controller('MapCtrl', function($scope, $ionicLoading, $compile, $cordovaGeolocation){
//   ionic.Platform.ready(function(){
//       $scope.init = function() {


//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: 0, lng: 0}, 
//       zoom: 16
//     });
//     var marker = new google.maps.Marker({
//       map: map
//     });

//     $cordovaGeolocation.getCurrentPosition(options).then(function(pos){
//       var pos = {
//         lat: pos.coords.latitude, 
//         lng: pos.coords.longitude
//       };

//       marker.setPosition(pos);
//       map.setCenter(pos);

//       // autocomplete
//       // var input = document.getElementById('pac-input');
//       var input2 = document.getElementById('pac-input2');
//       map.controls[google.maps.ControlPosition.TOP].push(input2);

//       // map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(input);

//       // var autocomplete = new google.maps.places.Autocomplete(input);
//       var autocomplete2 = new google.maps.places.Autocomplete(input2);

//       autocomplete2.addListener('place_changed', function(){

//         var place = autocomplete2.getPlace();
//         var destLat = place.geometry.location.lat();
//         var destLng = place.geometry.location.lng();
//         console.log(destLat + ' ' + destLng);
//         console.log(pos);
//         var directionsDisplay = new google.maps.DirectionsRenderer({
//           map: map
//         });

//         var request = {
//           destination: {lat: destLat, lng: destLng}, 
//           origin: (pos),
//           travelMode: google.maps.TravelMode.DRIVING
//         };

//       // Pass the directions request to the directions service.
//       var directionsServices = new google.maps.DirectionsService();
//       directionsServices.route(request, function(response, status){
//         if (status == google.maps.DirectionsStatus.OK) {
//           directionsDisplay.setPanel(document.getElementById('right-panel'));

//           console.log( (response.routes[0].legs[0].distance.value) * .001 );
//           console.log( "The rate you should charge is: " + (response.routes[0].legs[0].distance.value) * .001 * 2.38) * .25;

//           directionsDisplay.setDirections(response);
//         }
//       });     


//       })

      



//     })

//   } 
//   })


// });
.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup) {
     
    $ionicPlatform.ready(function() {    
 
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         

        var posOptions = {
            enableHighAccuracy: false,
            timeout: 20000
        };
 
        
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

             
            var myLatlng = new google.maps.LatLng(lat, long);


            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
            $scope.map = map;   
            $ionicLoading.hide();  
            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map, 
              title: 'you are here'
            })  
            var input2 = document.getElementById('pac-input2');
            map.controls[google.maps.ControlPosition.TOP].push(input2);

            var autocomplete2 = new google.maps.places.Autocomplete(input2);
            autocomplete2.addListener('place_changed', function(){
              marker.setMap(null);
              var place = autocomplete2.getPlace();
              var destLat = place.geometry.location.lat();
              var destLng = place.geometry.location.lng();
              console.log(destLat + ' ' + destLng);
              console.log(posOptions);
              var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
              });

              var request = {
                destination: {lat: destLat, lng: destLng}, 
                origin: (myLatlng),
                travelMode: google.maps.TravelMode.DRIVING
              };

      var directionsServices = new google.maps.DirectionsService();
      directionsServices.route(request, function(response, status){
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setPanel(document.getElementById('right-panel'));
          var alertPopup = $ionicPopup.alert({
            title: "Rate", 
            template: "The rate you should charge is: " + ((response.routes[0].legs[0].distance.value*.001 *2.10 * 1.15) + 2.50)
          })


          // directionsDisplay.setDirections(response); // this is that big block of text
        }
      })

            })
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    })              
});


