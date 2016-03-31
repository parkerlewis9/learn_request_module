$(document).ready(function(){
	$("#beers").on("click", function(e){
		console.log(e.target.innerText)
		$("#beerSearch").val(e.target.innerText);
		$("#beerSearch").focus()

	});
});