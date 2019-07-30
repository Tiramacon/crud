let fs = require('fs');
let express = require('express');
let student = require('./student');

let router = express.Router();

router.get('/', function (req, res) {
	student.find(function (err, students) {
		if (err) {
			return res.status(500).send('Not Found');
		}
		res.render('index.html', {
			students: students
		});
	});
});

router.get('/students/add', function (req, res) {
	res.render('new.html');
});

router.post('/students/add', function (req, res) {
	student.save(req.body, function (err) {
		if (err) {
			return res.status(500).send('Not Found');
		}
		res.redirect('/');
	});
});

router.get('/students/edit', function (req, res) {
	let stuId = parseInt(req.query.id);

	student.findById(stuId, function (err, student) {
		if (err) {
			return res.status(500).send('Not Found');
		}
		res.render('edit.html', {
			student: student
		});
	});
});

router.post('/students/edit', function (req, res) {
	student.updateById(req.body, function (err) {
		if (err) {
			return res.status(500).send('Not Found');
		}

		res.redirect('/');
	})
});

router.get('/students/delete', function (req, res) {
	student.deleteById(req.query.id, function (err) {
		if (err) {
			return res.status(500).send('Not Found');
		}

		res.redirect('/');
	});
});

module.exports = router;
