
/*
http://127.0.0.1:5500/

import * as THREE from "./three.js";
//import {OrbitControls} from "./three/examples/jsm/controls/OrbitControls.js";
//import {GLTFLoader} from "./three/examples/jsm/loaders/GLTFLoader.js";
*/

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';


/*
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.min.js'
import {OrbitControls} from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/examples/jsm/loaders/GLTFLoader.js';
*/


 //https://stackoverflow.com/questions/61191061/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module/61191511#61191511
 //https://threejsfundamentals.org/threejs/lessons/threejs-load-gltf.html

/*--------Materials ---------*/

let greenC = new THREE.Color( 0x00ff00 );
let redC = new THREE.Color( 0xff00f00 );
let white = new THREE.Color(0xffffff);
let blueHaze = new THREE.Color(0x0044ff);
let blueC = new THREE.Color(0x2194ce);
let mainLightC = new THREE.Color(0xffffff);

const greenM = new THREE.MeshStandardMaterial(  {color: greenC} );
greenM.fog = true;

const redMat = new THREE.MeshStandardMaterial( {color: redC} );
redMat.fog = true;


const planeMat = new THREE.MeshStandardMaterial( {color: white} );
planeMat.fog = true;


let drizzleC = new THREE.Color(0x29e8a5);
const drizzlyMat = new THREE.MeshStandardMaterial( {color: drizzleC} );
drizzlyMat.fog = true;


let rainC = new THREE.Color(0x0d7eb5);
const rainMat = new THREE.MeshStandardMaterial( {color: rainC} );
rainMat.fog = true;

let sunC = new THREE.Color(0xFFC300);
const sunMat = new THREE.MeshStandardMaterial( {color: sunC} );
sunMat.fog = true;


const mainPhysMat = new THREE.MeshPhysicalMaterial (
	{
	shading: Float32Array,
	color: white,
	//clearcoat: 0.8,
	//clearcoatRoughness: 0.5,
	//sheen: redC,
	//emissive: blueC,
	//emissiveIntensity: 4,
	metalness: 0.2,
	roughness: 0.6,
	reflectivity: 0.2,
	opacity: 0.8,
	transparent: true,
	//side: THREE.DoubleSide

	}
);








/*---------------------- setup -----------------------------*/



/*
var canvas = document.getElementById('canvas');

var width = canvas.offsetWidth;
var height = canvas.offsetHeight;
var ratio  = width / height;
*/

var ratio  = window.innerWidth / window.innerHeight ;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, ratio, 0.1, 1000 );




const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//renderer.setSize( width, height );
renderer.setSize( window.innerWidth, window.innerHeight );

canvas.appendChild( renderer.domElement );

scene.background = white;


/*---------------------- Camera controls -----------------------------*/


const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 15,9,9 );
controls.update();




//---------------------- Elements - fog -----------------------------

scene.fog = new THREE.Fog(white, 0.1,100);


//--------------------- loader ---------------- 

//declare rainCloud outside of loadRainy so it can be accessed
let rainCloud;

function loadRainy(){

const gltfLoader = new GLTFLoader();
const url = 'assets_3d/rainy/scene.gltf';
  gltfLoader.load(url, (gltf) => {
     rainCloud = gltf.scene;

    scene.add(rainCloud);
	rainCloud.scale.set(0.4,0.4,0.4);
	//rainCloud.position.set(0,3,0);

	gltf.scene.traverse( function ( node ) {

		if ( node.isMesh || node.isLight ) node.castShadow = true;
		if ( node.isMesh || node.isLight ) node.material = mainPhysMat;
		//if ( node.isMesh || node.isLight ) node.receiveShadow = true;

	} );

	


	// compute the box that contains all the stuff
      // from root and below
     // let rainyBox = new THREE.Box3().setFromObject(root);
	


	  /*
      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());
 */
      

  }
  )
}




//---------------------- Lighting -------------------------

let ambientLight = new THREE.AmbientLight ( blueHaze, 0.2);
scene.add( ambientLight );


var pointLight = new THREE.PointLight( mainLightC, 0.7 );
pointLight.position.set( 0, 40, 20 );
pointLight.castShadow = true; 
scene.add( pointLight );



//Set up shadow properties for the light
pointLight.shadow.mapSize.width = 1024; // default
pointLight.shadow.mapSize.height = 1024; // default
pointLight.shadow.camera.near = 0.1; // default
pointLight.shadow.camera.far = 100; // default






/*---------------------- alternating -----------------------------*/
var countWave = 0;
var countupWave = true;
var countTimeWave = 600;

let alternatingWave = () => {

	if (countupWave)
	{	
	  ++countWave;
	  
	  if (countWave >= countTimeWave){
		  //countupWave = false;
	  }

	}
	else
	{
	  --countWave;
	  
	  if (countWave <= 0)
		countupWave = true;
	}


};



var count = 0;
var countup = true;
var countTime = 100;

let alternating = () => {

	if (countup)
	{	
	  ++count;
	  
	  if (count >= countTime)
		countup = false;
	}
	else
	{
	  --count;
	  
	  if (count <= 0)
		countup = true;
	}

	//console.log(count);

};

let change_pointLight = () =>{
	pointLight.intensity = 1 + count/20 ;
}


let upanddown = (mesh) =>{
	let height = count/80 +4;
	mesh.position.set( 0, height, 10 );
}







	

//---------------------- Elements - cube -----------------------------

/*
const boxGeo = new THREE.BoxGeometry(1,1,1,);

const box = new THREE.Mesh( boxGeo, redMat );
scene.add( box );
box.castShadow = true;
*/

//---------------------- Elements - sunny -----------------------------

const sunnyGeo = new THREE.SphereGeometry(2,32,32);
const sunny = new THREE.Mesh( sunnyGeo, sunMat );
sunny.castShadow = true;
sunny.receiveShadow = true;
sunny.position.x = 5;

//---------------------- Elements - rainy -----------------------------

const rainyGeo = new THREE.SphereGeometry(2,32,32);
const rainy = new THREE.Mesh( rainyGeo, rainMat );

rainy.castShadow = true;
rainy.receiveShadow = true;
rainy.position.x = 9;



//---------------------- Elements - drizzly -----------------------------

const drizzlyGeo = new THREE.SphereGeometry(2,32,32);
const drizzly = new THREE.Mesh( drizzlyGeo, drizzlyMat );
drizzly.castShadow = true;
drizzly.receiveShadow = true;
drizzly.position.x = 15;






//---------------------- Elements - moving plane --------------

var planeDefinitionX = 15,
planeDefinitionY = 90,
planeSizeX = 200,
planeSizeY = 400;

//planeMat.wireframe = true;
var wavePlaneGeo = new THREE.PlaneGeometry(planeSizeX, planeSizeY, planeDefinitionX, planeDefinitionY);
var wavePlane = new THREE.Mesh(wavePlaneGeo, planeMat);

wavePlane.castShadow = true;
wavePlane.receiveShadow = true;	

wavePlane.rotation.x -= Math.PI * .5;
wavePlane.position.y = -2;
scene.add(wavePlane);






//---------------------- animate plane --------------

const thepoints = wavePlane.geometry.attributes.position.array;
//console.log(thepoints);
//onsole.log(thepoints.length);




	function updatePlane() {
		if ((count%1) == 0){

		for (var i = 2; i < thepoints.length; i+=3) {

			
			//	thepoints[i] = 1 + (Math.random()*3) + count/50;
			var mainWave = (Math.sin (i + countWave/30)) * 2;

		

	
			thepoints[i] = mainWave;
			//wavePlaneGeo.setAttribute =('position', thepoints[i]);
		

		}
		//console.log(thepoints[2]);
		wavePlane.geometry.attributes.position.needsUpdate = true;
		}
		

	};







/*---------------------- API -----------------------------*/
let finalResult = null;

function api(){

//actual api url, file is currently using a  test fil
//let api_url = 'https://api.openweathermap.org/data/2.5/weather?q=Wellington&appid=bebde0cadb3f2e18b1f157e8c18182da';


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

 
	  let weatherType;
  	//assign type of weather ('cloudy' etc) to a variable
  	weatherType = data.weather[0].main;



  	//pass outcome of addWeather
 	 finalResult = addWeather(weatherType);
	
	  animate();

  });

	
}




//pass weather type ('rainy' or 'clear' etc) from weather api json
//depending on what weather type it is it will change what weather type is


function addWeather(weatherType){
	let result;
	
	switch(weatherType){
		case 'Clear':
			console.log('the weather is clear');
			scene.add(sunny);
			result = sunny;
			//console.log(result + " this is result");
			//console.log(JSON.stringify(result) + " this is result stringify");
			break;

		case 'Rainy':
			console.log('the weather is rainy');
			//scene.add(rainy);
			result = rainy;
	
			//console.log(result + " this is result");
			//console.log(JSON.stringify(result) + " this is result stringify");
			break;

			
		case 'Drizzle':
			console.log('the weather is drizzly');
			scene.add(drizzly);
			result = drizzly;
			//console.log(result + " this is result");
			//console.log(JSON.stringify(result) + " this is result stringify");
			break;

		default:
			;
	}

	return result;
}




//---------------------- animate function -----------------------------
//animate is only run once the fetch has been completed

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	//render();


	
	//sets the raincloud geometry to the reuslt of the switch statement
	finalResult = rainCloud;

	alternating ();
	alternatingWave ();
	//change_pointLight();
	upanddown (finalResult);

	updatePlane();
}


//----------------call functions at load---------------
//note that animate is run inside api,
// this ensures it only runs once  fetch has been resolved
// to access fetch data it is stored as finalResult which has to be set to null before fetch runs
//if rest of code runs while finalREsult is null it won't work, 
//I have to wait until fetch passes a value to finalResult for rest of code to operate


loadRainy();
api();

