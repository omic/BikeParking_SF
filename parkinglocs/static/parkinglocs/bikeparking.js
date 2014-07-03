function locsController() {
	var parkingLocs = new Array();
// 	var currentLoc = new google.maps.LatLng(37.773478, -122.421888);
	var currentLatLng = new google.maps.LatLng(37.773478, -122.421888);
// 	var coordinatePair = new Array();
	
	this.requestMarkerData = function () {
		var url = 'parkinglocs/';
// 		var parkingLocs = new Array();
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
// 					datasource.add(markerObj);
					parkingLocs.push(markerObj);
				}
			}
		 }).complete(function() {
// 			datasource.setParkingLocs(parkingLocs);
// 			console.log(parkingLocs);
			google.maps.event.addDomListener(window, 'load', initialize());
		});	 
	}
	
	this.getParkingLocs = function() {
		return parkingLocs;
	}

	this.parseData = function () {

	}
	
	this.requestInfo = function () {
	}
	
	this.showInfo = function () {
	// ajax
	}
	
	function initialize() {
		var myLatlng = new google.maps.LatLng(37.773478, -122.421888);
  		var mapOptions = {
  			zoom: 32,
    		center: myLatlng
    	}
    	
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		
		for (var i=0; i < parkingLocs.length; i++) {
			var marker = parkingLocs[i];
// 			alert(marker);
			var oneMarker = new google.maps.Marker({
				position: marker.coordinate,
				map: map,
				title:marker.location
		});
		}
		
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

		
		
		google.maps.event.addListener(map, 'click', function(event) {
			placeMarker(event.latLng);
		});
	}
	
	function placeMarker(location) {
		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
	map.setCenter(location);
	}
}
// function loadMarker(datasource) {
//   
// }




