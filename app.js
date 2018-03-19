'use strict';

//define variables including an array to push all instances into. Include a counter to track how many clicks overall.
Pic.allPics = [];

//need a global variable to track how many votes have happened because unlike the display counter and the click counter, it is not specific to each instance
var voteCounter = 0;

//constructor function with a counter set to zero so that for each image, you have a different counter. Also include a counter for how many time each is displayed. Add content to the ul called "results"
function Pic(filePath, name){
  this.filePath = filePath;
  this.name = name;
  Pic.allPics.push(this);
  this.displayCounter = 0;
  this.clickCounter = 0;
}

//prototypes with if else to track clicks and views each time the new set of images displays. Limit number of clicks to 25
// clickTracker = function() {
//   if(voteCounter < 5){

//     //increment voteCounter
//     voteCounter++;
//   }
//   //use else to display results when 25 clicks has been reached. Concatenate the viewed and clicked counters
//   else {

//   }
// };

//new instances
new Pic('img/bag.jpg','bag');
new Pic('img/banana.jpg', 'banana');
new Pic('img/bathroom.jpg','bathroom');
new Pic('img/boots.jpg','boots');
new Pic('img/breakfast.jpg','breakfast');
new Pic('img/bubblegum.jpg','bubblegum');
new Pic('img/chair.jpg','chair');
new Pic('img/cthulhu.jpg','cthulhu');
new Pic('img/dog-duck.jpg','dog-duck');
new Pic('img/dragon.jpg','dragon');
new Pic('img/pen.jpg','pen');
new Pic('img/pet-sweep.jpg','pet-sweep');
new Pic('img/scissors.jpg','scissors');
new Pic('img/shark.jpg','shark');
new Pic('img/sweep.png','shark');
new Pic('img/tauntaun.jpg','tauntaun');
new Pic('img/unicorn.jpg','unicorn');
new Pic('img/usb.gif','usb');
new Pic('img/water-can.jpg','water can');
new Pic('img/wine-glass.jpg','wine glass');


//access the element by ID from the DOM
var imgOneElement = document.getElementById('img1');
var imgTwoElement = document.getElementById('img2');
var imgThreeElement = document.getElementById('img3');

//add event listener to track when each image spot clicked, and when it is run callback function below.
imgOneElement.addEventListener('click', randomPic);
imgTwoElement.addEventListener('click', randomPic);
imgThreeElement.addEventListener('click', randomPic);

//callback function for when each of the three images clicked. Will include a random number generator. Needs to redisplay images when clicked. Needs images to be different each time.
function randomPic() {
  var randomIndex1 = Math.floor(Math.random()* Pic.allPics.length);

  var randomIndex2 = Math.floor(Math.random()* Pic.allPics.length);

  var randomIndex3 = Math.floor(Math.random()* Pic.allPics.length);

  while(randomIndex1===randomIndex2 || randomIndex1===randomIndex3 || randomIndex2===randomIndex3){
    randomIndex1 = Math.floor(Math.random()* Pic.allPics.length);

    randomIndex2 = Math.floor(Math.random()* Pic.allPics.length);

    randomIndex3 = Math.floor(Math.random()* Pic.allPics.length);
  }

  imgOneElement.src = Pic.allPics[randomIndex1].filePath;
  imgOneElement.alt = Pic.allPics[randomIndex1].name;
  Pic.allPics[randomIndex1].displayCounter ++;

  imgTwoElement.src = Pic.allPics[randomIndex2].filePath;
  imgTwoElement.alt = Pic.allPics[randomIndex2].name;

  imgThreeElement.src = Pic.allPics[randomIndex3].filePath;
  imgThreeElement.alt = Pic.allPics[randomIndex3].name;

}
//call function to display on page load

randomPic();
