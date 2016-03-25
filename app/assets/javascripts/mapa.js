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
