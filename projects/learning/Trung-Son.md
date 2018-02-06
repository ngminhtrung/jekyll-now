1. Hàm để download file từ 1 link nào đó:

```js
function downloadURI(uri) {
  var link = document.createElement("a");
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
};
```

Cách dùng:
- Mở Chrome
- Thiết lập phần Downloads trong Setting là tự động download không cần hỏi
- Nhấn `F12` để mở Chrome Developer, chọn tab `Console`.
- Copy function trên vào Chrome Developer, truyền tham số đường dẫn, nhẫn Enter. Ví dụ: `downloadURI("http://www.cophieu68.vn/export/excelfull.php?id=VCB")`

2. Muốn download nhiều file:
- chạy hàm trên nhiều lần, mỗi lần truyền vào một link (dạng `String`).
- Link chứa trong 1 mảng, mỗi lần gọi hàm thì truyền vào phần tử trong mảng.
- Nên có khoảng cách về thời gian giữa mỗi lần gọi hàm, vì không rõ website có chính sách giới hạn số download trong 1 quãng thời gian hay không.

Sử dụng đoạn code sau:

```js
var counter = 0;
var links = []; // nhập đường dẫn vào đây
var i = setInterval(function() {
    downloadURI(links[counter]);
    counter++;
    if (counter === (links.length - 1)) {
      clearInterval(i);
    }
}, 1000); // 1000 = 1000ms 


