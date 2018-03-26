'use strict';

//access the section element from the dom
Pic.clickableArea = document.getElementById('clickCount');

Pic.allPics = [];

//arrays with the current object and the previous objects in it to compare for randomization
Pic.currentPic =[];
Pic.previousPics=[];

//names for chart lables
var picNames = [];

//get votes for bar chart data
var picVotes = [];

//global var to track click times in general so it maxes out at 25 votes
var clickCounter = 0;

//access the ul given the ID "results" in my HTML. Uncomment this, and resultsRender to get list back
// var totalListElement = document.getElementById('results');

function Pic(filePath, name){
  this.filePath = filePath;
  this.name = name;
  this.displayCounter = 0;
  this.voteCounter = 0;
  this.picName = [];
  Pic.allPics.push(this);
}

function createInstances(){
  var picsAsString = localStorage.getItem('pictures');
  var usablePics = JSON.parse(picsAsString);
  //if usablePics exists and has a length get it from local storage, do not create new instances anymore
  if(usablePics && usablePics.length){
    Pic.allPics = usablePics;
    //quit the function
    return;
  }
  //new instances
  new Pic('img/bag.jpg','Bag');
  new Pic('img/banana.jpg', 'Banana');
  new Pic('img/bathroom.jpg','Bathroom');
  new Pic('img/boots.jpg','Boots');
  new Pic('img/breakfast.jpg','Breakfast');
  new Pic('img/bubblegum.jpg','Bubblegum');
  new Pic('img/chair.jpg','Chair');
  new Pic('img/cthulhu.jpg','Cthulhu');
  new Pic('img/dog-duck.jpg','Dog-duck');
  new Pic('img/dragon.jpg','Dragon');
  new Pic('img/pen.jpg','Pen');
  new Pic('img/pet-sweep.jpg','Pet-sweep');
  new Pic('img/scissors.jpg','Scissors');
  new Pic('img/shark.jpg','Shark');
  new Pic('img/sweep.png','Sweep');
  new Pic('img/tauntaun.jpg','Tauntaun');
  new Pic('img/unicorn.jpg','Unicorn');
  new Pic('img/usb.gif','Usb');
  new Pic('img/water-can.jpg','Water can');
  new Pic('img/wine-glass.jpg','Wine glass');
}

//only use this function to display results, the counters are calculated below. uncomment this and function call to get list back
// function resultsRender() {
//   for(var i=0; i < Pic.allPics.length; i++){
//     var listElement= document.createElement('li');
//     listElement.textContent = (Pic.allPics[i].name + ' has ' + Pic.allPics[i].displayCounter + ' views and ' + Pic.allPics[i].voteCounter + ' votes.');
//     totalListElement.appendChild(listElement);
//   }
// }

//add event listener to section
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


    //display results as list. Uncomment this and resultsRender function to see list.
    // resultsRender();

    //update the votes per pic
    sumarizeTotals();
    //set item in local storage
    storeData();
    //display the chart here
    renderChart();
  }
  else{
    randomPic();
  }
}

function sumarizeTotals(){
  for(var i in Pic.allPics){
    picVotes.push(Pic.allPics[i].voteCounter);
    //populate the picname array here so the chart can access it
    picNames.push(Pic.allPics[i].name);
  }
}

//callback function for when each of the three images clicked.
function randomPic() {
  var randomIndex1 = Math.floor(Math.random()* Pic.allPics.length);

  var randomIndex2 = Math.floor(Math.random()* Pic.allPics.length);

  var randomIndex3 = Math.floor(Math.random()* Pic.allPics.length);

  while(randomIndex1===randomIndex2 || randomIndex1===randomIndex3 || randomIndex2===randomIndex3 || Pic.previousPics.includes(randomIndex1) || Pic.previousPics.includes(randomIndex2) || Pic.previousPics.includes(randomIndex3)){
    randomIndex1 = Math.floor(Math.random()* Pic.allPics.length);

    randomIndex2 = Math.floor(Math.random()* Pic.allPics.length);

    randomIndex3 = Math.floor(Math.random()* Pic.allPics.length);
  }
  //now that my indexes have unique values, display three images, incriment display counter for each
  Pic.previousPics = [];
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

  //need to push into old pics array last because the first time it runs, need to pupulate the array so it can compare.
  Pic.previousPics.push.apply(Pic.previousPics, Pic.currentPic);
}
//create the list of pictures
createInstances();
//call function to display on page load
randomPic();

//array of colors with 20 colors
var arrayOfChartColors = ['green','turquoise','blue','purple','green','turquoise','blue','purple','green','turquoise','blue','purple','green','turquoise','blue','purple','green','turquoise','blue','purple'];

function storeData(){
//save to local storage
  var savePictures = JSON.stringify(Pic.allPics);
  localStorage.setItem('pictures', savePictures);
}

function renderChart(){
  //create 2d chart
  var context = document.getElementById('results-chart').getContext('2d');
  new Chart(context, {
    type: 'bar',
    data: {
      labels: picNames,
      datasets: [{
        barPercentage: 0.01,
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