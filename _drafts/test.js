function theLongestSub(str) {
  var sub = [],
    word = "";
  for (var i = 0; i < str.length; i++) {
    var a = str.indexOf(str[i]);
    if (a === i) {
      word += str[i];
    } else {
      sub.push(word);
      word = "";
      str = str.substr(i - 1);
      i = 0;
    }
  }
  return sub;
}

theLongestSub("hell");