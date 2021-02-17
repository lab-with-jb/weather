

//let key = 'bebde0cadb3f2e18b1f157e8c18182da';

//https://www.codeinwp.com/blog/fetch-api-tutorial-for-beginners/
//https://www.freecodecamp.org/learn/data-visualization/json-apis-and-ajax/get-json-with-the-javascript-fetch-method



let text =  document.getElementById('wellyWeather');

//actual api url, file is currently using a  test fil
//let api_url = 'https://api.openweathermap.org/data/2.5/weather?q=Wellington&appid=bebde0cadb3f2e18b1f157e8c18182da';

//test data at https://jsonbin.io/
//https://jsonbin.io/6024ff0d3b303d3d964f14a2
//use jamie umbraco login

//remember to update url when updating json bin
let test_url = 'https://api.jsonbin.io/b/6024ff0d3b303d3d964f14a2/1';
let test_key = "$2b$10$cYywHYjIj63b6czjUlMbzejpdej/MYmGkfFxh9zwfYFIDwKVozOwK";

//first line makes a request, fetch method returns a Promise
fetch(test_url, {
	method: "GET",
	headers: {"secret-key": test_key}
	})
//promise is fulfilled, response object is returned
//then method takes response and makes it into JSON
  .then(response => response.json())
  //then method reutns a Promise
  //next then method assigns to a variable called data
  //.then(data => console.log(data));
  .then(data => {

  	//checks that data is being retrieved
  	console.log(data);

 

  	//assign type of weather ('cloudy' etc) to a variable
  	weatherType = data.weather[0].main;


  	//pass weatherType into addImg which changes the img based on the weather
  	addImage(weatherType);


  });




//pass weather type ('rainy' or 'clear' etc) from weather api json
//depending on what weather type it is it will change what image is loaded
//calls add_w_img to create and append an img using the case url


// test images sourced from  https://homepages.cae.wisc.edu/~ece533/images/
// uploadded images from https://jamie-barter.imgbb.com/ using jamie umbraco

function addImage(weatherType){

	switch(weatherType){
		case 'Clear':
			text.innerHTML = weatherType;
			var clearImg = "https://i.ibb.co/vQ7Fynz/clear.png";
			add_w_image(clearImg);
			break;
		case 'Rainy':
			text.innerHTML = weatherType;
			var rainyImg = "https://i.ibb.co/w7475rs/rainy.jpg";
			add_w_image(rainyImg);
			break;

		default:
			text.innerHTML = 'addImage function is not working';

	}
}



//this function creates an img html element 
//the url of the image is dependent on the parameter
//adds the image html element to part of the html structure

function add_w_image(weatherImage){
	var w_img = document.createElement('img');
	w_img.src = weatherImage;
	w_img.alt = "";
	document.getElementById('weatherImage').appendChild(w_img);
}


