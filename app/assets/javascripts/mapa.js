$( document ).on('ready', function(){


	//    console.log('init map'); 
  var map =  L.map('map', {
    zoomControl: true,
    center: [40.4000, -3.7167],
    zoom: 12
  }).locate({setView: true, mazZoom: 16});

  var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }).addTo(map);

//  map.locate({setView: true, maxZoom: 8});

    //ernesmb
    //oriolbx

      // if (navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition(showPosition);
      //   console.log("location found!");
      // } else {
      //   alert("Geolocation is not available in this browser");
      // };

      // function showPosition(position){
      //   map.setView([position.coords.latitude, position.coords.longitude], 16);
      // };


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

  // map.locate({setView:true, watch:false})
  // .on('locationfound', function(l){
  // });
      

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

  $(function() {
     $( "#slider-range-min" ).slider({
       range: "min",
       value: 100,
       min: 100,
       max: 10000,
       slide: function( event, ui ) {
         $( "#amount" ).val(ui.value + meters);
       }
     });
     $( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
   });
            

          // if("geolocation" in navigator){
          //       var button = document.getElementById('locate_me');
          //       button.addEventListener('click', getLocation);
          //       console.log("yes, there is navigation!!!")
          //   } else {
          //       alert("Geolocation is not available in this browser")
          //   }

          //   function getLocation(){
          //       console.log('Getting location...'); 
          //       navigator.geolocation.getCurrentPosition(onLocation, onError, options);
          //   }

          //   var options = {
          //       enableHighAccuracy: true,
          //       timeout: 5000,
          //       maximumAge: 0
          //   }

          //   function onLocation(position){
          //       console.log("got it!");
          //       var lat = position.coords.latitude;
          //       var lon = position.coords.longiture;
          //       document.getElementById('location').innerHTML = "Your posititon is " + lat + " latitude and " + lon + " longitude.";
          //   }

          //   function onError(error){
          //       console.log("Getting location failed: " + error);
          //   }



     		    var layers = {
     		             'vias_ciclistas': {
     		               sql: 'SELECT * from table_130111_vias_ciclistas',
     		               cartocss: '#table_130111_vias_ciclistas { line-color: #0080ff; line-width: 3;}'
     		             },
     		             'carril_bus': {
     		               sql: 'SELECT * FROM bus',
     		               cartocss: '#bus{line-color: #FF6600; line-width: 2; line-opacity: 0.7;}'
     		             },
                        'camaras': {
                          sql: 'SELECT * FROM camaras',
                          cartocss: '#camaras{marker-fill-opacity: 0.9; marker-fill: #FF6600; marker-allow-overlap: true;}'
                        },
                        'incidentes_trafico': {
                          sql: 'SELECT * FROM incidentes_trafico',
                          cartocss: '#incidentes_trafico{marker-fill-opacity: 0.9; marker-fill: #0080ff; marker-allow-overlap: true;}'
                        },
                        'estaciones_tren': {
                          sql: 'SELECT * FROM estaciones_tren',
                          cartocss: '#estaciones_tren{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
                        },
                        'autobuses_urbanos': {
                          sql: 'SELECT * FROM autobuses_urbanos',
                          cartocss: '#autobuses_urbanos{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
                        },
                        'autobuses_interurbanos': {
                          sql: 'SELECT * FROM autobuses_interurbanos',
                          cartocss: '#autobuses_interurbanos{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
                        },
                        'paradas_metro': {
                          sql: 'SELECT * FROM paradas_metro',
                          cartocss: '#paradas_metro{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
                        },
                        'paradas_metro_ligero': {
                          sql: 'SELECT * FROM paradas_metro_ligero',
                          cartocss: '#paradas_metro_ligero{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
                        },
                        'paradas_taxi': {
                          sql: 'SELECT * FROM paradas_taxi',
                          cartocss: '#paradas_taxi{ marker-fill-opacity: 0.9; marker-fill: #FF6600;}'
                        },
     		           }

   		           // Empty layer
     		           cartodb.createLayer(map,{
     		               user_name: 'jaimedemora',
     		               type: 'cartodb',
     		               sublayers: []
     		             })
     		             .addTo(map)
     		             .done(function(layer){
     		               // When the layers inputs change fire this
     		               $("input[name='layer']").change(function(){

     		                 // Clear the sublayers
     		                 layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});

     		                 // For every check activated, add a sublayer
     		                 $.each($("input[name='layer']:checked"), function(){
     		                     layer.createSubLayer(layers[$(this).attr("id")]);
     		                 });
     		               });
     		           });


   		});
