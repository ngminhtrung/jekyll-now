
	// var canvas = document.getElementById("canvas"),
	// 	context = canvas.getContext("2d"),
	// 	width = canvas.width = window.innerWidth,
	// 	height = canvas.height = window.innerHeight;

    var width = 500,
        height = 500;

    var points = [],
        sticks = [],
		bounce = 1;
		gravity = 1;
		friction= 1;

	points.push({
		x: 100,
		y: 100,
		oldx: 95,
		oldy: 95
    });
    
    points.push({
        x: 200,
        y: 100,
        oldx: 200,
        oldy: 100
    })

    sticks.push({
        p0: points[0],
        p1: points[1],
        length: distance(points[0], points[1])
    })

    sticks.push({
        p0: points[0],
        p1: points[2],
        length: distance(points[0], points[2])
    })
    function distance(p0, p1) {
        var dx = p1.x - p0.x;
            dy = p0.x - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

        update();
        update();
        update();

	function update() {
        // tính vị trí mới của các điểm
        updatePoints();
        renderPoints();
        // dựa vào vị trí mới của các điểm, tính khoảng cách
        // từ chênh lệnh giữa khoảng cách mới với khoảng cách cũ
        // cập nhật lại vị trí của các điểm sao cho khoảng cách không đổi
        updateSticks();
        // renderSticks();
		// requestAnimationFrame(update);
	}

	function updatePoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				vx = (p.x - p.oldx) * friction,
				vy = (p.y - p.oldy) * friction;

			p.oldx = p.x;
			p.oldy = p.y;
			p.x += vx;
			p.y += vy;
			p.y += gravity;

			if(p.x > width) {
				p.x = width;
				p.oldx = p.x + vx * bounce;
			}
			else if(p.x < 0) {
				p.x = 0;
				p.oldx = p.x + vx * bounce;
			}
			if(p.y > height) {
				p.y = height;
				p.oldy = p.y + vy * bounce;
			}
			else if(p.y < 0) {
				p.y = 0;
				p.oldy = p.y + vy * bounce;
			}
		}
	}

	function renderPoints() {
		// context.clearRect(0, 0, width, height);
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			// context.beginPath();
			// context.arc(p.x, p.y, 10, 0, Math.PI * 2);
			// context.fill();
		}
    }
    
    function updateSticks() {
        for (var i = 0; i < sticks.length; i++) {
            var s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y, 
                distance = Math.sqrt(dx * dx + dy * dy),
                difference =   s.length - distance, 
                percent = difference / distance/ 2,
                offsetX = dx * percent,
                offsetY = dy * percent;

                s.p0.x -= offsetX;
                s.p0.y -= offsetY;
                s.p1.x += offsetX;
                s.p1.y += offsetY;

        }
    }

    function renderSticks() {
        // context.beginPath();
        for (var i=0; i < sticks.length; i++) {
            var s = sticks[i];
            // context.moveTo(s.p0.x, s.p0.y);
            // context.lineTo(s.p1.x, s.p1.y);
        }
        // context.stroke();

    }