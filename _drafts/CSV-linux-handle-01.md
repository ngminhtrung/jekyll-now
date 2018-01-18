---
id: 103
title: 'Title'
date: 2017-09-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

Nguồn: [Working with CSVs on the Command Line](http://bconnelly.net/working-with-csvs-on-the-command-line/)

Trước khi vào phần chính, cần nhớ qua những lệnh sau sẽ được dùng để thao tác với CSV.

## BẢNG DANH SÁCH CÁC LỆNH SỬ DỤNG ĐỂ THAO TÁC VỚI TEXT VÀ CSV**
--- 

| Lệnh  | Mô tả |
|---    |---    |
|`awk`    | AWK là ngôn ngữ lập trình (và lệnh) vô cùng hiệu quả cho việc xử lý text ([xem hướng dẫn](http://www.linuxmanpages.com/man1/awk.1.php)) |
| `cat`   | con**cat**enates (nối chuỗi) và in files ([xem hướng dẫn](http://www.linuxmanpages.com/man1/cat.1.php)) |
| `cut`   | xóa bỏ bytes, ký tự, hoặc fields được chỉ định trong files ([xem hướng dẫn](http://www.linuxmanpages.com/man1/cut.1.php)) |
| `grep`  | tìm những dòng matching (hoặc không matching) dựa trên 1 pattern cho trước ([xem hướng dẫn](http://www.linuxmanpages.com/man1/grep.1.php)) |
| `head`  | xuất ra phần đầu tiên của 1 file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/head.1.php))  |
| `sed`   | thực hiện các xử lý đơn giản đối với text trong file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/sed.1.php)) |
| `tail`  | xuất ra phần cuối của 1 file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/tail.1.php))  |
| `tr`    | thay đổi (dịch chuyển - **tr**anslate) các ký tự trong file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/tr.1.php)) |
| `wc`    | đếm số ký tự, từ, hoặc dòng trong file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/wc.1.php)) |

## Về Piping (đường ống) và Redirection (chuyển hướng) trong Linux
---

Để bắt đầu với việc xử lý CSV, ta cần hiểu về nguyên lý đường ống và chuyển hướng trong Linux, bởi nó sẽ giúp ta hiểu cách thức viêt tức câu lệnh. 

Hầu hết các lệnh tồn tại trong chế độ dòng lệnh đều được phát triển với cùng 1 triết lý: làm 1 việc duy nhất và làm cho chuẩn. Sức mạnh thực sự của câu lệnh đến từ việc các câu lệnh có thể được "dắt dây" (nối) với nhau để thực hiện các nhiệm vụ phức tạp. Một khi đã biết một tập các câu lệnh nào đấy thì người dùng có thể kế hợp lại với nhau để làm bất kỳ điều gì. 

### Xuất ra file sử dụng câu lệnh điều hướng

Bình thường khi gõ lệnh thì hầu hết kết quả sẽ được in ngay ra màn hình. Tuy nhiên, có nhiều tình huống người dùng cần in kết quả ra 1 file, để sau đó sử dụng tiếp vào 1 việc khác (chứ lúc đó không cần copy paste vào 1 editor, save, rename, mất thời gian).

Với câu lệnh điều hướng (output redirection), bạn có thể xuất kết quả của dòng lệnh ra file sử dụng ký tự `>`. Ví dụ: khi dùng lệnh `ls` để in ra danh sách các folder con, thay vì chỉ để xuất kết quả ra màn hình, ta có thể gọi:
```
ls > danhsach.txt
```
sau đó dùng `vim` để mở. Trong file danhsach.txt sẽ chứa danh sách các folder để ta sử dụng cho mục đích khác. 

Lưu ý: 
- Nếu file phía output chưa tồn tại, thì `>` sẽ tạo ra một file mới
- Nếu file phía output đã tồn tại, thì `>` sẽ ghi đè lên file cũ.
- Nếu không muốn bị ghi đè, mà ghi thêm vào file cũ, thì dùng `>>` thay vì `>`.

### Kết nối các câu lệnh thông qua Pipes (đường ống)

Pipes (đường ống), được ký hiệu bởi ký tự `|` (dấu sổ dọc), cho phép kết quả xuất ra của chương trình này sẽ được gửi đến làm đầu vào của 1 chương trình khác. Ưu điểm? Thay vì phải xuất ra hết file này đến file khác, rồi gọi lại chúng ở từng câu lệnh, thì bây giờ tất cả chỉ cần đặt trong cùng 1 dòng lệnh, tự chúng sẽ tung hứng dữ liệu/ kết quả qua lại để  làm việc. Ta chỉ ngồi cuối ... đường ống đợi sung rụng thôi. 

Ví dụ: Nếu muốn đếm số dòng trong file *danhsach.txt* (chứa danh sách folder) nói trên, nếu theo cách thông thường, cần gọi `ls > danhsach.txt` đầu tiên, sau đó gọi tiếp `wc -l danhsach.txt`. Cần 2 dòng lệnh. Cần lưu tên file ra riêng, rồi gọi lại lần nữa. Sử dụng phương pháp ống nói trên, 2 nhập thành 1 như sau:
```
ls | wc - l
```
Quá ư là ngắn gọn!!!!

## Xóa thông tin dư thừa trong file CSV
---

Hãy bắt đầu với 2 lệnh quan trọng:
- `grep` dùng để tìm các đoạn trong file giống (hoặc không giống) với *pattern* mà ta nhập vào, và 
- lệnh `wc` dùng để đếm số từ, ký tự, hoặc dòng trong file.

### Sử dụng `grep` cơ bản

### Sử dụng `wc` cơ bản

### Xóa các dòng ghi chú (comment) trong file CSV

Comments are additional information stored in the file that are not a part of the actual data set, but that either describe the data set or provide relevant information (metadata). Comments could include things like the name of the person who gathered the data, the date on which measurements were made, the equipment used, or notes about a particular record. Typically, comments occur on their own line and begin with a # sign as demonstrated below:

### Loại bỏ đầu mục (header)

## Tham khảo
---
- [Piping và chuyển hướng câu lệnh trong Linux](https://viblo.asia/p/piping-va-chuyen-huong-cau-lenh-trong-linux-bJzKmk4Ol9N)
https://www.joeldare.com/wiki/using_awk_on_csv_files
https://stackoverflow.com/questions/27549368/linux-how-to-manipulate-csv-file

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
