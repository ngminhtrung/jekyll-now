https://stackoverflow.com/questions/7035842/how-to-change-the-buttons-text-using-javascript 

I know this question has been answered but I also see there is another way missing which I would like to cover it.There are multiple ways to achieve this.

## innerHTML
---

The Element.innerHTML property sets or gets the HTML syntax describing the element's descendants.

It is not uncommon to see innerHTML used to insert text in a web page. This comes with a security risk.

```js
const name = "John";
// assuming 'el' is an HTML DOM element
el.innerHTML = name; // harmless in this case

// ...

name = "<script>alert('I am John in an annoying alert!')</script>";
el.innerHTML = name; // harmless in this case
```

Although this may look like a cross-site scripting attack, the result is harmless. HTML5 specifies that a <script> tag inserted via innerHTML should not execute.

However, there are ways to execute JavaScript without using <script> elements, so there is still a security risk whenever you use innerHTML to set strings over which you have no control. For example:

const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name; // shows the alert
For that reason, it is recommended you not use innerHTML when inserting plain text; instead, use node.textContent. This doesn't interpret the passed content as HTML, but instead inserts it as raw text.



http://web.cs.ucdavis.edu/~amenta/s16/lec-4-13.pdf 

- Don’t use innerHTML
- innerHTML is "too powerfull"
- Eg, a better way to fill in text
- Possible alternative
- A new input element
- Another issue with innerHTML
- InnerHTML as a security risk but it's sorted of fixed ...
- Bad things to paste into a text box
- Take-home message
- Correct way


document.getElementById("ShowButton").innerHTML = 'Show Filter';
You can insert HTML into this. But the disadvantage of this method is, it has cross site security attacks. So for adding text, its better to avoid this for security reasons.

https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML


https://en.wikipedia.org/wiki/Cross-site_scripting

Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications. XSS enables attackers to inject client-side scripts into web pages viewed by other users. A cross-site scripting vulnerability may be used by attackers to bypass access controls such as the same-origin policy. Cross-site scripting carried out on websites accounted for roughly 84% of all security vulnerabilities documented by Symantec as of 2007.[1] Bug bounty company HackerOne in 2017 reported that XSS is still a major threat vector.[2] XSS effects vary in range from petty nuisance to significant security risk, depending on the sensitivity of the data handled by the vulnerable site and the nature of any security mitigation implemented by the site's owner.


https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0

script elements inserted using innerHTML do not execute when they are inserted.



## innerText
--- 

document.getElementById("ShowButton").innerText = 'Show Filter';
This will also achieve the result but its heavy under the hood as it requires some layout system information, due to which the performance decreases. Unlike innerHTML, you cannot insert the HTML tags with this. Check Performance Here

## textContent
--- 

document.getElementById("ShowButton").textContent = 'Show Filter';
This will also achieve the same result but it doesn't have security issues like innerHTML as it doesn't parse HTML like innerText. Besides, it is also light due to which performance increases.

So if a text has to be added like above, then its better to use textContent.

https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

