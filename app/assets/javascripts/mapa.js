$( document ).on('ready', function(){


	//    console.log('init map'); 
  var map =  L.map('map', {
    zoomControl: true,
    center: [40.4000, -3.7167],
    zoom: 12
  });

  var LeafIcon = L.Icon.extend({
    options: {
      iconSize:     [38, 95],
      iconAnchor:   [22, 94],
      popupAnchor:  [-3, -76]
    }
  });

  var markerIcon = new LeafIcon({
    iconUrl: 'http://com.cartodb.users-assets.production.s3.amazonaws.com/simpleicon/map43.svg'
    });

  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  var drawControl = new L.Control.Draw({
    position: 'bottomright',
    draw: {
      polygon: {
        shapeOptions: {
          color: '#019'
        },
        allowIntersection: false,
        drawError: {
          color: '#019',
          timeout: 1000
        },
        showArea: true,
        metric: false,
        repeatMode: true
      },
      polyline: {
        shapeOptions: {
          color: '#019'
        },
      },
      rectangle: false,
      circle: {
        shapeOptions: {
          color: '#019'
        },
      },
      marker: {
        icon: markerIcon
      },
    },
    edit: {
      featureGroup: drawnItems
    }
  });
  map.addControl(drawControl);

  map.on('draw:created', function (e) {
    var type = e.layerType,
      layer = e.layer;

    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);
  });


  // var drawControl = new L.Control.Draw({
  //     edit: {
  //         featureGroup: drawnItems
  //     }
  // });
  // map.addControl(drawControl);

  // var selectLayer = L.geoJson().addTo(map); //add empty geojson layer for selections


  // var options = {
  //     position: 'topright',
  //     draw: {
  //         polyline:false,
  //         polygon: {
  //             allowIntersection: false, // Restricts shapes to simple polygons
  //             drawError: {
  //                 color: '#e1e100', // Color the shape will turn when intersects
  //                 message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
  //             },
  //             shapeOptions: {
  //                 color: '#bada55'
  //             }
  //         },
  //         circle: false, // Turns off this drawing tool
  //         rectangle: {
  //             shapeOptions: {
  //                 clickable: false
  //             }
  //         },
  //         marker:false
  //     }
  // };

  // var drawControl = new L.Control.Draw(options);
  // map.addControl(drawControl);
  // $('.leaflet-draw-toolbar').hide();

  var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }).addTo(map);

  // var basemap2 =  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  //     attribution: 'Dark'
  //   });
  // var osm = {
  //   'osm basemap': basemap
  // };
  // var dark_matter = {
  //   'dark_matter': basemap2
  // };

  // L.control.layers(osm, dark_matter).addTo(map);


  map.locate({setView:true, watch:false, maxZoom: 13})
  .on('locationfound', function(l){
    //var pos=l.latlng;
    console.log(l);
    var loc=L.circleMarker(l.latlng, {stroke:true, color:'#019',weight:0.5,fillOpacity:0.1,radius:100}).addTo(map);
    if(l.accuracy<1000){
      L.circle(l.latlng,l.accuracy,{stroke:true, color:'#00F',weight:0.5,fillOpacity:0}).addTo(map);
      }
    else{
      console.log('Accuracy >1000m: '+l.accuracy);
    }
  });


  $('#locate_me').click(function(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not available in this browser");
    }
  });

  function showPosition(position){
    map.setView([position.coords.latitude, position.coords.longitude], 16);
  };

    var layers = {
     	'cyclist_routes': {
     		sql: 'SELECT * from table_130111_vias_ciclistas',
     		cartocss: '#table_130111_vias_ciclistas { line-color: #0080ff; line-width: 3;}'
     	},
     	'bus_path': {
     	  sql: 'SELECT * FROM bus',
     		cartocss: '#bus{line-color: #FF6600; line-width: 2; line-opacity: 0.7;}'
     	},
      'traffic_cameras': {
        sql: 'SELECT * FROM camaras',
        cartocss: '#camaras{marker-fill-opacity: 0.9; marker-fill: #FF6600; marker-allow-overlap: true;}'
      },
      'traffic_incidents': {
        sql: 'SELECT * FROM incidentes_trafico',
        cartocss: '#incidentes_trafico{marker-fill-opacity: 0.9; marker-fill: #0080ff; marker-allow-overlap: true;}'
      },
      'train_stations': {
        sql: 'SELECT * FROM estaciones_tren',
        cartocss: '#estaciones_tren{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
      },
      'urban_buses': {
        sql: 'SELECT * FROM autobuses_urbanos',
        cartocss: '#autobuses_urbanos{ marker-fill-opacity: 0.9; marker-fill: #7B00B4;}'
      },
      'interurban_buses': {
        sql: 'SELECT * FROM autobuses_interurbanos',
        cartocss: '#autobuses_interurbanos{ marker-fill-opacity: 0.9; marker-fill: #000000;}'
      },
      'metro_stops': {
        sql: 'SELECT * FROM paradas_metro',
        cartocss: '#paradas_metro{ marker-fill-opacity: 0.9; marker-fill: #FFCC00;}'
      },
      'light_metro_stops': {
        sql: 'SELECT * FROM paradas_metro_ligero',
        cartocss: '#paradas_metro_ligero{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
      },
      'taxi_stops': {
        sql: 'SELECT * FROM paradas_taxi',
        cartocss: '#paradas_taxi{ marker-fill-opacity: 0.9; marker-fill: #055D00;}',
        interactivity: 'cartodb_id, name'
      }
    };

    // {
    //   'cyclist_routes': ['cartodb_id, mass'],
    //   'bus_path': {
    //     sql: 'SELECT * FROM bus',
    //     cartocss: '#bus{line-color: #FF6600; line-width: 2; line-opacity: 0.7;}'
    //   },
    //   'traffic_cameras': {
    //     sql: 'SELECT * FROM camaras',
    //     cartocss: '#camaras{marker-fill-opacity: 0.9; marker-fill: #FF6600; marker-allow-overlap: true;}'
    //   },
    //   'traffic_incidents': {
    //     sql: 'SELECT * FROM incidentes_trafico',
    //     cartocss: '#incidentes_trafico{marker-fill-opacity: 0.9; marker-fill: #0080ff; marker-allow-overlap: true;}'
    //   },
    //   'train_stations': {
    //     sql: 'SELECT * FROM estaciones_tren',
    //     cartocss: '#estaciones_tren{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
    //   },
    //   'urban_buses': {
    //     sql: 'SELECT * FROM autobuses_urbanos',
    //     cartocss: '#autobuses_urbanos{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
    //   },
    //   'interurban_buses': {
    //     sql: 'SELECT * FROM autobuses_interurbanos',
    //     cartocss: '#autobuses_interurbanos{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
    //   },
    //   'metro_stops': {
    //     sql: 'SELECT * FROM paradas_metro',
    //     cartocss: '#paradas_metro{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
    //   },
    //   'light_metro_stops': {
    //     sql: 'SELECT * FROM paradas_metro_ligero',
    //     cartocss: '#paradas_metro_ligero{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
    //   },
    //   'taxi_stops': {
    //     sql: 'SELECT * FROM paradas_taxi',
    //     cartocss: '#paradas_taxi{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}',
    //     interactivity: 'cartodb_id, name'
    //   }
    // }

    // $(function() {
    //        $( "#slider-range-min" ).slider({
    //          range: "min",
    //          value: 70,
    //          min: 0,
    //          max: 100,
    //          slide: function( event, ui ) {
    //            $( "#amount" ).val(ui.value + "%" );
    //            op = $( "#slider-range-min" ).slider( "value" ) / 100;
    //            layer.setOpacity(op);
    //          }
    //        });
    //        $( "#amount" ).val( $( "#slider-range-min" ).slider( "value" ) + "%");
    //      });
    // })
    // .error(function(err) {
    //     console.log("error: " + err);
    // });




   		           // Empty layer
    cartodb.createLayer(map,{
     	user_name: 'jaimedemora',
     	type: 'cartodb',
     	sublayers: []
    })
    .addTo(map)
    .done(function(layer){
     	$("input[name='layer']").change(function(){
     		layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
     		$.each($("input[name='layer']:checked"), function(){
     		  layer.createSubLayer(layers[$(this).attr("id")]);
          var numSubLayers = layer.getSubLayerCount();
          cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(numSubLayers-1), ['cartodb_id']);
     		});


      // var LayerActions = {
      //   default: function(){
      //     if (map.hasLayer(basemap) || (map.hasLayer(basemap2))){
      //       map.removeLayer(basemap);
      //       map.removeLayer(basemap2);
      //     } 

      //     map.addLayer(basemap1);
      //     return true;
      //   },

      //   stamen: function(){
      //     if (map.hasLayer(basemap) || (map.hasLayer(basemap2))){
      //       map.removeLayer(basemap);
      //       map.removeLayer(basemap2);
      //     }

      //     map.addLayer(basemap2);
      //     return true;
      //   }
      // }
      
      $('#selector').change(function() {
        LayerActions[$(this).val()]();
      });
      });
      var v = cdb.vis.Overlay.create('search', map.viz, {})
      v.show();
      $('#map').append(v.render().el);
    });

});