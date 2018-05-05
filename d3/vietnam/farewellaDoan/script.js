var sound = document.getElementById("sound");

var data = [];
var data1 = [];
var data2 = [];
var data3 = [];
var arr = [];
var arrAnimation = [""]

var margin = { top: 50, right: 20, bottom: 50, left: 20 };
var w = 1255 - margin.left - margin.right;
var h = 600 - margin.top - margin.bottom;
var i = 0;

var mymap = L.map('mapid').setView([48.877808, 2.341222], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);



// get data from data-02.csv 
setTimeout(d3Function,5000);

	function d3Function() {

		d3.csv("data-02.csv")
		.row(convertData1) // convert data against pairs of key & value per each row
		.get(function (error, d) { // apply data converted
			if (error) {
				console.log("Something went wrong", error);
			} else {
				data1 = d;
				// get the array of time
				arr = createTimeArray(data1);

				// get data from data-01.csv 
				d3.csv("data-01.csv")
					.row(convertData2)
					.get(function (error, d) {
						if (error) {
							console.log("Something went wrong", error);
						} else {

							data2 = convertData3(d);
							var time = document.getElementById("month");
							var number = document.getElementById("number");

							var x1 = d3.scaleBand()
								.domain(data1.map(function (entry) {
									return entry.time;
								}))
								.range([0, w]);
							var y1 = d3.scaleLinear()
								.domain([0, d3.max(data1, function (d) {
									return d.Accumulated;
								})])
								.range([h, 0]);

							var svg1 = d3.select("#area2").append("svg")
								.attr("id", "chart1")
								.attr("width", w + margin.left + margin.right)
								.attr("height", h + margin.top + margin.bottom);

							var g1 = svg1.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							var data = []

							var illustration = setInterval(function () {
								number.style.fontSize = "80px";
								data[i] = data1[i]
								if (i < data1.length) {
									drawBarChat1(data, g1, x1, y1);
									time.innerHTML = data1[i].time;
									number.innerHTML = data1[i].Accumulated;
									plotMarkers(data2, i);
									i++;
									if (i % 4 == 0) { sound.play();}
								} else {
									clearInterval(illustration);
								}
							}, 750);
						}
					})
			}
		})

	}


	function drawBarChat1(params, g, x1, y1) {

		// DATA JOIN
		// Join new data with old elements, if any.
		var bar1 = g.selectAll("rect")
			.data(params)

		var bar1_text = g.selectAll("text")
			.data(params)

		// DATA JOIN
		// Join new data with old elements, if any.
		bar1.attr("class", "update")
		bar1_text.attr("class", "update")

		// ENTER
		// Create new elements as needed.
		//
		// ENTER + UPDATE
		// After merging the entered elements with the update selection,
		// apply operations to both.
		bar1.enter()
			.append("rect")
			.attr("class", "enter")
			.attr("x", function (d, i) {
				return x1(d.time) + 1;			
})

			.attr("y", function (d, i) {
				return y1(d.Accumulated);
			})
			.attr("width", function (d) {
				return x1.bandwidth() - 2;
			})
			.attr("height", function (d) {
				return h - y1(d.Accumulated);
			});

		bar1_text.enter()
			.append("text")
			.attr("class", "enter")
			.attr("x", function (d, i) {
				return x1(d.time) + 1;
			})
			.attr("dx", -22)
			.attr("y", function (d, i) {
				return y1(d.Accumulated);
			})
			.attr("dy", -10)
			.text(function (d) {
				return (d.Accumulated);
			});



		// EXIT
		// Remove old elements as needed.
		bar1.exit().remove();
		bar1_text.exit().remove();
	}

	function convertData1(d) {
		return {
			time: d.time,
			Total: +d.Total,
			Accumulated: +d.Accumulated
		}
	}

	function plotMarkers(d, i) {

		var temp = d[i]["elements"];
		for (var j = 0; j < temp.length; j++) {

			var circle = L.circle([temp[j].lat, temp[j].lon], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.05,
				weight: 1,
				radius: temp[j].r * 200000,
				// bounceOnAdd: true,
			}).addTo(mymap);

			var marker = L.marker([temp[j].lat, temp[j].lon], {
				bounceOnAdd: true,
				bounceOnAddOptions: { duration: 1000, height: 100 },
			}).addTo(mymap);


		}
	}

	function createTimeArray(d) {
		var temp_arr = [];
		for (var i = 0; i < d.length; i++) {
			temp_arr.push(d[i]["time"]);
		}
		return temp_arr;
	}

	function convertData2(d) {
		return {
			testmonth: d.testmonth,
			market: d.market,
			project: d.project,
			projectname: d.projectname,
			mva: +d.mva,
			r: +d.r,
			lat: +d.latitude,
			lon: +d.longitude,
			time: d.time
		}
	}

	function convertData3(d) {

		// Tạo 1 object tên là "data" có "n" objects con (n = arr.length)
		// Oject con thứ "i" sẽ có dạng:
		// ... - time: value = arr[i]
		// ... - elements: [obj_elm_1, obj_elm_2, obj_elm_3, ...] 
		var temp = [];

		for (var i = 0; i < arr.length; i++) {
			var object = {
				time: "",
				elements: []
			};
			object.time = arr[i];
			temp.push(object);
		}

		console.log("Thử xem nào: " + d[100]["time"]);

		// Để tạo "nội dung" cho object "data" nói trên
		// cần chạy i từ 0 --> d.length
		// ... với mỗi d[i], kiểm tra var j = arr.indexOf(d[i]) 
		// ... với giá trị "j" trả về
		// ... push 1 object mới vào mảng elements của data[j]
		// ... object mới này bao gồm: d.lat, d.lon, d.r, d.project, d.projectname

		for (var i = 0; i < d.length; i++) {
			var j = arr.indexOf(d[i]["time"]);
			var temp_obj = {
				lat: "",
				lon: "",
				r: ""
			};
			temp_obj["lat"] = d[i].lat;
			temp_obj["lon"] = d[i].lon;
			temp_obj["r"] = d[i].r;
			temp[j]["elements"].push(temp_obj);
		}

		return temp;
	}