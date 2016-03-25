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
   		             'bici_mad01': {
   		               sql: 'SELECT * FROM bici_mad01',
                        cartocss: '#bici_mad01{marker-fill-opacity: 0.9; marker-line-color: #FFF; marker-line-width: 1.5; marker-width: 10; marker-fill: #3B007F; }'
   		             },
   		             'aloja': {
   		               sql: 'SELECT * FROM aloj_ocio_btn100',
   		               cartocss: '#aloj_ocio_btn100{marker-fill-opacity: 0.9; marker-line-color: #FFF; marker-line-width: 1.5; marker-width: 10; marker-fill: #3B007F; }'
   		             }
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
