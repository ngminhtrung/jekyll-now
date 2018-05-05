Khi làm việc với SVG và D3.js, thỉnh thoảng ta sẽ gặp từ khóa `<defs>`. Do bản thân từ "defs" không có ý nghĩa, nên làm ta thấy có chút khó hiểu. Xin được giải thích về từ này thông qua các ví dụ bên dưới đây. Đại loại, bạn cứ hiểu rằng **`<defs>` giúp ta định nghĩa các phần tử trong SVG như module, khai báo một lần, và tái sử dụng nhiều lần, giúp cho code ngắn gọn, sạch sẽ, và còn nhiều tiện ích nữa.**

Ghi chú:
- Ý tưởng và ví dụ lấy từ quyển [SVG Essentials, 2nd Edition - Producing Scalable Vector Graphics with XML](http://shop.oreilly.com/product/0636920032335.do), phần "Grouping and Referencing Objects".

**Bài toán/ Ví dụ 0**: Hãy vẽ 01 ngôi nhà bằng thẻ `<svg>`.

Đơn giản! Xong trong vòng 1 nốt nhạc.

<svg width="280px" height="120px" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
    <g id="house" style="fill: lightgreen; stroke: black;" transform="translate(100, 0)">
        <rect x="0" y="41" width="60" height="60" />
        <polyline points="0 41, 30 0, 60 41" />
        <polyline points="30 101, 30 71, 44 71, 44 101" />
    </g>
</svg>

```html
<svg width="280px" height="280px" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
    <g id="house" style="fill: lightgreen; stroke: black;">
        <rect x="0" y="41" width="60" height="60" />
        <polyline points="0 41, 30 0, 60 41" />
        <polyline points="30 101, 30 71, 44 71, 44 101" />
    </g>
</svg>
```


**Bài toán/ Ví dụ 1**: Hãy vẽ thêm 01 ngôi nhà giống hệt ngôi nhà trên, cho đặt cạnh nhau. 

Ủa. Chẳng nhẽ phải lặp lại đoạn code bên trên, nhưng cho nó *translate* đi theo trục x khoảng 70 px? Thế nếu cần phải vẽ 3, 4 ngôi nhà tương tự thì sao? Số dòng code cứ tăng lên gấp 3, gấp 4? 

<svg width="280px" height="120px" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
    <g id="house" style="fill: lightgreen; stroke: black;" transform="translate(100, 0)">
        <rect x="0" y="41" width="60" height="60" />
        <polyline points="0 41, 30 0, 60 41" />
        <polyline points="30 101, 30 71, 44 71, 44 101" />
    </g>
    <g id="house" style="fill: lightgreen; stroke: black;" transform="translate(170, 0)">
            <rect x="0" y="41" width="60" height="60" />
            <polyline points="0 41, 30 0, 60 41" />
            <polyline points="30 101, 30 71, 44 71, 44 101" />
    </g>
</svg>

```html
<svg width="280px" height="280px" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
    <g id="house" style="fill: lightgreen; stroke: black;" transform="translate(100, 0)">
        <rect x="0" y="41" width="60" height="60" />
        <polyline points="0 41, 30 0, 60 41" />
        <polyline points="30 101, 30 71, 44 71, 44 101" />
    </g>
    <g id="house" style="fill: lightgreen; stroke: black;" transform="translate(170, 0)">
            <rect x="0" y="41" width="60" height="60" />
            <polyline points="0 41, 30 0, 60 41" />
            <polyline points="30 101, 30 71, 44 71, 44 101" />
    </g>
</svg>
```

Đến đây thì ta nảy sinh nhu cầu cần khai báo cái `g.#house` kia như 1 biến (hoặc module), để gọi nó ở nhiều nơi khác nhau. Với mỗi lần gọi thì có thể chỉnh sửa tí chút cho phù hợp. Với nhiệm vụ này, ta cần:
- `<defs>` giúp ta định nghĩa phần tử ("defs" có khả năng là viết tắt của chữ "define"). Lưu ý: *tất cả những gì được để bên trong thẻ `<defs>` đều không được hiển thị trên màn hình cho đến khi ta gọi chúng ra một cách công khai*.
- `<use>` giúp ta sử dụng phần tử đã được định nghĩa ở các vị trí mình cần:

```html
<svg width="280px" height="120px" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <g id="house" style="stroke: black;">
            <rect x="0" y="41" width="60" height="60" />
            <polyline points="0 41, 30 0, 60 41" />
            <polyline points="30 101, 30 71, 44 71, 44 101" />
        </g>
    </defs>
    <!-- make use of the defined groups -->
    <use xlink:href="#house" x="0" y="0" style="fill: #cfc;" />
    <use xlink:href="#house" x="70" y="0" style="fill: yellow;" />
</svg>
```
Nhìn vào đoạn code trên, cần nhắc lại rằng:
- Nếu ta không gọi ngôi nhà này ra thông qua `<use xlink:href="#house" />`, ngôi nhà này sẽ không xuất hiện trên màn hình. 
- Việc sử dụng `<use>` giúp ta có những điều chỉnh nhất định với `g.#house` nguyên bản. Ta thay đổi vị trí của x, hoặc tô màu khác đi. Quá hay phải không?
- Số dòng code được rút ngắn rất nhiều, mọi thứ trông gọn gàng hơn hẳn so với cách viết bên trên.

<svg width="280px" height="120px" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <g id="house" style="stroke: black;">
            <rect x="0" y="41" width="60" height="60" />
            <polyline points="0 41, 30 0, 60 41" />
            <polyline points="30 101, 30 71, 44 71, 44 101" />
        </g>
    </defs>
    <!-- make use of the defined groups -->
    <use xlink:href="#house" x="0" y="0" style="fill: #cfc;" />
    <use xlink:href="#house" x="70" y="0" style="fill: yellow;" />
</svg>

**Bài toán/ Ví dụ 2**: Thay vì 2 ngôi nhà, hãy vẽ vài nhà cùng với vài cặp đôi nam - nữ, nữ nam đan xen nhau.

Với bài toán thế này, ta càng thấy tác dụng của việc dùng `<defs>` và `<use>` để định nghĩa "ngôi nhà", "nam", "nữ", "cặp đôi", rồi đặt vào các vị trí khác nhau trong khung hình, chỉnh sửa lại cho từng chỗ nếu muốn. 

<svg width="280px" height="240px" viewBox="0 0 280 240" xmlns="http://www.w3.org/2000/svg">
    <title>Grouped Drawing</title>
    <desc>Stick-figure drawings of a house and people</desc>
    <defs>
        <g id="house" style="stroke: black;">
            <desc>House with door</desc>
            <rect x="0" y="41" width="60" height="60" />
            <polyline points="0 41, 30 0, 60 41" />
            <polyline points="30 101, 30 71, 44 71, 44 101" />
        </g>
        <g id="man" style="fill: none; stroke: orange;">
            <desc>Male stick figure</desc>
            <circle cx="10" cy="10" r="10" />
            <line x1="10" y1="20" x2="10" y2="44" />
            <polyline points="1 58, 10 44, 19 58" />
            <polyline points="1 24, 10 30, 19 24" />
        </g>
        <g id="woman" style="fill: none; stroke: blue;">
            <desc>Female stick figure</desc>
            <circle cx="10" cy="10" r="10" />
            <polyline points="10 20, 10 34, 0 44, 20 44, 10 34" />
            <line x1="4" y1="58" x2="8" y2="44" />
            <line x1="12" y1="44" x2="16" y2="58" />
            <polyline points="1 24, 10 30, 19 24" />
        </g>
        <g id="couple">
            <desc>Male and female stick figures</desc>
            <use xlink:href="#man" x="0" y="0"/>
            <use xlink:href="#woman" x="25" y="0"/>
        </g>
    </defs>
    <!-- make use of the defined groups -->
    <g>
        <use xlink:href="#house" x="0" y="0" style="fill: #cfc;" />
        <!-- <use xlink:href="#couple" x="10" y="40"/> -->
        <!-- <use xlink:href="#house" x="120" y="0" style="fill: #99f;" /> -->
        <!-- <use xlink:href="#couple" x="190" y="40" /> -->
        <!-- <use xlink:href="#woman" x="0" y="145" /> -->
        <!-- <use xlink:href="#man" x="25" y="145" /> -->
        <!-- <use xlink:href="#house" x="65" y="105" style="fill: #c00;" /> -->
    </g>
</svg>

```html
<svg width="280px" height="240px" viewBox="0 0 280 240" xmlns="http://www.w3.org/2000/svg">
    <title>Grouped Drawing</title>
    <desc>Stick-figure drawings of a house and people</desc>
    <defs>
        /* Đi
        <g id="house" style="stroke: black;">
            <desc>House with door</desc>
            <rect x="0" y="41" width="60" height="60" />
            <polyline points="0 41, 30 0, 60 41" />
            <polyline points="30 101, 30 71, 44 71, 44 101" />
        </g>
        <g id="man" style="fill: none; stroke: orange;">
            <desc>Male stick figure</desc>
            <circle cx="10" cy="10" r="10" />
            <line x1="10" y1="20" x2="10" y2="44" />
            <polyline points="1 58, 10 44, 19 58" />
            <polyline points="1 24, 10 30, 19 24" />
        </g>
        <g id="woman" style="fill: none; stroke: blue;">
            <desc>Female stick figure</desc>
            <circle cx="10" cy="10" r="10" />
            <polyline points="10 20, 10 34, 0 44, 20 44, 10 34" />
            <line x1="4" y1="58" x2="8" y2="44" />
            <line x1="12" y1="44" x2="16" y2="58" />
            <polyline points="1 24, 10 30, 19 24" />
        </g>
        <g id="couple">
            <desc>Male and female stick figures</desc>
            <use xlink:href="#man" x="0" y="0"/>
            <use xlink:href="#woman" x="25" y="0"/>
        </g>
    </defs>
    <!-- make use of the defined groups -->
    <g transform="translate(20, 20)">
        <use xlink:href="#house" x="0" y="0" style="fill: #cfc;" />
        <use xlink:href="#couple" x="70" y="40"/>
        <use xlink:href="#house" x="120" y="0" style="fill: #99f;" />
        <use xlink:href="#couple" x="190" y="40" />
        <use xlink:href="#woman" x="0" y="145" />
        <use xlink:href="#man" x="25" y="145" />
        <use xlink:href="#house" x="65" y="105" style="fill: #c00;" />
    </g>
</svg>
```

### Tham khảo:

[Structuring, Grouping, and Referencing in SVG — The `<g>`, `<use>`, `<defs>` and `<symbol>` Elements](https://www.sarasoueidan.com/blog/structuring-grouping-referencing-in-svg/)