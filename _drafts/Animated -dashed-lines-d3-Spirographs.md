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

https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3.html

http://bl.ocks.org/duopixel/4063326

https://codepen.io/andreasmb/pen/GgEyLP

https://bocoup.com/blog/improving-d3-path-animation

## Vẽ một đường liền nét

---

Để làm hoạt hình vẽ một đường (`path`) liền nét không khó như lúc mới nhìn, không có gì là ma thuật ở đây, tất cả chỉ là sử dụng mẹo dựa trên những attributes sẵn có của SVG, đó là `stroke-dasharray` và `stroke-dashoffset`. Nếu thắc mắc `stroke-dasharray` là gì, mời xem ở [đây](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray). Ngắn gọn là nếu 1 path có độ dài 10 pixels, mà `stroke-dasharry` là [1 1] thì path đó sẽ có dạng là "- - - - - " (một 1px hiện, 1 px ẩn nối đuôi nhau).

Về cách làm, có thể hiểu chung nhất như sau:

1. Nhân đôi đoạn `path` mà ta cần vẽ, đoạn 1 để "visible" (kiểu như `opacity = 1`), đoạn 2 để "invisible" (kiểu như `opacity = 0`).
2. Offset (tức là dịch chuyển toàn bộ các `path` trên) sang trái 1 khoảng đúng bằng độ dài của 1 path.
3. Chạy [d3.transition](https://github.com/d3/d3-transition) trong 1 khoảng thời gian xác định (dài ngắn do bạn) với mục đích là khi chạy đến phúc cuối thì offset = 0. Điều này sẽ khiến cho phần path visible sẽ được dịch chuyển ngược lại từ trái (ứng với offset = độ dài path) sang phải (ứng với offset = 0).

```js
// Khởi tạo một đường thẳng nối giữa điểm (0,0) và điểm (200,200)
let path = d3
  .select("svg")
  .append("path")
  .style("stroke-width", "5px")
  .style("stroke", "lightyellow")
  .attr({
    d: "M0,0L200,200",
    stroke: "#000"
  });

// Tính độ dài của path
let totalLength = path.node().getTotalLength();

path
  .style("stroke-dasharray", totalLength + " " + totalLength) // nhân đôi path, 1 visible, 1 invisible
  .style("stroke-dashoffset", totalLength) // dịch toàn bộ path sang bên trái 1 khoảng bằng độ dài path
  .transition()
  .duration(3000)
  .ease("linear") // đặt transition chạy trong 3000ms
  .style("stroke-dashoffset", 0); // mỗi lần chạy transition là khoảng offset lại giảm đi một chút, giảm về đến 0, tạo cảm giác đường thẳng đang chạy
```

http://jsfiddle.net/ngminhtrung/96QSs/187/

**Lưu ý**: `SVGPathElement.getTotalLength()` đã bị bỏ khỏi Web standards, chuyển sang `SVGGeometryElement.getTotalLength()`. Xem ở [đây](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getTotalLength).

https://en.wikipedia.org/wiki/Spirograph

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
