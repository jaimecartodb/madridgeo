   		$( document ).on('ready', function(){
   		//    console.log('init map'); 
   		    var map =  L.map('map', {
   		      zoomControl: true,
   		      center: [40.4000, -3.7167],
   		      zoom: 12
   		    });

   		    var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
   		            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
   		    }).addTo(map);

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
