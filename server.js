var express = require('express');
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var app = express();

app.get('/', (req, res) => {
	var file = path.join(__dirname, '/index.html');
	res.sendFile(file);
});

app.listen(8000, function() {
	console.log("Listening on port 8000")
});

app.get('/:time', (req, res) => {
	var time = req.params.time;
	try {
		if(/^\d{8,}$/.test(time)) {
			time = moment(time, 'X');
			console.log(time);
		} else {
			time = moment(time, 'MMMM D, YYYY');
			console.log(time);
		}
	} catch(err) {
		console.log(err);
	}
	if(time.isValid()) {
		res.json({
			unix: time.format('X'),
			natural: time.format('MMMM D, YYYY')
		});
	} else {
		res.json({
			unix: null,
			natural: null
		});
	}
});
