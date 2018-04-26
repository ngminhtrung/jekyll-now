var totalFlipOn = 0;

var imageNumber = 12; 

var imageIndexArray = createArray(imageNumber);

var imagesArray = createImageArray(shuffle(imageIndexArray));

var currentImgIdFlippedOn = [];


imageIndexArray = imageIndexArray.sort(function(a,b) {return a-b});


function createArray(Number) {

	var arr = [];
	for (var i = 0; i < Number; i++) {
		arr.push(i);
		
	}
	return arr;

}

function loadData(Num) {

	for (var i=0; i < Num; i++) {
		let strId = "";
		if (i <10) {
			strId = "#0" + i;
		} else {strId = "#" + String(i);}

		$(strId).attr("data-hide","photos/"+imagesArray[i][0]);

		// console.log($(strId).attr("data-hidden"));
	}

}

function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

function createImageArray(arr) {
	var imagesArray = [];
	for (i=0; i< arr.length; i++) {
		if (arr[i] < 19) {
			imagesArray.push(["photo0" + String(Math.floor(arr[i]/2)) + ".png", false]);
		} else 
		{
			imagesArray.push(["photo" + String(Math.floor(arr[i]/2)) + ".png", false]);
		}
	}
	return imagesArray;

}
