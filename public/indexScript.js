$(document).ready(function(){
	$("#beers").on("click", function(e){
		$("#beerSearch").val(e.target.innerText);
		$("#beerSearch").focus();
	});
});