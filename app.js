'use strict';

Pic.clickableArea = document.getElementById('clickCount');

//define variables including an array to push all instances into. Include a counter to track how many clicks overall.
Pic.allPics = [];

Pic.currentPic =[];

//need a global variable to track how many votes have happened because unlike the display counter and the click counter, it is not specific to each instance
var clickCounter = 0;

//access the ul given the ID "results" in my HTML
var totalListElement = document.getElementById('results');

//constructor function with a counter set to zero so that for each image, you have a different counter. Also include a counter for how many time each is displayed.
function Pic(filePath, name){
  this.filePath = filePath;
  this.name = name;
  this.displayCounter = 0;
  this.voteCounter = 0;
  Pic.allPics.push(this);
}

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

//if else to track clicks and views each time the new set of images displays. Limit number of clicks to 25
//only display results here 
function resultsRender(event) {
  //if the vote counter is less than 25, keep displaying results, create new list item with the results, but display results only after the counter has reached 25
  for(var i=0; i < Pic.allPics.length; i++){
    if(event.target.alt === Pic.allPics[i].name){
      Pic.allPics[i].voteCounter ++;
    }
  }
  while(clickCounter < 5){
    //do this only when clicked???????????????????????????????????????????????????????????????????
    //Add content to the ul called "results" accessed at top, in the form of new li elements
    var listElement = document.createElement('li');
    listElement.textContent = (Pic.eventname + ' has ' + Pic.displayCounter + ' views and ' + Pic.clickCounter + ' votes.');
    // //increment voteCounter
    console.log('event.target', event.target.src);
    clickCounter++;
  }
  if(clickCounter === 5){
    //stop additional voting from happening

    //append to list to display only when this is true
    totalListElement.appendChild(listElement);
  }
}
// Pic.clickableArea.addEventListener('click', clickTracker);
//access the element by ID from the DOM
var imgOneElement = document.getElementById('img1');
var imgTwoElement = document.getElementById('img2');
var imgThreeElement = document.getElementById('img3');

//add event listener to track when each image spot clicked, and when it is, run callback function below.
imgOneElement.addEventListener('click', clickHandler);
imgTwoElement.addEventListener('click', clickHandler);
imgThreeElement.addEventListener('click', clickHandler);

function clickHandler(event){
  //clickcounter global++
  //if event.target.id === img1, add one to the click counter of the current pics array at 0
  //if clickcounter <=25, show results,  then set display to none
  console.log(event.target.id);
  randomPic();
}
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

  Pic.currentPic = [];
  imgOneElement.src = Pic.allPics[randomIndex1].filePath;
  imgOneElement.alt = Pic.allPics[randomIndex1].name;
  Pic.allPics[randomIndex1].displayCounter++;
  Pic.currentPic.push(Pic.allPics[randomIndex1]);

  imgTwoElement.src = Pic.allPics[randomIndex2].filePath;
  imgTwoElement.alt = Pic.allPics[randomIndex2].name;
  Pic.allPics[randomIndex2].displayCounter++;
  Pic.currentPic.push(Pic.allPics[randomIndex2]);

  imgThreeElement.src = Pic.allPics[randomIndex3].filePath;
  imgThreeElement.alt = Pic.allPics[randomIndex3].name;
  Pic.allPics[randomIndex3].displayCounter++;
  Pic.currentPic.push(Pic.allPics[randomIndex3]);

  console.log(Pic.currentPic);
}
//call function to display on page load

randomPic();
// clickTracker();


//issues: call clicktracker function, make the while loop only happen on click, stop voting from happening!