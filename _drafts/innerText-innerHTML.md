https://stackoverflow.com/questions/7035842/how-to-change-the-buttons-text-using-javascript 

I know this question has been answered but I also see there is another way missing which I would like to cover it.There are multiple ways to achieve this.

1- innerHTML

document.getElementById("ShowButton").innerHTML = 'Show Filter';
You can insert HTML into this. But the disadvantage of this method is, it has cross site security attacks. So for adding text, its better to avoid this for security reasons.

2- innerText

document.getElementById("ShowButton").innerText = 'Show Filter';
This will also achieve the result but its heavy under the hood as it requires some layout system information, due to which the performance decreases. Unlike innerHTML, you cannot insert the HTML tags with this. Check Performance Here

3- textContent

document.getElementById("ShowButton").textContent = 'Show Filter';
This will also achieve the same result but it doesn't have security issues like innerHTML as it doesn't parse HTML like innerText. Besides, it is also light due to which performance increases.

So if a text has to be added like above, then its better to use textContent.

