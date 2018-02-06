## Hàm để download file từ 1 link nào đó:

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

## Muốn download nhiều file:
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
```

3. Muốn collect một array các links:

- Cách 1: Xem quy luật của các links + kết hợp với Excel --> copy chỉnh sửa 1 chút.

- Cách 2: Lại dùng JS để xử lý dựa trên structure HTML của website.


## Toàn bộ code để download.

Copy đoạn code sau copy vào Chrome Developer


```js
function downloadURI(uri) {
    var link = document.createElement("a");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  };

const downloadButton = document.getElementsByClassName("td_bottom3 td_bg2");
let idNames = []; // AAA, AAM, ABC, ...
for (let i=0; i < downloadButton.length; i++) {
    if ((i % 6) === 0) { idNames.push(downloadButton[i].textContent) };
  };

let idNames = ['ACB', 'BCC', 'CEO', 'DBC', 'DCS', 'HHG', 'HUT',
			  'LAS',  'MBS', 'NDN', 'PGS', 'PVC', 'PVI',
			  'PVS', 'S99','SHB', 'SHS', 'VC3', 'VCG','VCS', 'VGC'];

const prefix = {
  metastock: "http://www.cophieu68.vn/export/metastock.php?id=",
  excelfull: "http://www.cophieu68.vn/export/excelfull.php?id=",
  reportfinance: "http://www.cophieu68.vn/export/reportfinance.php?id=",
  indexfinance: "http://www.cophieu68.vn/export/indexfinance.php?id=",
  events: "http://www.cophieu68.vn/export/events.php?id="
};

let links = {
  metastock: [],
  excelfull: [],
  reportfinance: [],
  indexfinance: [],
  events: []
};

for (let key in links) {
    for (let i =0; i < idNames.length; i ++) {
        links[key].push(prefix[key] + idNames[i]);
    }
};


// Bắt đầu download từ đây
// 

let counter = 0;
let i = setInterval(function() {
    downloadURI(links.metastock[counter]); // Thay đổi .metastock thành .excelfull, hoặc reportfinance tùy theo dữ liệu nào muốn down
    counter++;
    limitDownload = links.length - 1; 
    // limitDownload = 3 
    if (counter === limitDownload) {
      clearInterval(i);
    }
}, 1000); // 1000 = 1000ms // Thay đổi giá trị này nếu muốn giảm thời gian gọi đến server. Nên để lâu một chút.
```

## Thay đổi một chút để load đích danh những mã theo yêu cầu

- Copy đoạn code bên dưới vào Chrome Developer
- Khai báo các mã muốn lấy, ví dụ:
  ```js
  let idNames = ['ACB', 'BCC', 'CEO', 'DBC', 'DCS', 'HHG', 'HUT',
			  'LAS',  'MBS', 'NDN', 'PGS', 'PVC', 'PVI',
			  'PVS', 'S99','SHB', 'SHS', 'VC3', 'VCG','VCS', 'VGC'];
  ```
- Khai báo danh mục muốn lấy, ví dụ:
  ```js
  let category = "excelfull";
  ```  
- Gọi hàm `getData(idNames, category)`

```js
function getData(idNames, category) {

  function downloadURI(uri) {
    var link = document.createElement("a");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  };

  const prefix = {
    metastock: "http://www.cophieu68.vn/export/metastock.php?id=",
    excelfull: "http://www.cophieu68.vn/export/excelfull.php?id=",
    reportfinance: "http://www.cophieu68.vn/export/reportfinance.php?id=",
    indexfinance: "http://www.cophieu68.vn/export/indexfinance.php?id=",
    events: "http://www.cophieu68.vn/export/events.php?id="
  }

  let links = {
    metastock: [],
    excelfull: [],
    reportfinance: [],
    indexfinance: [],
    events: []
  };


  for (let i = 0; i < idNames.length; i++) {
    links[category].push(prefix[category] + idNames[i]);
  }

  let counter = 0;
  let i = setInterval(function () {
    downloadURI(links[category][counter]);
    counter++;
    limitDownload = links.length - 2;
    if (counter === limitDownload) {
      clearInterval(i);
    }
  }, 2000);

};

```