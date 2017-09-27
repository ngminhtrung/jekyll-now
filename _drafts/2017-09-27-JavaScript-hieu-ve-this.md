---
id: 103
title: '[JavaScript is Sexy] Hiểu về “this” cho rõ và thuần thục các cách dùng nó '
date: 2017-09-27T16:53:32+00:00
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - Dịch
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

Sau 2 tháng học Javascript, tôi vẫn không thể thấy thoải mái và tự tin khi nhìn thấy từ khoá "this" trong các đoạn code của người và của ... bản thân. Mọi thứ cứ lờ mờ khó nắm bắt. Dù đã đọc phần này trong Javascript Definitive Guide, trong Professional Javascript, hay [bài của Phạm Huy Hoàng](https://toidicodedao.com/2016/01/26/series-javascript-sida-luan-ban-ve-cai-dit-this-trong-javascript/), và [của Jell Liew](https://zellwk.com/blog/should-you-use-this/) vẫn không thấy "vào". Hôm nay ngó [Javascript Is Sexy thấy tác giả liên hệ "this"](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/) với cách dùng ngôn từ ngoài đời thực thấy rất vào. Có lẽ dân ngoại đạo mới nhập môn như tôi bắt đầu với cách tiệm cận này là chuẩn. 

= = = = = = = = = = = = 

<h2>Hiểu rõ JavaScript “this” và thuần thục cách dùng nó</h2>

**Đồng thời hiểu luôn trong những hoàn cảnh nào "this" bị hiểu nhầm **
*Yêu cầu: Một chút hiểu biết về JavaScript*.

Từ khoá "this" trong Javascript khiến cho cả người mới lẫn người cũ thấy khó hiểu. Để dễ tưởng tượng, hãy nghĩ đến cách chúng ta nói thông thường trong ngôn ngữ: 

- Tiếng Anh:  “John is running fast because **he** is trying to catch the train.”
- Tiếng Việt: "Trung đang học Javascript một cách bài bản bởi **hắn** muốn làm 1 chuyên gia về ngôn ngữ này". 

Bạn thấy cách dùng đại từ "he" (và "hắn") ở đây ko? Rõ ràng chúng ta có thể viết là:
- “John is running fast because **John** is trying to catch the train.”
- Tiếng Việt: "Trung đang học Javascript một cách bài bản bởi **Trung** muốn làm 1 chuyên gia về ngôn ngữ này". 

Tuy thế trong văn viết lẫn văn nói, chẳng mấy người lặp lại John/ Trung như trên (tất nhiên là vẫn có thể dùng, nhưng nghe không lọt tai lắm, dù nói trong bất kỳ văn cảnh nào). Từ lối suy nghĩ như vậy, chúng ta gặp "**this**" trong Javascript như 1 cách dùng tắt, để chỉ tới một đối tượng nào đấy. Hãy xem các ví dụ sau: 

{% highlight javascript %}
```javascript
var person = {
    firstName: "Penelope",
    lastName: "Barrymore",
    fullName: function () {
        ​// Lưu ý: Ở đây "this" được dùng tương tự như "he"/ "hắn" ở trong ví dụ trên
        console.log(this.firstName + " " + this.lastName);
    ​   // Ngoài ra t​a cũng có thể viết như sau
        console.log(person.firstName + " " + person.lastName);
    }
}
```
{% endhighlight %}

Có lẽ với những người mới học như tôi, việc dùng person.firstName và persona.lastName dễ hiểu, trực quan hơn. Variable *person* đã có sẵn đó, thêm dấu . để truy cập vào các biến bên trong, quá ngon rồi!!! Tuy vậy, thực hành thêm 1 thời gian sẽ hiểu nhận xét của tác giả rằng cách viết kiểu đó mới gây nhầm lẫn. Tại sao? Nhỡ đâu đoạn code của ta chỉ là 1 phần trong 1 đoạn code lớn hơn do người khác (hoặc chính bản thân ta) viết, và 1 biến cùng tên person đã có ở global context? Trong trường hợp như vậy, chương trình sẽ trỏ đến person kia (tức ở global context) chứ ko phải đến person trong đoạn code ta vừa viết. Điều này đặc biệt đúng khi ta chỉ là 1 phần trong 1 team nhiều người, và khi code viết ra ngày một lớn mà bản thân mình cũng chẳng nhớ hết bao nhiêu biến đã được đặt tên, sao để tránh trùng nhau, v.v. Với tác giả bài viết, sử dụng từ khoá "*this*" không những tăng tính "*thẩm mĩ*" của đoạn code, mà còn khiến cho code được trình duyệt đọc một cách chính xác, đúng như ý đồ của tác giả (ở đây, this.firstName trỏ và chỉ trỏ đến đúng person được khai báo sau var). 

<h3> Cơ bản về từ khoá "this" trong Javascript </h3>

Đầu tiên, cần nhớ lại rằng mọi hàm trong Javascript đều có thuộc tính (giống như mọi objects đều có thuộc tính vậy). Khi thực thi 1 hàm nào đó sẽ làm phát sinh 1 thuộc tính **this** có **giá trị của object sẽ gọi hàm đấy**. [Khó hiểu quá!]

**this** này LUÔN LUÔN trỏ đến (và giữ giá trị của) một object (singular object), "this" này thường được sử dụng ở trong phạm vi của function hoặc method, mặc dù người ta có thể đặt "this" ở ngoài function trong phạm vi của global context. Lưu ý là có sự khác biệt giữa strict mode và non-strict mode. Với strict mode, **this** ứng với *undefined* trong các hàm global, và hàm không tên (anynymous/ arrow functions) vốn không được ràng buộc với 1 object nào cả. 

**this** được sử dụng trong 1 hàm F thì sẽ chứa giá trị của object gọi hàm F. Chúng ta cần **this** để truy cập vào các methods và thuộc tính (properties) của object kia, nhất là khi ta chẳng biết tên của object đó, và nhiều lúc bản thân object cũng không được đặt tên. Hiểu cách ngắn gọn thì **this** là một lối đi tắt trỏ đến object gọi hàm F. 

Thử xem ví dụ bên dưới: 


{% highlight javascript %}
``` javascript
    var person = {
        firstName   :"Dũng",
        lastName    :"Nguyễn Minh",
        showFullName:function () {
            console.log (this.firstName + " " + this.lastName);
            // Lưu ý: từ khoá "this" được dùng bên trong method showFullName, 
            // và method showFullName được định nghĩa bên trong object "person"
            // Do đó, "this" sẽ có giá trị của object "person" vì object "person" này 
            // sẽ gọi hàm method/hàm showFullName()
        }
    }
    person.showFullName (); // Dũng Nguyễn Minh
```
{% endhighlight %}


Và 1 ví dụ khác dùng **this** trong jQuery: 


{% highlight javascript %}
``` javascript
    // Đây là 1 đoạn code rất hay gặp trong jQuery
    $ ("button").click (function (event) {
        console.log ($ (this).prop ("name"));
    // $(this) sẽ mang giá trị của object button ($("button")) 
    // bởi object​ button đã gọi method click()
    
    });
```
{% endhighlight %}

Với ví dụ jQuery trên, hãy lưu ý một vài điểm sau:
1. **button** (nút bấm) là 1 phần tử DOM của trang HTML, vì vậy nó là 1 object.
2. Trong ví dụ này, vì chúng ta gói nó trong đô-la, ý là hàm jQuery $(), ta đã biết nó thành 1 object, nhưng là **jQuery object**.
3. Cái hàm jQuery $() bản chất là 1 hàm không tên (anonymous function), mà đã là hàm không tên thì không có object nào gọi nó cả, mà đã không có object nào thì lấy ra chỗ để **this** trỏ đến? 
4. Dẫu vậy, $(this) vẫn có giá trị của jQuery object button ($("button")) đơn giản chỉ bởi vì các tác giả của thư viện jQuery đã định nghĩa luôn là $(this) đấy sẽ bị ràng buộc với object gọi method click(). 

<h3>Một phút "Eureka" với từ khoá “**this**” của JavaScript</h3>

Một khi đã hiểu nguyên lý cơ bản đầu tiên của từ khoá **this**, ta sẽ nắm được rằng: **this** của 1 hàm không được truyền giá trị nào cả cho đến khi 1 object nào đó gọi hàm ra. Trong hầu hết các trường hợp, **this** chứa giá trị của object gọi hàm. Những trường hợp ngoại lệ sẽ được nhắc đến sau. 

<h3>Sử dụng **this** ở phạm vi global</h3>

Trong phạm vi global, khi code được thực thi trong trình duyệt, thì mọi variables và hàm dạng global đều được định nghĩa trong object "window". Do đó, khi dùng **thi** trong hàm dạng global, nó sẽ trỏ tới (và mang giá trị) của object "window" (điều này ko đúng nữa trong strict mode khi đã nói ở trên). Lưu ý: object "window" là thằng quản toàn bộ các ứng dụng Javascript chạy trên nền web. 


{% highlight javascript %}
``` javascript
    var firstName = "Phúc",
        lastName = "Nguyễn Văn";
​
    function showFullName () {
        // Lưu ý: Đây là 1 hàm được định nghĩa trong môi trường global, cùng môi trường với variables "firstName" và "lastName".
        // Do đó, "this" ở trong dây sẽ trỏ (và mang giá trị) của object "window"
        console.log (this.firstName + " " + this.lastName);
    }
​
    var person = {
        firstName   :"Dũng",
        lastName    :"Nguyễn Tấn",
        
        showFullName:function () {
        // Lưu ý: Đây là 1 hàm được định nghĩa trong 1 object (tên là "person")
        // object "person" này sẽ gọi hàm "showFullName" khi có nhu cầu
        // do đó, "this" ở trong đây sẽ trỏ và mang giá trị của object "person" 
        // chứ ko phải object "window" như ở trên. 
            console.log (this.firstName + " " + this.lastName);
        }
    }
​
    showFullName (); // Phúc Nguyễn Văn
​
    window.showFullName (); // Phúc Nguyễn Văn
​
    person.showFullName (); // Dũng Nguyễn Tấn
```
{% endhighlight %}

<h3>Những trường hợp mà **this** bị hiểu nhầm và trở nên rắc rối</h3>

Một vài trường hợp khiến ta hiểu nhầm **this** là:
1. Khi mượn (borrow) method sử dụng **this**
2. Khi truyền 1 method sử dụng **this** cho 1 variable 
3. Khi một hàm sử dụng **thiss** lại được truyền vào 1 hàm khác dưới dạng hàm "callback". 
4. Khi **this** được dùng bên trong một closure. 

<h3> Một lưu ý quan trọng </h3>
** Một chút về "Context" trước khi tiếp tục**
> Khái niệm "context" trong JavaScript cũng tương tự như "chủ đề' trong 1 câu. Trong câu tiếng Việt “<em>Văn Cao là nhạc sĩ người đã sáng tác Quốc ca của Việt Nam Dân chủ Cộng hoà</em>.”, thì "chủ đề" của câu là Văn Cao, và ta có thể nói rằng "context" của câu là Văn Cao bởi toàn bộ câu này vào thời điểm nói là đang hướng cụ thể đến người nhạc sĩ này chứ không phải người/ sự vật nào khác. Ngay cả đại từ "người" cũng đang trỏ đến Văn Cao. Và giống như chúng ta có thể sử dụng dấu chấm phẩy (";") để chuyển chủ ngữ của câu, ta có thể chuyển context hiện tại của 1 đối tượng sang một một đối tượng khác bằng cách gọi hàm ứng với đối tượng thứ hai.

Xem đoạn code JavaScript bên dưới:


{% highlight javascript %}
``` javascript
var person = {
   firstName   :"Sơn Tùng",
   lastName    :"MTP ",
   showFullName:function () {
    ​// Đây là "context"​ (tạm gọi là context 1) của hàm showFullName() bên trong object "person"
    // Hàm showFullName() sẽ được gọi thông qua object "person" 
    // Do đó, "this" trong hàm này sẽ trỏ đến và mang giá trị của object "person"
    console.log (this.firstName + " " + this.lastName);
 }
}
​
person.showFullName (); // Sơn Tùng MPT
​
// Nếu ta gọi showFullName() từ một object khác
​var anotherPerson = {
firstName   :"Soobin",
lastName    :"Hoàng Sơn"​
};
​
// Ở dưới đây, ta thực hiện vụ "chuyển chủ ngữ của câu", 
// Chuyển từ "context 1" sang "context 2" (ứng với object "anotherPerson") bằng cách gọi hàm ứng với đối tượng thứ hai thông qua method apply()
​// Lúc này đây, "this" sẽ trỏ và mang giá trị của đối tượng thứ 2. 
person.showFullName.apply (anotherPerson); // Soobin Hoàng Sơn
​
​// Lưu ý: mặc dù trông thì có vẻ như object "person" gọi hàm showFullName(), 
// Nhưng do dùng method apply() rồi, nên về thực tế là nó đã chuyển sang gọi thông qua object "anotherPerson"
```
{% endhighlight %}


Dưới đây là những trường hợp mà việc sử dụng từ khoá **this** trở nên phức tạp. Hãy cùng quan sát các ví dụ và cách xử lý.

1. <h3> Khi "this" được dùng trong hàm callback </h3>
2. <h3> Khi "this" được dùng bên trong closure </h3>

3. <h3> Khi "this" đặt trong 1 method, mà method này lại được gán vào 1 variable </h3>

Khi ta gán 1 method vốn sử dụng **this** cho 1 variable, thì bạn **this** này vượt ra khỏi trí tưởng tượng, bị ràng buộc vào một object khác. Xem ví dụ dưới đây: 

{% highlight javascript %}
``` javascript

// Variable "data" ngay dưới đây là 1 global variable. Tạm gọi là data-g.
    var data = [
    {name:"Samantha", age:12},
    {name:"Alexis", age:14}
    ];
​
    var user = {
    // Variable "data" ở chỗ này lại là 1 thuộc tính của object "user"​
    data    :[
                {name:"T. Woods", age:37},
                {name:"P. Mickelson", age:43}
            ],
    showData:function (event) {
    
        var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​
​
        // Dòng bên dưới hiển thị ở console thông tin về 1 người bất kỳ trong mảng data.
        console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    }
​
    }
​
    // Gán user.showData cho 1 variable 
    var showUserData = user.showData;
​
    // Khi thực thi hàm showUserData, giá trị được in ở console được lấy từ mảng data-g (global)
    // không phải từ mảng data trong object "user"
    showUserData (); // Samantha 12 (from the global data array)​

```
{% endhighlight %}

Cách nào để xử lý vụ này? Hãy sử dụng method bind()
{% highlight javascript %}
``` javascript

   // Ràng buộc method showData vào object "user"
    var showUserData = user.showData.bind (user);
​
    // Giờ ta lấy được dữ liệu từ object "user", bởi "this" đã được chỉ định cho object này. 
    showUserData (); // P. Mickelson 43

```
{% endhighlight %}

4. <h3> Khi "this" dùng trong method đi mượn </h3>

Đi mượn method là một cách làm thường gặp trong lập trình JavaScript. Là một lập trình viên JavaScript, chúng ta chắc chắn sẽ gặp cách làm này nhiều lần, phải chỉnh sửa, hoặc viết lại nó. Chi tiết hơn thì bạn có thể [đọc thêm ở đây](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/).

Trong giới hạn bài viết này, ta chỉ xem xét ví dụ sau: 
{% highlight javascript %}
``` javascript

// Ta có 2 objects. Object thứ nhất có 1 method tên là avg() trong khi objec thứ hai không có. 
// Để tiết kiệm thời gian, ta không đi viết lại method(avg) cho object thứ hai, mà mượn nó từ object thứ nhất. 
    var gameController = {
                scores  :[20, 34, 55, 46, 77],
                avgScore:null,
                players :[
                    {name:"Công Phượng", playerID:987, age:23},
                    {name:"Công Vinh", playerID:87, age:33}
                ]
                }
​
    var appController = {
                scores  :[900, 845, 809, 950],
                avgScore:null,
                avg     :function () {
                            var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
                                    return prev + cur;
                            });
​
                            this.avgScore = sumOfScores / this.scores.length;
                    }
                }
​
    gameController.avgScore = appController.avg();
    // Khi chạy đoạn code ngay trên đây, thuộc tính "avgScore" của object "gameController" sẽ bằng trung bình của các scores, nhưng dữ liệu scores này lại là của object "appController". 
   // Lưu ý: Đừng chạy đoạn code đó, nó chỉ để minh hoạ; chúng ta cần giữ cho appController.avgScore = null.

```
{% endhighlight %}

Ví dụ trên cho thấy **this** trong method avg() sẽ không trỏ đến object "gameController", mà đến object "appController" do appController gọi hàm avg() chứ không phải là gameController. 

Cách xử lý? Sử dụng method "apply()" để chắc chắn rằng **this** bên trong appController.avg() trỏ đến object "gameController". 
{% highlight javascript %}
``` javascript 

    // Lưu ý: Chúng ta dùng method apply(), vì thế tham số thứ 2 truyền vào phải là 1 mảng
    // Mảng này sẽ được truyền cho method appController.avg() ​
    appController.avg.apply (gameController, gameController.scores);
​
    // Thuộc tính avgScore của object "gameController" đã được tính và trả về kết quả chính xác
    // Kết quả này được lưu vào avgScore của gameController
     console.log (gameController.avgScore); // 46.4​
​
    // còn appController.avgScore vẫn là null;
    console.log (appController.avgScore); // null

```
{% endhighlight %}

[Xem ví dụ trên ở JSBIN](http://jsbin.com/iwaver/1/edit)


<h2> Thay lời kết </h2>

Rất hy vọng là những gì tác giả của "JavaScript Is Sexy" và phần dịch của tôi đã giúp bạn hiểu thêm về **this** trong JavaScript. Bây giờ, bạn đa có thêm những vũ khí mới (bind, apply, và call) để chinh phục **this** trong mọi trường hợp. 

Như bạn thấy, **this** bắt đầu trở nên đỏng đảnh trong những tình huống mà context gốc (nơi mà định nghĩa **this**) thay đổi, đặc biệt trong (1) hàm callback, (2) trỏ đến **this** từ 1 object khác, hoặc (3) method đi mượn. Tuy vậy, hãy luôn nhớ là **this** chỉ được truyền cho giá trị của object mà gọi được hàm (hàm này chứa xác định về **this**)