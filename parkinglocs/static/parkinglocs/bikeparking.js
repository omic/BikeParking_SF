function locsController() {
	var parkingLocs = new Array();
	var currentLatLng = new google.maps.LatLng(37.773478, -122.421888);
	
	this.requestMarkerData = function () {
		var url = 'parkinglocs/';
		var jqxhr = $.getJSON(url, function(data) {
			for (var i = 0; i < data.length; i++) {
				var oneLoc = data[i];
				if(oneLoc["location"]!=null) {
					var markerObj = new Object();
					markerObj.location = oneLoc["location"];
					var GPSlocation = oneLoc["coordinates"].replace("(", "").replace(")", "").split(", ");
					
					var Lat = parseFloat(GPSlocation[0]);
					var Lng = parseFloat(GPSlocation[1]);
					var myLatlng = new google.maps.LatLng(Lat,Lng);
					//alert(myLatlng);
					markerObj.coordinate = myLatlng;
					parkingLocs.push(markerObj);
				}
			}
		 }).complete(function() {
			console.log(parkingLocs);
			google.maps.event.addDomListener(window, 'load', initialize());
		});	 
	}
	
	var map;
	
	function initialize() {
		var myLatlng = new google.maps.LatLng(37.773478, -122.421888);
	  		var mapOptions = {
	  			zoom: 32,
	    		center: myLatlng
	    	}
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		
		var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
	      '<div id="bodyContent">'+
	      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	      'sandstone rock formation in the southern part of the '+
	      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
	      'south west of the nearest large town, Alice Springs; 450&#160;km '+
	      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
	      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
	      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
	      'Aboriginal people of the area. It has many springs, waterholes, '+
	      'rock caves and ancient paintings. Uluru is listed as a World '+
	      'Heritage Site.</p>'+
	      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
	      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
	      '(last visited June 22, 2009).</p>'+
	      '</div>'+
	      '</div>';
	
		var infowindow = new google.maps.InfoWindow({
	      content: contentString
	  	});
	
		map.markers = [];
	
		for (var i=0; i < parkingLocs.length; i++) {
			var marker = parkingLocs[i];
			var oneMarker = new google.maps.Marker({
				position: marker.coordinate,
				map: map,
				title:marker.location
			});
			map.markers.push(oneMarker);
		}
			
			//https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax
			// var csrftoken = $.cookie('csrftoken');
			
			// function csrfSafeMethod(method) {
			//     // these HTTP methods do not require CSRF protection
			//     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
			// }
			// $.ajaxSetup({
			//     beforeSend: function(xhr, settings) {
			//         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
			//         }
			//     }
			// });
			
			// google.maps.event.addListener(oneMarker, 'click', function() {
			// 	// infowindow.open(map,oneMarker);
			// 	var value = oneMarker.getTitle();
			// 	alert(value);
			// 	// console.log();
			// 	// var jqxhr = $.post( 'parkinglocs/', function() {
			// 	//   alert( "success" );
			// 	// })
			// 	//   .done(function() {
			// 	//     alert( "second success" );
			// 	//   })
			// 	//   .fail(function() {
			// 	//     alert( "error" );
			// 	//   })
			// 	//   .always(function() {
			// 	//     alert( "finished" );
			// 	// });
			// 	// 
			// 	// // Perform other work here ...
			// 	// // Set another completion function for the request above
			// 	// jqxhr.always(function() {
			// 	//   alert( "second finished" );
			// 	// });
			// 		  });
			google.maps.event.addListener(map, 'click', function( event ) {
			    var lat = event.latLng.lat();
			    var lng = event.latLng.lng();
			    var R = 6371;
			    var distances = [];
			    var closest = -1;
			    for( i=0;i<map.markers.length; i++ ) {
			        var mlat = map.markers[i].position.lat();
			        var mlng = map.markers[i].position.lng();
			        var dLat  = rad(mlat - lat);
			        var dLong = rad(mlng - lng);
			        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
			        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			        var d = R * c;
			        distances[i] = d;
			        if ( closest == -1 || d < distances[closest] ) {
			            closest = i;
			        }
			    }

			    alert(map.markers[closest].title);			
				$.post( 'parkinglocs/', { 'coordinate': map.markers[closest].getPosition().toString() , 'location': map.markers[closest].getTitle()} );
			// 	var jqxhr = $.post( 'parkinglocs/', function() {
			// 		  alert( "success" );
			// 	})
			// 	.done(function() {
			// 		    alert( "second success" );
			// 		  })
			// 		  .fail(function() {
			// 		    alert( "error" );
			// 		  })
			// 		  .always(function() {
			// 		    alert( "finished" );
			// 		});
			// 		
			// 		// Perform other work here ...
			// 		// Set another completion function for the request above
			// 		jqxhr.always(function() {
			// 		  alert( "second finished" );
			// 		});
			});
	}
	
	function rad(x) {return x*Math.PI/180;}
}




