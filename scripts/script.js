$(document).ready(function(){


// Loads in the csv data JSON into the document
var loaded = false;
var dataset;
var clickable = false;

$.getJSON('data/companies.json', function(data){
	dataset = data;
	dataReady();
});

function dataReady() {
	console.log('data loaded');
	loaded = true;
	prepData();
}



// fires once the data is loaded in 
function prepData(){

clickable  = true;




var nameInput = document.getElementById('in');
var sub = document.getElementById('sub');

$('#sub').click(function(){
	clicked();
});

$("#in").keydown(function(e){
	if(e.keyCode == 13){
     // submit
     clicked();
    }
});


function clicked(){
		$("#sub").css('pointer-events', 'none');
		// LOADING ANIMATION? 

		if(clickable){

			var stockSymbol = nameInput.value;

			stockSymbol = stockSymbol.toUpperCase();

			if(stockSymbol.length < 6){
				// Checks to see if the value exists in the array
				var companyName = "";
				for(var i = 0; i < dataset.length; i++){
					if(dataset[i].Symbol == stockSymbol){
						companyName = dataset[i].Name;
						matched(stockSymbol, companyName);
						$("#sub").css('pointer-events', 'auto');
						break;
					}else if(i == (dataset.length-1)){
						noMatch(stockSymbol);
						$("#sub").css('pointer-events', 'auto');
					}
				}

			}else {
				noMatch(stockSymbol);
				$("#sub").css('pointer-events', 'auto');
			}



			function matched(symbol, name){
				var valueSelect = document.getElementById("in");
				console.log(name + " matched");

				createStock(symbol);

				addToDOM(symbol, name);

				/*
				var backImg = "url(https://www.nasdaq.com/charts/"+symbol+"_rm.jpeg)";
				var backImg2 = "url(https://www.nasdaq.com/charts/"+symbol+"_cnb.jpeg)";
				var companyImage = "url(https://www.nasdaq.com/logos/"+symbol+".GIF)";

				$('.stock-symbol').text(symbol);
				$('.stock-name').text(name);
				$('.f1-im').css('background-image', backImg);
				$('.f2-im').css('background-image', backImg2);
				$('.company-logo').css('background-image', companyImage);
				*/

				valueSelect.value = '';
			}


			function noMatch(name){
				var valueSelect = document.getElementById("in");
				valueSelect.value = "";

				$('.popup').css('background-color', '#F45184');
				$('.popup').text('STOCK NOT FOUND');
				$('.popup').css('opacity', '0.7');
				setTimeout(function(){
					$('.popup').css('opacity', '0');
				}, 2000);
			}
		}
	}




// WINDOW NAME CODE AND ARRAYS
//window.name = "ARRAY,";
window.name = "";
console.log(window.name);

var split =  window.name.split(",");
split.pop();

function createStock(symbol){

	var counter = 0;
	for(i in split ){
		if(split[i] == symbol){
			counter = counter +1;
		}else {
			// Do nothing
		}
	}

	if(counter > 0){
		console.log('Already tracking stock');
		// Already tracking popup
		$('.popup').css('background-color', 'lightgrey');
		$('.popup').text('ALREADY TRACKING STOCK');
		$('.popup').css('opacity', '0.7');
		setTimeout(function(){
			$('.popup').css('opacity', '0');
		}, 2000);

	}else {
		// New stock added popup
		$('.popup').css('background-color', '#4CE5D3');
		$('.popup').text('STOCK ADDED');
		$('.popup').css('opacity', '0.7');
		setTimeout(function(){
			$('.popup').css('opacity', '0');
		}, 2000);


		// ADDING STOCK TO WINDOW NAME
		window.name = window.name + symbol+",";
		split =  window.name.split(",");
		split.pop();
		console.log(split);
	}

}




// Function for pushing new stocks to the DOM 
var count = 0;
function addToDOM(symbol, name){

	var texts = document.createTextNode(count);

	count = count + 1;

	var card, info, stockSymbol, t, stockName, companyLogo, stockGallery, frames, f1, f1Image, grad1, f2, f2Image, grad2, del, trash;


	// Create card
	card = document.createElement("DIV");   
	card.className = "stock-card"; 

	// Create info class
	info = document.createElement("DIV"); 
	info.className = "info";

	//Create and add stock symbol, stock name, and company logo
	stockSymbol = document.createElement("H2"); 
	t = document.createTextNode(symbol);
	stockSymbol.appendChild(t);
	stockSymbol.className = "stock-symbol";

	stockName = document.createElement("H3"); 
	t = document.createTextNode(name);
	stockName.appendChild(t);
	stockName.className = "stock-name";

	companyLogo = document.createElement("DIV"); 
	companyLogo.style.backgroundImage = "url(https://www.nasdaq.com/logos/"+symbol+".GIF)";
	companyLogo.className = "company-logo";



	// Append children to info 
	info.appendChild(stockSymbol);
	info.appendChild(stockName);
	info.appendChild(companyLogo);


	// Create frames div
	frames = document.createElement("DIV"); 
	frames.className = "frames";

	// Create f1 div and children

	f1 = document.createElement("DIV"); 
	f1.className = "f1";

	var backImg = "url(https://www.nasdaq.com/charts/"+symbol+"_rm.jpeg)";
	f1Image = document.createElement("DIV"); 
	f1Image.style.backgroundImage = backImg;
	f1Image.className = "f1-im";

	grad1 = document.createElement("DIV"); 
	grad1.className = "grad1";

	// Add f1 children 

	f1.appendChild(f1Image);
	f1.appendChild(grad1);

	// Create f2 div and children

	f2 = document.createElement("DIV"); 
	f2.className = "f2";

	var backImg2 = "url(https://www.nasdaq.com/charts/"+symbol+"_cnb.jpeg)";
	f2Image = document.createElement("DIV");
	f2Image.style.backgroundImage = backImg2; 
	f2Image.className = "f2-im";

	grad2 = document.createElement("DIV"); 
	grad2.className = "grad2";

	// Add f2 children

	f2.appendChild(f2Image);
	f2.appendChild(grad2);

	// Add f1 and f2 divs to frames 

	frames.appendChild(f1);
	frames.appendChild(f2);


	// Create del div 

	del = document.createElement("DIV"); 
	del.className = "del";

	trash = document.createElement("DIV"); 
	trash.className = "trash";

	del.appendChild(trash);













	// Append info div to card
	card.appendChild(info);
	card.appendChild(frames);
	card.appendChild(del);



	// Attach event handlers

	del.onclick = function() { 
		console.log('delete');
		var parent = this.parentNode;
		setTimeout(function(){
			$(parent).css('opacity', '0');
			setTimeout(function(){
				parent.remove();
			}, 350);
		}, 0);
	};






	var stockGallery = document.getElementById("stocks");                              
	stockGallery.insertBefore(card, stockGallery.firstChild);       

}













// Date configuration
var d = new Date();
var stringDate = d.toString();
var theDate = stringDate.substring(4,24);
theDate = theDate.toUpperCase();
theDate = "UPDATED: " + theDate;
$('.updated').text(theDate);



// Refresh button 
$('.refresh').click(function(){
location.reload();
});



/*
// Deletion function 
$('.del').click(function(){

console.log('del');
var parent = this.parentNode;

setTimeout(function(){
	$(parent).css('opacity', '0');
	setTimeout(function(){
		parent.remove();
	}, 350);
}, 0);
});
*/






}











});