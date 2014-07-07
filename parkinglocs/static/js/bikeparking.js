function locsController() {
	var parkingLocs = new Array();
	var map;
	var SFAREA = {'NORTH': 37.810068, 'SOUTH': 37.708554, 'WEST': -122.513989, 'EAST': -122.356738};
		
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
					markerObj.coordinate = myLatlng;
					parkingLocs.push(markerObj);
				}
			}
		 }).complete(function() {
			console.log(parkingLocs);
			google.maps.event.addDomListener(window, 'load', initialize());
		});
	}
	
	function initialize() {
		//default map center
		var myLatlng = new google.maps.LatLng(37.773478, -122.421888);
		
		if(navigator.geolocation) {
			// get current location
			// if navigator is enabled and current location is within San Francisco area, update map center with current location
			navigator.geolocation.getCurrentPosition(function(position) {
				if(position.coords.latitude>=SFAREA['SOUTH']&&position.coords.latitude<=SFAREA['NORTH']
					&&position.coords.longitude>=SFAREA['WEST']&&position.coords.longitude<=SFAREA['EAST']) {
						myLatlng.lat = position.coords.latitude;
						myLatlng.lng = position.coords.longitude;
					}
			});		
		  }
		
	  	var mapOptions = {
	  			zoom: 20,
	    		center: myLatlng
	    	}
	

		
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
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

			$.post( 'parkinglocs/', 
				{ 'coordinate': map.markers[closest].getPosition().toString() , 'location': map.markers[closest].getTitle()})
				.done(function(data) {
					var obj = JSON && JSON.parse(data) || $.parseJSON(data);
					var fields = obj[0].fields;
					var showInfoDict = ["address", "bike_parking", 
									"placement", "racks", "spaces", "yr_installed", "installed_by", "status"];
					var contentString = '<div class="infobox"><h2>'+
										fields["location"]+
										'</h2><div class="info"><h2>'+fields["coordinates"]+'</h2><ul>';
					for (var i=0; i<showInfoDict.length; i++) {
						var key = showInfoDict[i]
						var value = fields[key];
						contentString = contentString +
										'<li><b>'+key+'</b>: '+value+'</li>';
					}
					contentString += '</ul> </div>';
					var infowindow = new google.maps.InfoWindow({
				      content: contentString
				  	});
				
					infowindow.open(map, map.markers[closest])					
				});
			});
			
			var mc = new MarkerClusterer(map, map.markers);
	}
	
	function rad(x) {return x*Math.PI/180;}
	
	function handleNoGeolocation(errorFlag) {
	  if (errorFlag) {
	    var content = 'Error: The Geolocation service failed.';
	  } else {
	    var content = 'Error: Your browser doesn\'t support geolocation.';
	  }

	  var options = {
	    map: map,
	    position: new google.maps.LatLng(60, 105),
	    content: content
	  };

	  var infowindow = new google.maps.InfoWindow(options);
	  map.setCenter(options.position);
	}
}