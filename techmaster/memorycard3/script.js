var imageNumber = 16; 
var pics;
var	totalFlippedOn = 0;
var normalLevelDuration = 40000;
var hardLevelDuration = 60000; 
var remainingTime = 0;;
var point = 0;

firstFlippedOnCardId ="";
firstFlippedOnCardSrc ="";
secondFlippedOnCardSrc ="";
secondFlippedOnCardId ="";
card = $(".card");

bgMusic = document.getElementById("background-music");
congratsMusic = document.getElementById("congrats-music");
booMusic = document.getElementById("boo-music");

correctSound = document.getElementById("correct");
incorrectSound = document.getElementById("incorrect");


$(function(){

	start();
	

});

function start() {
	
	$("#beginningModal").modal({backdrop: 'static', keyboard: false});
	configMusic();
	point = 0;
	
}

function configMusic() {
	
	bgMusic.volume = 0.2;
	bgMusic.currentTime = 0;
	correctSound.volume = 0.3;
	incorrectSound.volume = 0.3;
	booMusic.volume = 0.3;
	congratsMusic.volume = 0.3;
	$('#volumeBtn')[0].value = "volumeOn";
	$('#volumeBtn')[0].children[0].className = "glyphicon glyphicon-volume-up";
}

function muteMusic(musicBtn) {


	var volumeStatus = musicBtn.value;
	var volumeIcon = musicBtn.children[0];
	if (volumeStatus == "volumeOn") {

		volumeIcon.className = "glyphicon glyphicon-volume-off"; 
		musicBtn.value = "volumeOff";
		bgMusic.volume = 0;
		booMusic.volume = 0;
		congratsMusic.volume = 0;
		correctSound.volume = 0;
		incorrectSound.volume = 0;
		musicBtn.style.backgroundColor = "rgba(0,0,0,0.2 )";
		musicBtn.style.color = "white";


	} else if (volumeStatus == "volumeOff") {

		volumeIcon.className = "glyphicon glyphicon-volume-up"; 
		musicBtn.value = "volumeOn";
		musicBtn.style.backgroundColor = "transparent";
		musicBtn.style.color = "#BFA899";

		configMusic();

	}


}

function runGameAtLevel(level) {

	if (level == 1) {

		generateData(16);

		loadData();

		bgMusic.play();

		setTimeout(function(){

			remainingTime = normalLevelDuration;


			var running = setInterval(playGame, 50);
			function playGame() {

				console.log(remainingTime);

				if (remainingTime < 0) {
					clearInterval(running);
					$("#endingModal").modal({backdrop: 'static', keyboard: false});
					bgMusic.pause();
					booMusic.play();
				} else {
					remainingTime -= 50;
					console.log(remainingTime);
					console.log(point);
					currentProgress = remainingTime/normalLevelDuration * 100 + "%";
					$("#progress").css("width",currentProgress);
					if (point == imageNumber/2) {
						setTimeout(function () {
							$("#winnerModel").modal({backdrop: 'static', keyboard: false});
						},1000);
						clearInterval(running);
						bgMusic.pause();
						congratsMusic.play();
					}
				}

			}


		},1000);



	} else {

		generateData(24);

		loadData();

		bgMusic.play();

		setTimeout(function(){

			remainingTime = hardLevelDuration;

			var running = setInterval(playGame, 50);
			function playGame() {

				console.log(remainingTime);

				if (remainingTime < 0) {
					clearInterval(running);
					$("#endingModal").modal({backdrop: 'static', keyboard: false});
					bgMusic.pause();
					booMusic.play();
				} else {
					remainingTime -= 50;

					$("#progress").css("width",(remainingTime/hardLevelDuration) * 100 + "%");
					if (point == imageNumber/2) {
						setTimeout(function () {
							$("#winnerModel").modal({backdrop: 'static', keyboard: false});
						},1000);
						clearInterval(running);
						bgMusic.pause();
						congratsMusic.play();
					}
				}

			}

		},1000);

	}

}



function reset() {

	firstFlippedOnCardId ="";
	firstFlippedOnCardSrc ="";
	secondFlippedOnCardSrc ="";
	secondFlippedOnCardId ="";
	card = $(".card");

	totalFlippedOn = 0;
	firstFlippedOnCardId ="";
	firstFlippedOnCardSrc =""
	secondFlippedOnCardId ="";
	secondFlippedOnCardSrc = "";
	$(".card").css({'pointer-events':'auto',"transform":"scale(1.0)"});

	

}


function generateData(imageNumber) {

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

	pics = shuffle(imagesArray);

}



function loadData() {

	$("#photos")[0].innerHTML = ""; // reset current data
	$("#progress").css("width","100%"); // reset progress bar 100%

	for(var i=0; i<pics.length; i++){

		var str = "<div class=\"grid\"><div class=\"card\" onclick=\"flip(this)\" id=\"" + 
		[i] + "\"><img src=" + pics[i]._src + " class=\"front flipped\"" +
		"alt=\"\"><img src=\"photos/photo_front.jpeg\" class=\"back\"></div></div>";
		$("#photos").append(str);
	}

	$(".card").children(":nth-child(1)").addClass("flipped");
}


function flip(card) {

	// alert(totalFlippedOn);
	// console.log(card);

	if (totalFlippedOn == 0) {

		$(card).css('pointer-events', 'none');
		
		card.children[0].classList.toggle("flipped");
		card.children[1].classList.toggle("flipped");

		firstFlippedOnCardId = $(card).attr("id");
		firstFlippedOnCardSrc = $(card).children(":nth-child(1)").attr("src");
		totalFlippedOn += 1;

	} else {

		card.children[0].classList.toggle("flipped");
		card.children[1].classList.toggle("flipped");

		$(".card").css('pointer-events', 'none');

		secondFlippedOnCardId = $(card).attr("id");
		second = $(card);
		first = $("#" + firstFlippedOnCardId);
		secondFlippedOnCardSrc = $(card).children(":nth-child(1)").attr("src");

		if (firstFlippedOnCardSrc === secondFlippedOnCardSrc) {

			

			setTimeout(function(){
				first.css({"transform":"scale(1.05)","transition":"transform 0.5s linear"});
				second.css({"transform":"scale(1.05)","transition":"transform 0.5s linear"})
			},500);

			setTimeout(function(){
				document.getElementById("correct").play();
				first.css('visibility','hidden');
				second.css('visibility','hidden')
				point += 1;

			},500);
			



		} else {

			document.getElementById("incorrect").play();

			setTimeout(function(){

				first[0].children[0].classList.toggle("flipped");
				first[0].children[1].classList.toggle("flipped");	
				second[0].children[0].classList.toggle("flipped");
				second[0].children[1].classList.toggle("flipped");


			},500);

		}
		reset();

	}

};

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
