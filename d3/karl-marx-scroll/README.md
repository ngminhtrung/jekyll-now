### Giải thích sơ bộ

In traditional animation, motion is linked to time. In Javascript that might be using setInterval to call some render code regularly, with the elapsed time as an input.

In scroll-linked animations, instead of using elapsed time, the scrollTop is used as the driver of motion. The scrollTop value (currently: 892) can be transformed in various ways for various effects.

On the right, the scrollTop value is used as the input into a d3.scale function. That value is then used as the rotation value on the <g> group.

There are two chunks of code that makes this all work. First is an event handler that records the scroll position. It looks like this:
```javascript
container
  .on("scroll.scroller", function() {
    newScrollTop = container.node().scrollTop
  });      
```

The second piece of code is the render code. Approximately 60 times a second (using window.requestAnimationFrame) it checks if newScrollTop is different from scrollTop. If it is different, then update our graphics accordingly. It looks like this:

```javascript
var render = function() {
  // Don't re-render if scroll didn't change
  if (scrollTop !== newScrollTop) {
    // Graphics Code Goes Here
  }
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render) 
```

That's the core of it. Although there's a couple other minor tricks that's worth pointing out.

1. **Pacing the Panels**: These panels that contains the text are spaced according to the height of the window, such that just one paragraph is visible at a time.

    To achieve this in a responsive way, I use vh units to set the top and bottom padding on each panel. That way, the paragraphs are spaced correctly no matter the size of the screen.

2. **Responsive Timing**: The clock on the right hits 12 just as you finish scrolling, no matter what the screen size is. Getting the animation in sync with scroll requires using the dimensions of container and the screen as input in the animation scaling function.

    The way this is achieved is through a callback on the window.resize handler. It reads in the relevant dimensions and feeds it back into the .domain of the d3.scale function.



### Tham khảo:

- [Mike Bostock - The Russia Left Behind](http://www.nytimes.com/newsgraphics/2013/10/13/russia/index.html): Bài báo đầu tiên xem được, từng có ý định bắt chước làm một cái tương tự.
- [Mike Bostock - How to scroll](https://bost.ocks.org/mike/scroll/): Bài viết mang tính tổng quan tạo cảm hứng.
- [Jim Vallandingham - So You Want to Build A Scroller](http://vallandingham.me/scroller.html): Tham khảo sau này.
- [Tony Chu - Small Scroll-linked Animation Demo](http://bl.ocks.org/tonyhschu/af64df46f7b5b760fc1db1260dd6ec6a): Tham khảo chính, giải thích cặn kẽ và dễ hiểu về kỹ thuật. Tác giả là một product designer tại San Francisco (link [personal blog](http://www.tonyhschu.ca/)).
- [Roger Veciana i Rovira - D3 map scrollers](http://geoexamples.com/d3/2016/05/25/d3-map-scrollers.html): Tham khảo chính. Tác giả cũng xem từ ví dụ của Tony Chu, giải thích dài hơn nhưng khó hiểu. Phần code không được show hết (có thể xem qua [đây](https://cdn.rawgit.com/rveciana/eeaa71659adbc88dc4165eaf99dcb9be/raw/4812ed4d7330335bed355a082742367b484b3048/index.html).) Tác giả là một nhà khí hậu học (meteorologist) đang sống tại Barcelona, thích map và coding.