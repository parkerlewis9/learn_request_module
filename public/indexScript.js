$(document).ready(function(){
	// Selecting a beer
	$("#beers").on("click", function(e){
		$("#beerSearch").val(e.target.innerText);
		$("#beerSearch").focus();
	});

	// Deleting a beer

	$(".delete-one").on("click", function(e){
		$.ajax({
		    url: '/beers/' + $(e.target).attr("data-id"),
		    type: 'DELETE',
		    dataType: "json",
		    success: function(result) {
		    	$(e.target).parent().parent().fadeOut("fast")
		    }
		});
	})


	// Deleting all beers

});