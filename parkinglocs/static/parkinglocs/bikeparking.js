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
					var showInfoDict = ["location", "coordinates", "address", "bike_parking", 
									"placement", "racks", "spaces", "yr_installed", "installed_by", "status"];
					var contentString = '<div id="infoBox">'+'<ul>';
					for (var i=0; i<showInfoDict.length; i++) {
						var key = showInfoDict[i]
						var value = fields[key];
						contentString = contentString +
										'<li><b>'+key+'</b>+: '+value+'</li>';
					}
					contentString += '</ul> </div>';
					var infowindow = new google.maps.InfoWindow({
				      content: contentString
				  	});
				
					infowindow.open(map, map.markers[closest])					
				});
			});
	}
	
	function rad(x) {return x*Math.PI/180;}
}