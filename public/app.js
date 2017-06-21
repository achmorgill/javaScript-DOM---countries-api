
var app = function(){
  var selectedBeer = JSON.parse(localStorage.getItem('countryDetails')) || {}

  var url = "https://api.punkapi.com/v2/beers";

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', function() {
    var jsonString = this.responseText;
    var brewdogBeers = JSON.parse(jsonString);
    render( brewdogBeers );
  });
  request.send();



}
//render 
var render = function(brewdogBeers) {
  var storedBeer = localStorage.getItem('selectedBeer');
  var beerToDisplay = null;

  if(storedBeer) {
    beerToDisplay = JSON.parse( storedBeer );
    var select = document.querySelector('#beer-list');
    select.selectedIndex = beerToDisplay.index;
  }
  else{
    beerToDisplay = brewdogBeers[0];
  }

  populateSelect(brewdogBeers);
  updateInfo(beerToDisplay);
}

//populateSelect
var populateSelect = function(brewdogBeers) {
  var select = document.querySelector('#beer-list');
  brewdogBeers.forEach(function(item, index) {
    item.index = index;

    var option = document.createElement('option');
    option.value = index;
    option.text = item.name;
    select.appendChild(option);
  });

  select.addEventListener('change', function(event) {
    var index = this.value;
    var beer = brewdogBeers[index];
    // console.log("beer index", beer, index)

    console.log("index", index);
    console.log("beer", beer)

    updateInfo(beer);

    var jsonString = JSON.stringify(beer);
    localStorage.setItem('selectedBeer' , jsonString);
  })

  // updateinfo
  var updateInfo = function(beer) {
    var pTags = document.querySelectorAll('#main p');
    console.log ("beer", beer.name, beer.tagline)
    pTags[0].innerText = beer.name;
    pTags[1].innerText = beer.tagline;
    pTags[2].innerText = beer_img.url

  }


}
window.addEventListener('load', app);

