var imageNumber = 24; 
var pics = createImageArray(imageNumber);
var	totalFlippedOn = 0;
firstFlippedOnCardId ="";
firstFlippedOnCardSrc ="";
secondFlippedOnCardSrc ="";
secondFlippedOnCardId ="";


console.log(totalFlippedOn);

function reset() {
	totalFlippedOn = 0;
	firstFlippedOnCardId ="";
	firstFlippedOnCardSrc =""
	secondFlippedOnCardId ="";
	secondFlippedOnCardSrc = "";
	$(".card").css({'pointer-events':'auto',"transform":"scale(1.0)"});
}

function flip(card) {
	card.children(":nth-child(1)").toggleClass("flipped");
	card.children(":nth-child(2)").toggleClass("flipped");
}

function createImageArray(imageNumber) {

	var imagesArray = [];

	for (i=0; i< imageNumber; i++) {

		if (i < 20) {

			var imageObj = {

				_src: "photos/photo0" + String(Math.floor(i/2)) + ".jpeg",	

				_alt: ""

			}

		} else {


			var imageObj = {

				_src: "photos/photo" + String(Math.floor(i/2)) + ".jpeg",	

				_alt: ""

			}
		

		}
		;

		imagesArray.push(imageObj);
	}

	return shuffle(imagesArray);

}

var photoDiv = document.getElementById("photos");

for(var i=0; i<pics.length; i++){
	
	var gridEle = document.createElement("div");
	var cardEle = document.createElement("div");
	var frontEle = document.createElement("img");
	var backEle = document.createElement("img");

	gridEle.className = "grid";
	cardEle.className = "card";
	cardEle.id = i;
	frontEle.src = pics[i]._src;
	frontEle.className = "front";
	frontEle.alt = pics[i]._alt;
	backEle.src = "photos/photo_front.jpeg";
	backEle.className = "back";

	cardEle.appendChild(frontEle);
	cardEle.appendChild(backEle);
	gridEle.appendChild(cardEle);
	photoDiv.appendChild(gridEle);

}

var card = $(".card");

card.children(":nth-child(1)").addClass("flipped");

card.click(function(){

	switch (totalFlippedOn) {
		case 0: 

			$(this).css('pointer-events', 'none');
			flip($(this));
			firstFlippedOnCardId = $(this).attr("id");
			firstFlippedOnCardSrc = $(this).children(":nth-child(1)").attr("src");
			totalFlippedOn += 1;
			break;

		case 1:

			flip($(this));
			$(".card").css('pointer-events', 'none');
			
			secondFlippedOnCardId = $(this).attr("id");
			second = $(this);
			first = $("#" + firstFlippedOnCardId);
			secondFlippedOnCardSrc = $(this).children(":nth-child(1)").attr("src");
			console.log(secondFlippedOnCardSrc);

			if (firstFlippedOnCardSrc === secondFlippedOnCardSrc) {


				setTimeout(function(){
					first.css({"transform":"scale(1.05)","transition":"transform 0.5s linear"});
					second.css({"transform":"scale(1.05)","transition":"transform 0.5s linear"})
				},500);


				setTimeout(function(){
					document.getElementById("correct").play();
					first.css('visibility','hidden');
					second.css('visibility','hidden');
				},500);

			} else {

				document.getElementById("incorrect").play();

				setTimeout(function(){
					flip(first);
					flip(second);
				},500);

			}
			reset();
			break;


	};
	
});

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

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
