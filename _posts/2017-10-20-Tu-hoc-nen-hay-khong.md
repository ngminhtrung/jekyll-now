---
id: 106
title: '[John Sonmez] Tự học lập trình? Dễ hay khó? Nên chăng?'
date: 2017-10-11
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - Dịch
tags:
  - self-training
  - self-learning
  - budget allocation
  - john-sonmez
---

Sau một thời gian đi học về lập trình front-end (HTML, CSS, JavaScript) ở trung tâm, tôi có thể mạnh dạn khẳng định là 95% những người mới bắt đầu với lập trình và có ý định theo nghề này thì nên đi học ở đâu đó. 
- Muốn nhanh (9 tháng - 12 tháng), đến [Techmaster Vietnam](http://techmaster.vn) hoặc những trung tâm tương tự. 
- Muốn lấy bằng cấp, học cơ bảng từng bước một (3 năm ~ 5 năm), xin mời đến các trường Đại học/ Cao đẳng chính quy. 

Chỉ khoảng 5% là có khả năng tự học 100% từ đầu thông qua sách vở, giáo trình, khoá học online. Khoa học máy tính nói chung và lập trình nói riêng là một lĩnh vực phức tạp, tầng tầng lớp lớp các hệ thống logic đan xen với nhau, vừa rất rộng, lại cũng rất sâu. Một người chưa biết gì về lập trình/ kỹ thuật máy tính mà muốn nghiêm túc phát triển sự nghiệp theo hướng này không nên tiếc thời gian, công sức, và tiền bạc để những người có kinh nghiệm trong ngành chỉ bảo, tránh đi lan man không hiệu quả trong thời gian ban đầu ( 9 tháng - 12 tháng). Tôi muốn nhấn mạnh cụm *trong thời gian ban đầu*. Sau này, tuy việc *có 1 người mentor tốt cho mình lời khuyên trong công việc vẫn vô cùng quan trọng*, nhưng lúc đó bản thân đã cứng cáp hơn, đa có thể tự đi nhiều hơn so lúc ban đầu. 

Hôm nay đọc chương "**Teaching Yourself** (Tạm dịch: *Tự dạy bản thân*)"trong quyển "[The Complete Software Developer's Career Guide](https://www.amazon.com/Complete-Software-Developers-Career-Guide-ebook/dp/B073X6GNJ1) (Tạm dịch: *Toàn tập Hướng dẫn nghề nghiệp cho Lập trình viên*)" của John Sonmez, cảm thấy có một vài điều ưng ý nên lược dịch một chút để ai vào đây có thể tham khảo. Các bạn có thể mua ebook/ hoặc sách giấy từ Amazon.

- *Lưu ý 1*: Một quyển tiếng Việt có nội dung tương tự cho thị trường Việt Nam là cuốn "[Code Dạo Ký sự - Lập trình viên đâu phải chỉ biết code](https://tiki.vn/code-dao-ki-su-p580509.html)" của [Phạm Huy Hoàng](https://toidicodedao.com/about/) (hiện đang là Full-stack Developer tại Lancaster ISS, Singapore). Tiền sách chỉ bằng một vài cốc cà phê/ trà sữa Đài Loan. 
- *Lưu ý 2*: Sách của John Sonmez thực ra là tập hợp lại các bài viết blog trên website của John. Hầu hết bài của anh này đều viết dưới dạng văn nói, nên tuy cấu trúc chung thì rõ ràng, nhưng các đoạn văn cụ thể thì nhiều chỗ rườm rà, lủng củng, và tối nghĩa nữa. Tôi sẽ cố gắng dịch lấy ý chứ không dịch từng chữ bài của John. 
- *Lưu ý 3*: Bài của John Sonmez đầy rẫy các đường dẫn trỏ về website của anh ta nhằm mục đích quảng cáo. Tôi tôn trọng John và sẽ giữ toàn bộ các phần quảng cáo đó. 

Dưới đây là phần dịch của chương sách nói trên. 

***

# **TỰ HỌC LẬP TRÌNH**
Tác giả: John Sonmez

Rất nhiều lập trình viên đã đi lên từ quá trình tự học. 

Bạn sẽ thấy chẳng hiếm gặp trong thế giới phần mềm những lập trình viên bắt đầu từ số 0 và đi lên bằng quá trình tự học. Có những người dù công việc không liên quan, nhưng họ tranh thủ thời gian để học lập trình để tự động hoá một phần công việc hàng ngày. Nhiều người trong số đó trở thành những lập trình viên xuất sắc. 

Nói như vậy không đồng nghĩa với việc tự học lập trình là dễ dàng. Có vô số những người học một mình và đang vật lộn với các kiến thức máy tính một mình, lúc nào cũng bị kẹt trong một mớ bòng bong. Và những ai tự học lập trình bao giờ cũng có những thể hiện khá đặc trưng, mà tôi (tác giả - John Sonmez) có thể cảm nhận được ngay khi làm việc với họ, phân biệt họ với những người học qua trường lớp (hoặc các trung tâm dạy học, hoặc bootcamp). Những lập trình viên tự học thường nghĩ là họ có thể giải quyết bất kỳ thách thức nào. Cuối cùng là đôi khi họ bị kẹt quá lâu trong đống thách thức ấy, hoặc bỏ qua nó quá nhanh, và thường bị dán mác là anh chàng lập trình viên cao bồi (xem thêm [cowboy coders](http://wiki.c2.com/?CowboyCoder)). 

Nói vậy cũng không phải là cào bằng mọi lập trình viên tự học, mà chỉ để chỉ ra những điểm lợi/ điểm bất lợi của việc tự học lập trình mà thôi. Nếu bạn là một lập trình viên tự học, hãy lưu ý các điểm này trước khi chìm đắm vào hành trình đầy hứng khởi nhưng cũng đầy hoang mang này. 

## ƯU ĐIỂM CỦA VIỆC TỰ HỌC LẬP TRÌNH
***

Ưu điểm thì có rất nhiều nhé. 

*Thứ nhất* chính là **tính linh động** của việc tự học. Khi bạn tự học thì bạn có toàn quyền quyết định học lúc nào và ở đâu. Có người cho đấy là tốt, có người lại bảo là xấu. Tôi thì nghĩ cho rằng nó mang cả hai mặt. 

Sự linh động sẽ rất tuyệt vời khi bạn có thể **tận dụng để đi sâu hơn, dành thời gian nhiều hơn cho những phần bạn quan tâm**. Nhưng linh động lại có thể không tốt nếu **bạn thiếu định hướng, không biết phải làm gì hoặc không có động lực để đi tiếp**. 

*Thứ hai*, chi phí và kỹ năng học được trong quá trình tự học là những lợi thế của con đường này. Hãy xem phân tích của tôi tiếp theo đây. 

### CHI PHÍ TỰ HỌC VÔ CÙNG THẤP, THẬM CHÍ BẰNG 0

Tự học lập trình có thể giúp bạn tiết kiệm cả một gia tài. Vào thời buổi này, **bất kỳ ai đều có thể học lập trình thông qua các nguồn tài nguyên miễn phí trên Internet**. Chúng ta thực sự đang sống trong 1 kỷ nguyên kỳ diệu nơi mà hầu hết các thông tin đều được chia sẻ, đặc biệt là thông tin về lập trình. Trên Internet đầy rẫy các trang web viết hướng dẫn miễn phí, bài blog, thậm chí là những quyển sách hoàn chỉnh trình bày 1 chủ đề nào đó của Khoa học Máy tính. Thú thực là những gì bạn đang đọc ở chương này chính là 1 bài trên blog của tôi tại https://simpleprogrammer.com, nếu vào website đó để đọc nó thì **bạn không tốn một đồng nào**. Ngoài tài liệu, ngay cả các công cụ lập trình cũng miễn phí cho người sử dụng. 

Dẫu vậy, miễn phí không phải lúc nào cũng là tốt. Nhiều khi [những học liệu chuẩn xác và được chọn lọc kỹ càng hoàn toàn xứng đáng để bạn bỏ tiền ra mua](https://simpleprogrammer.com/products/careerguide/links/?utm_source=careerguide&utm_medium=book&utm_campaign=chapter-9&utm_content=personal#chapter-9). Tổng tiền chi cho các tài liệu học tập trên vẫn rẻ hơn nhiều so với đi học ở Cao đẳng/ Đại học, hoặc tham gia các bootcamp. Nếu không học ở những nơi này (Cao đẳng/ Đại học/ Bootcamp), bạn sẽ có đủ tiền để mua một lượng sách đọc cả đời không hết, và truy cập vào hàng nghìn khoá học online trên các trang như [Pluralsight](https://simpleprogrammer.com/cg9-pluralsight), Lynda or Udemy.

Đương nhiên, nếu bạn đang cháy túi thì đương nhiên không có con đường nào khác ngoài tự học.

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""

### KHẢ NĂNG TỰ HỌC LÀ MỘT TRONG NHỮNG KỸ NĂNG ĐƯỢC ĐÁNH GIÁ CAO NHẤT

Mỗi khi có bài [thuyết trình về năm kỹ năng mềm hàng đầu](https://simpleprogrammer.com/cg9-softskills) mà mỗi lập trình viên cần biết, tôi luôn nhắc đến khả năng tự học (hay học cách học) là một trong số các kỹ năng đó. 

Tôi không thể tìm cách tốt hơn để nhấn mạnh tầm quan trọng của kỹ năng này cả trong cuộc sống đời thường lẫn trong lĩnh vực khoa học máy tính và phát triển phần mềm. **Với những ai có thể tự học, cả thế giới sẽ nằm trong tay họ, các cơ hội sẽ rộng mở hơn với họ so với người không biết cách tự học**. 

**There are few things that are more difficult to learn in life than learning to program on your own**.

I know some people will disagree with me on that statement, but I have taught myself many skills and I have been a teacher of all kinds of life skills for a long time, and I’ve only encountered one challenge greater than that of learning to code: learning to be an entrepreneur.”

### “YOU CAN LEARN AT YOUR OWN PACE”

“One of the major struggles people have with traditional education or boot camps is that they either move too quickly or too slowly.

Different people, with varied backgrounds, intelligence levels, and concentration abilities are going to learn and grasp things at a different pace.

**It can be frustrating to be in a setting where the teacher is teaching at a slower pace than what would be optimal for you**, because it feels like you are wasting your time and you may become bored and not pay attention.

On the other hand, **it can also be equally frustrating when you are sitting in a class that seems to be moving too quickly** and you are having trouble understanding what is going on.

By teaching yourself how to program, you can avoid this problem completely and move at the pace that is most comfortable to you.

In the end, you’ll probably have a better understanding of what you are learning, because you’ll be able to completely explore a concept before moving on to the next one.

If you consider yourself a slow learner or a very rapid learner, this could be a big advantage that you may want to consider.

I[…]”

### “YOU CAN WORK AROUND YOUR SCHEDULE”

“When you decide to go to college or a coding boot camp, you are committing a huge amount of time in both your daily schedule and your life to one specific endeavor.

This can be great if you don’t have other commitments and you have the luxury of focusing on just learning to program or getting your degree, **but if you already have a hectic schedule and you don’t want to quit your full-time job, learning on your own can be a much better choice**.

In fact, it may be your only choice.

I learned programming on my own and then completed my degree on my own through a correspondence school.

I needed that flexibility since I already had a really good job that I had no interest in leaving.

So, if you don’t want to drop everything else in your life to focus on learning to program, this could be a pretty big reason to learn on your own.”

### “YOU CAN GO DEEP ON SUBJECTS YOU ARE INTERESTED IN”

“One of the things I found best about learning on my own is that I could go really deep into the subjects I was most interested in.

**When I did go to a traditional college, I was constantly frustrated by having to move on before I felt like I had completely explored a topic**.

I often felt like we were just rushing through the material so we could complete the textbook—not really trying to learn.”

“If you find yourself to be a very curious person who really wants to dig deep and understand what they are learning, you will probably be frustrated in college—and perhaps in coding boot camps—where there is often an emphasis on rushing to cover the required material, rather than going deep to gain true understanding.”

## “DISADVANTAGES TO SELF-TAUGHT PROGRAMMING”

“Learning on your own definitely has some great advantages, but it has some definite disadvantages as well.

That same flexibility that is great for working around your schedule and letting you set your own course can be a detriment when you feel like you don’t know what to do and no one is guiding you.

Here are a few disadvantages you might want to consider before becoming the facilitator of your own educational journey.

## YOU HAVE TO FIGURE OUT WHAT TO DO AND WHAT TO LEARN
Remember how I said flexibility was both a blessing and a curse?

Here is why.

**When you have absolute flexibility, it can be extremely difficult to decide what to do**.

What do you learn first?”

“How do you know if you are doing it right?

How do you know if you are done?

These are just some of the questions that come up when you are trying to teach yourself programming.

That is part of the reason why I laid out a step-by-step process for learning your first programming language in the chapter “Learning Your First Programming Language.”

I always say that **everyone wants freedom, but not many people can handle it**.

If you are not a self-starter and you have problems with motivating yourself and walking down paths that aren’t completely paved, you might want to consider learning programming via a more guided pathway.”

### NO HELP WITH FINDING A JOB
While colleges don’t often offer a huge amount of direct support for finding a job after you graduate, there are usually internship programs or networking opportunities which you can take advantage of to greatly increase your chances of getting a job after getting your degree.

Coding boot camps are even more focused on helping graduates get placed into companies after completing their programs.

But, when you are on your own… you are on… your own.

**It can be pretty tough to find your first job as a self-taught programmer.**”

“Getting your foot in the door and proving that you know what you are doing without any experience, certificate, or degree, can prove challenging.

But it can be done. In the next section of the book, “Finding a Job,” I’ll talk more about how, but this is definitely something you should consider, before you fully commit to the self-taught route.

### IT’S EASY TO LOSE MOTIVATION”



“Not many people can [push on and accomplish a goal without motivation](https://simpleprogrammer.com/cg9-unmotivated).

It’s an extremely valuable skill in life, but it’s a rare one and is difficult to develop.

**Most people only do things when they feel motivated to do them—which is usually when they first start**.

That is where committing to a structured program like a formal degree at a college or even a three to six month program at a coding boot camp can help.

When you feel obligated to complete something because you **threw down a large wad of cash**, or committed a large amount of time already, it can be easier to push on, even when motivation wanes.

**It can also help to be around other people whose motivation and enthusiasm may rub off on you**, for those times when you are lacking it.

Learning on your own can be difficult if you can’t either work without motivation or you [aren’t very good at self-motivating](https://simpleprogrammer.com/cg9-unmotivated).

Remember, everything eventually gets boring. The newness wears off.

At some point, studying programming at 7:30 PM, after a hard day of work is not going to seem so fun. Will you be able to push through[…]”

### “SOCIAL ISOLATION
Let’s not forget social isolation.

This is a very tough one for many people to deal with and it’s one of those problems most people never suspect they will have.

Colleges and coding boot camps provide plenty of opportunities for you to socialize and work with other people seeking a similar goal.

At first, studying on your own might not seem so bad, **but after a few weeks of being locked up in your room or office by yourself in front of your computer, you can start to go a bit stir-crazy**.

I spend quite a bit of time in my office by myself, so I know this from personal experience.

I find other ways to get out and socialize when I can, but even I have short fantasies of going into a regular office and being around people, rather than being alone for most of the day.

This is definitely something you might want to test out and see how you do, before you make a final decision.”

### “LIKELY TO HAVE GAPS IN KNOWLEDGE”

“I know I’ve given you quite a few disadvantages so far to learning on your own.

I don’t mean to paint an overly bleak picture, because I am a big advocate of self-education. **I just want to make sure you know what you are getting into**, because this route has the highest chance of failure for most people.

So bear with me while I tell you one more disadvantage. Last one, I promise.

Just like I mentioned with coding boot camps, learning on your own is likely to leave you with some definite gaps in knowledge, but probably in different areas than what you would experience going to college or a boot camp.

**Many self-taught programmers lack some of the best practices and orthodoxy** that college or boot camp graduates may have.

That is because when you work in isolation and solve problems on your own, you start to develop your own ways of doing things.

This isn’t necessarily bad, but it can be if the way you figure out how to do things greatly differs than what is commonly accepted and you aren’t willing to learn and change once you get a real job.

“You can, of course, combat this by purposely trying to add computer science material to your self-study program and working on shared projects, like open-source for example, but **just be aware that you are likely to have some gaps in your education** that you won’t be aware of.”