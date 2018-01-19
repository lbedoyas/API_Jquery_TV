$(function() {

	var $tvShowsContainer = $('#app-body').find('.tv-shows')

	$tvShowsContainer.on('click','button.like', function(ev){
		var $this = $(this);
		$this.closest('.tv-show').toggleClass('liked')//closest sirve para buscar en la jerarquia de elemento cual es elemento padre para buscar el corazon 
		
	})

	function renderShows(shows){
		$tvShowsContainer.find('.loader').remove();
			shows.forEach(function(show){
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':summary:', show.summary)
				.replace(':img alt:', show.name + "Logo")

			var $article = $(article)
			$article.hide();
			$tvShowsContainer.append($article.fadeIn());
			})
	}

	/*submit search formulario */
	$('#app-body')
		.find('form')
		.submit(function onsubmit (ev) {
		ev.preventDefault();	
		var busqueda = $(this)
			.find('input[type="text"]')
			.val();
			$tvShowsContainer.find('.tv-show').remove()
			var $loader = $('<div class="loader">')
			$loader.appendTo($tvShowsContainer);

			$.ajax({
				url:'http://api.tvmaze.com/search/shows',
				data: { q: busqueda }, //son los parametros de busqueda en la api tvmaze se definio como q por eso se pone qy busqueda es la variable que nosotros le asignamos
				success: function(res, textStatus, xhr){
						$loader.remove();
						var shows = res.map(function(el){//map es lo que se en encuentra en cada movimiento del arrays
						return el.show;
						console.log(shows);
					})
					renderShows(shows);
				}
			})
	})


		var template = '<article class="tv-show">' +
					   '<div class="left img-container">'+
					   '<img src=":img:" alt=":img alt:">' + 
						'</div>'+
						'<div class="right info">'+
						'<h1>:name:</h1>'+
						'<p>:summary:</p>'+
						'<button class="like"> 💖 </button>'
					'</div>'+	
			'</article>';


	//Ejemplo de promesas en jquery cuando se requiere hacer un llamado a varios call backs
if (!localStorage.shows){ //se utiliza para preguntar si ya tiene informacion guardada en localstorage
	$.ajax('http://api.tvmaze.com/shows')
	.then(function(shows){
		$tvShowsContainer.find('.loader').remove()	//el loader es para despues de la carga de la clase loader en css muestre la informacion
		localStorage.shows = JSON.stringify(shows); //lo que se hace es que se guardan strings(JSON.stringify hace la conversion de JSON a string)
		renderShows(shows);
	})
}else
{
	renderShows(JSON.parse(localStorage.shows));
}


	/*$.ajax({
		url: 'http://api.tvmaze.com/shows',
		success: function(shows, textStatus, xhr){
		$tvShowsContainer.find('.loader').remove()	//el loader es para despues de la carga de la clase loader en css muestre la informacion
		renderShows(shows);
		
		}

	})*/
})






