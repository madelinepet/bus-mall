'use strict';

//access the section element from the dom
Pic.clickableArea = document.getElementById('clickCount');

//define variables including an array to push all instances into. Include a counter to track how many clicks overall.
Pic.allPics = [];

//need an array with only the current objects in it.
Pic.currentPic =[];
Pic.previousPics=[];

//names for chart lables
var picNames = [];

//get votes for bar chart data
var picVotes = [];

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
  picNames.push(this.name);
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
new Pic('img/sweep.png','sweep');
new Pic('img/tauntaun.jpg','tauntaun');
new Pic('img/unicorn.jpg','unicorn');
new Pic('img/usb.gif','usb');
new Pic('img/water-can.jpg','water can');
new Pic('img/wine-glass.jpg','wine glass');


//only use this function to display results, the counters are calculated below
function resultsRender() {
  for(var i=0; i < Pic.allPics.length; i++){
    var listElement= document.createElement('li');
    listElement.textContent = (Pic.allPics[i].name + ' has ' + Pic.allPics[i].displayCounter + ' views and ' + Pic.allPics[i].voteCounter + ' votes.');
    totalListElement.appendChild(listElement);
  }
}
//add event listener to section. Repplaces handler for each individual displayed image I had before.
Pic.clickableArea.addEventListener('click', clickHandler);

//access the element by ID from the DOM
var imgOneElement = document.getElementById('img1');
var imgTwoElement = document.getElementById('img2');
var imgThreeElement = document.getElementById('img3');

function clickHandler(event){
  clickCounter ++;

  for(var i in Pic.allPics){
    if (event.target.alt === Pic.allPics[i].name){
      Pic.allPics[i].voteCounter++;
    }
  }

  if (clickCounter >=25) {
    //turn off event listener
    Pic.clickableArea.removeEventListener('click', clickHandler);
    imgOneElement.removeEventListener('click', clickHandler);
    imgTwoElement.removeEventListener('click', clickHandler);
    imgThreeElement.removeEventListener('click', clickHandler);


    //display results as list. Uncomment to see list.
    // resultsRender();

    //update the votes per goat
    updateVotes();
    //display the chart here
    renderChart();
  }
  else{
    randomPic();
  }
}

function updateVotes(){
  for(var i in Pic.allPics){
    picVotes.push(Pic.allPics[i].voteCounter);
  }
}

//callback function for when each of the three images clicked. Will include a random number generator. Needs to redisplay images when clicked. Needs images to be different each time.
function randomPic() {
  var randomIndex1 = Math.floor(Math.random()* Pic.allPics.length);

  var randomIndex2 = Math.floor(Math.random()* Pic.allPics.length);

  var randomIndex3 = Math.floor(Math.random()* Pic.allPics.length);
console.log('previous pics before while', Pic.previousPics);
  //in here, in the || conditions, also include || for the three pics using .includes conditions for the Pic.currentPic array so that the next display does not have repeat images.
  while(randomIndex1===randomIndex2 || randomIndex1===randomIndex3 || randomIndex2===randomIndex3 || Pic.previousPics.includes(randomIndex1) || Pic.previousPics.includes(randomIndex2) || Pic.previousPics.includes(randomIndex3)){
    //console log here to see how often you hit duplicates
    console.log('Duplicate was caught!');

    randomIndex1 = Math.floor(Math.random()* Pic.allPics.length);

    randomIndex2 = Math.floor(Math.random()* Pic.allPics.length);

    randomIndex3 = Math.floor(Math.random()* Pic.allPics.length);
  }
  //now that my indexes have unique values, display three images, incriment display counter for each
  Pic.previousPics = [];
  console.log('currenet pics', Pic.currentPic);
  console.log('previous pics', Pic.previousPics);
  Pic.currentPic = [];
  imgOneElement.src = Pic.allPics[randomIndex1].filePath;
  imgOneElement.alt = Pic.allPics[randomIndex1].name;
  Pic.allPics[randomIndex1].displayCounter++;
  Pic.currentPic.push(randomIndex1);
  
  imgTwoElement.src = Pic.allPics[randomIndex2].filePath;
  imgTwoElement.alt = Pic.allPics[randomIndex2].name;
  Pic.allPics[randomIndex2].displayCounter++;
  Pic.currentPic.push(randomIndex2);
  
  imgThreeElement.src = Pic.allPics[randomIndex3].filePath;
  imgThreeElement.alt = Pic.allPics[randomIndex3].name;
  Pic.allPics[randomIndex3].displayCounter++;
  Pic.currentPic.push(randomIndex3);
  
  Pic.previousPics.push.apply(Pic.previousPics, Pic.currentPic);
}
//call function to display on page load

randomPic();

//array of colors with 20 colors in it that the chart can use. If you leave colors out, it will automatically be grey
var arrayOfChartColors = ['red','orange','yellow','green','blue','purple','pink', 'red','orange','yellow','green','blue','purple','pink','red','orange','yellow','green','blue','purple'];

function renderChart(){
  var context = document.getElementById('results-chart').getContext('2d');

  new Chart(context, {
    type: 'bar',
    data: {
      labels: picNames, //array of pic names, populated above because chart JS expects an array of strings
      datasets: [{
        label: 'Number of Votes',
        data: picVotes,
        backgroundColor: arrayOfChartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });
}