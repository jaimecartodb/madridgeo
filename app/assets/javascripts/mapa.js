$( document ).on('ready', function(){

  var trigger = $('.hamburger'),
  overlay = $('.overlay'),
  isClosed = false;

  trigger.click(function () {
        hamburger_cross();      
      });

      function hamburger_cross() {

        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    }); 

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
      circle: false,
      marker: {
        icon: markerIcon
      },
    },
    edit: {
      featureGroup: drawnItems
    }
  });
  map.addControl(drawControl);




  var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  zIndex:-1
  }).addTo(map);

  var basemap2 =  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: 'Dark',
      zIndex:-1
    });
  // // var osm = {
  // //   'osm basemap': basemap
  // // };
  // // var dark_matter = {
  // //   'dark_matter': basemap2
  // // };

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
      },
      'madrid_neighbours': {
        sql: 'SELECT * FROM madrid_barrios_parametros',
        cartocss: '#madrid_barrios_parametros{polygon-fill: #FFFFB2; polygon-opacity: 0.8; line-color: #FFF; line-width: 0.5; line-opacity: 1; } #madrid_barrios_parametros [ seguridad <= 5] { polygon-fill: #B10026; } #madrid_barrios_parametros [ seguridad <= 5] { polygon-fill: #E31A1C; } #madrid_barrios_parametros [ seguridad <= 4] {   polygon-fill: #FC4E2A; } #madrid_barrios_parametros [ seguridad <= 4] {   polygon-fill: #FD8D3C; } #madrid_barrios_parametros [ seguridad <= 3] { polygon-fill: #FEB24C; } #madrid_barrios_parametros [ seguridad <= 3] {   polygon-fill: #FED976; } #madrid_barrios_parametros [ seguridad <= 2] {    polygon-fill: #FFFFB2; }'
        }
    };

    var columns = {
      'cyclist_routes': ['cartodb_id', 'nombre_via'],
      'bus_path': ['cartodb_id', 'observ'],
      'traffic_cameras': ['cartodb_id', 'name'],
      'traffic_incidents': ['cartodb_id', 'name'],
      'train_stations': ['cartodb_id', 'name'],
      'urban_buses': ['cartodb_id', 'name'],
      'interurban_buses': ['cartodb_id', 'name'],
      'metro_stops': ['cartodb_id', 'name'],
      'light_metro_stops': ['cartodb_id', 'name'],
      'taxi_stops': ['cartodb_id', 'name'],
      'madrid_neighbours': ['cartodb_id', 'barrio']
    }

//   var coolTemplate = '<script type="infowindow/html" id="infowindow_template">
//   <div class="cartodb-popup v2">
//     <a href="#close" class="cartodb-popup-close-button close">x</a>
//      <div class="cartodb-popup-content-wrapper">
//        <div class="cartodb-popup-header">
//          <img style="width: 100%" src="http://cartodb.com/assets/logos/logos_full_cartodb_light.png"></src>
//        </div>
//        <div class="cartodb-popup-content">
//          <!-- content.data contains the field info -->
//          <h4>City: </h4>
//          <p>{{content.data.name}}</p>
//        </div>
//      </div>
//      <div class="cartodb-popup-tip-container"></div>
//   </div>
// </script>';

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
      layer.setZIndex(9000);
      window.cdb_layer=layer;
     	$("input[name='layer']").change(function(){
     		layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
     		$.each($("input[name='layer']:checked"), function(){
     		  layer.createSubLayer(layers[$(this).attr("id")]);
          var numSubLayers = layer.getSubLayerCount();
          console.log(columns[$(this).attr("id")]);
          cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(numSubLayers-1), columns[$(this).attr("id")], {
            infowindowTemplate: '<p>{{name}}</p>'
          });
     		});
        window.cdb_layer.getSubLayers().forEach(function(l){
          l.sql_origin = l.getSQL();
        });


      });
      var LayerActions = {
        OSM: function(){
          if (map.hasLayer(basemap) || (map.hasLayer(basemap2))){
            map.removeLayer(basemap);
            map.removeLayer(basemap2);
          } 
          console.log('blabla')
          map.addLayer(basemap);
          return true;
        },

        stamen: function(){
          if (map.hasLayer(basemap) || (map.hasLayer(basemap2))){
            map.removeLayer(basemap);
            map.removeLayer(basemap2);
          }

          map.addLayer(basemap2);
          return true;
        }
      }

      
      
      $('#selector').change(function() {
        LayerActions[$(this).val()]();
      });
      var v = cdb.vis.Overlay.create('search', map.viz, {})
      v.show();
      $('#map').append(v.render().el);

      map.on('draw:created', function (e) {
        var getPolWKT = function(polygon){
          return 'POLYGON ((' + 
                polygon.toGeoJSON().geometry.coordinates[0].map(function(p){
                  return p[0] + ' ' + p[1]})
                .join(',') + '))';
        }
        var type = e.layerType,
          layerdrawn = e.layer;

        window.cdb_layer.getSubLayers().forEach(function(l){
          var sql = l.sql_origin + " WHERE ST_INTERSECTS(the_geom, st_geomfromtext('" + getPolWKT(e.layer) + "', 4326))";
          l.setSQL(sql);
        });
        // if (type === 'marker') {
        //   layerdrawn.bindPopup('A popup!');
        // }
        drawnItems.getLayers().forEach(function(d){
          drawnItems.removeLayer(d);
        });

        drawnItems.addLayer(layerdrawn);
        
      });
    });

});