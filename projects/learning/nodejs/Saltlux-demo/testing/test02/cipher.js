function cipher(str) { 
  var strShift = 13; // string shift could be any integer number
  var strLen = str.length;
  var newStr = "";
  for (var i=0; i< strLen; i++) {
    if ((str.charCodeAt(i) >= 65) & (str.charCodeAt(i) <= 90)) {
       charNum = ((str.charCodeAt(i) - 65 + strShift) % 26) + 65;
       char = String.fromCharCode(charNum);
       newStr = newStr.concat(char);
    } else {newStr = newStr.concat(str.charAt(i));}
    
  }
  return newStr;
}

module.exports = cipher;