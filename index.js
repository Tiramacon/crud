let express = require('express');
let fs = require('fs');

let app = express();

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

app.engine('html', require('express-art-template'));

app.get('/', function (req, res) {
	fs.readFile('./s-list.json', 'utf8', function (err, data) {
		if (err) {
			return res.status(500).send('Not Found');
		}
		res.render('index.html', {
			students: JSON.parse(data).students
		});
	});
});

app.listen(3000, function () {
	console.log('server is running');
});