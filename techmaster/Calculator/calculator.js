

var JSExpression = ""; // To record expression in JS language
var userExpression =""; // To record expression in human-like lanague 
var historyResult = []; // To display history
historyResult.length = 0;  
var historyExpression = []; // To display history
historyExpression.length = 0;
var	n = 0; // index of history record 
var result = 0; // To record resul of calculation
var	defaultRadianMode = true; // To set Radian mode defult
var	convertRadianDegree = 1; // To set conversion between Radian and Degree
var isClickButtonExtend = true; // to set Extend/ Collapse mode



// When user click the button, "advanced feature bar" slides from right to left, then opposite way

function myFunctionExt() {

			
	if (isClickButtonExtend == true) {

		$("#slide_wrapper").width(235);
		$("#RadDeg").width(235);
		$("#advanced_others").width(235);
		$("#calculator_wrapper").width(555);

		$("#Extend")[0].childNodes[2].nodeValue = " collapse ..."
		$("#Extend")[0].childNodes[1].className = "fa fa-arrow-right";



	} else if (isClickButtonExtend == false) {

		console.log(isClickButtonExtend);

		$("#slide_wrapper").width(0);
		$("#RadDeg").width(0);
		$("#advanced_others").width(0);
		$("#calculator_wrapper").width(315);
		$("#Extend")[0].childNodes[2].nodeValue = " ... extend"
		$("#Extend")[0].childNodes[1].className = "fa fa-arrow-left";
		
	}

	isClickButtonExtend = !isClickButtonExtend;
			

}

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunctionHistory() {

    document.getElementById("myDropdown").classList.toggle("show");

}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


// myFunctionExt() --> to side the "advanced feature" to left then back to ri 
function changeStatusRad() {

	defaultRadianMode = !defaultRadianMode;	

		/* Switch to Radian mode */

	if (defaultRadianMode == true) {
		convertRadianDegree = 1;
	} else 
	
	/* Switch to Degree mode */

	{ 
		convertRadianDegree = Math.PI / 180;
	}

}

function addOperator(buttonString) {

	switch (buttonString) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '(':
		case ')':
		case '.':
			userExpression += buttonString; 
			JSExpression += buttonString;
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			userExpression += " " + buttonString + " "; 
			JSExpression += " " + buttonString + " "; 

			break;
		
		/* Advanced formula */	

		case '%':
			var strTemp = JSExpression.split(" ");
			var percentageNum = strTemp[strTemp.length-1];
			userExpression = JSExpression.slice(0, JSExpression.length - percentageNum.length) + percentageNum + "%";
			JSExpression = JSExpression.slice(0, JSExpression.length - percentageNum.length) + "percentage(" + percentageNum + ")";
			break;
		
		
		case 'x!':
			var strTemp = JSExpression.split(" ");
			var percentageNum = strTemp[strTemp.length-1];
			
			userExpression = JSExpression.slice(0, JSExpression.length - percentageNum.length) + percentageNum + "!";

			JSExpression = JSExpression.slice(0, JSExpression.length - percentageNum.length) + "factorial("+ percentageNum + ")";
			break;
		
		case 'Inv':
			userExpression += " " + "1/(";
			JSExpression += " " + "inverse(";
			break;

		case 'sin':
			userExpression += "sin(";
			JSExpression += "Math.sin(" + convertRadianDegree + "*";
			break;
		case 'ln':
			userExpression += "ln(";
			JSExpression += "Math.log(";
			break;
		case 'Pi':
			userExpression += "&#960;";
			JSExpression += "Math.PI";
			break;
		case 'cos':
			userExpression += "cos(";
			JSExpression += "Math.cos(" + convertRadianDegree + "*";
			break;
		case 'log':
			userExpression += "log(";
			JSExpression += "Math.log10(";
			break;
		case 'e':
			userExpression += "&epsilon;";
			JSExpression += " Math.E ";
			break;
		case 'tan':
			userExpression += "tan(";
			JSExpression += "Math.tan(" + convertRadianDegree + "*";
			break;
		case 'sqrt':
			userExpression += "&radic;("
			JSExpression += "Math.sqrt(";
			break; 
		/*case 'ANS':
			break;
		case 'EXP':
			break; */
		
		case 'x^y':
			var strTemp = JSExpression.split(" ");
			var percentageNum = strTemp[strTemp.length-1];
			
			userExpression += "^";

			JSExpression = JSExpression.slice(0, JSExpression.length - percentageNum.length) + "Math.pow("+ percentageNum + ",";

			break; 


	}

	document.getElementById("userExpression").innerHTML = userExpression;

}

function calculate() {
	if (isLackCloseBracket(JSExpression) == true) {
		JSExpression += ")"
	} ;
	
	console.log(JSExpression);
	
	try {
		result = eval(JSExpression);
	} catch (e) {}

	document.getElementById("result").innerHTML = result;
	

	historyExpression[(n % 5)] = userExpression; // To display history, maximum 5 lines
	historyResult[(n % 5)] = " = " + result; 
	n ++; 

	var p = document.getElementsByClassName("history_row");
	var historyLength = historyExpression.length;
	for (i = 0; i < historyLength; i++) {

			p[i].children[0].innerHTML = historyExpression[i];
			p[i].children[1].innerHTML = historyResult[i];	

	}


	JSExpression = "";
	userExpression ="";
}


function resetResult() {
	JSExpression = "";
	userExpression ="";
	result = 0;
	document.getElementById("userExpression").innerHTML = userExpression;
	document.getElementById("result").innerHTML = result;

}

function factorial(n) {
	
	var fac = 1;
	if ((typeof n != "number") && (n<0)) { return; }
	
	if (n == 0) { fac = 1}
		else if (n >=1) 
		{
			for (i=1; i<=n; i++) {
				fac *= i;
			}
		return fac;		
		}	
}

function inverse(x) {
	var inver = 0;
	if ((typeof x != "number") && (x ==0)) { return;}

	if (x != 0) {
		inver = 1/ x; 
		return inver;
	}
}

function percentage(x) {
	return (x/100); 
}

function isLackCloseBracket(string) {
	var countBrackets = 0;; 
	for (i=0; i<string.length; i++) {
		switch (string.charAt(i)) {
			case "(":
				countBrackets ++;
				break;
			case ")":
				countBrackets --;
				break
		}	
	}
	if (countBrackets == 1) {
		return true; 
	} else if (countBrackets == 0) { return false;}
}

function round(value,decimals) {
	return Number(Math.round(value +'e'+decimals)+'e-'+decimals);
	// body...
}

