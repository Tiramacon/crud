let fs = require('fs');

let listPath = './s_list.json';

//查找学生列表数据
exports.find = function (callback) {
	fs.readFile(listPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err);
		}
		callback(null, JSON.parse(data).students);
	});
}

//保存表单学生数据
exports.save = function (student, callback) {
	fs.readFile(listPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err);
		}

		let students = JSON.parse(data).students;
		let num = students.length - 1;
		student.id = students[num].id + 1;

		students.push(student);
		let s_list = JSON.stringify({
			students: students
		});

		fs.writeFile(listPath, s_list, function (err) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	});
}