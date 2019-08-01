let fs = require('fs');

let listPath = './s_list.json';

/** 
 * 查找学生数据列表
 * @param  {Function}
 */
exports.find = function (callback) {
	fs.readFile(listPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err);
		}

		callback(null, JSON.parse(data).students);
	});
};

/**
 * 根据id查找学生数据
 * @param  {number}
 * @param  {Function}
 */
exports.findById = function (id, callback) {
	fs.readFile(listPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err);
		}

		let students = JSON.parse(data).students;
		let student = students.find(function (item) {
			return item.id === id;
		});

		callback(null, student);
	});
}

/**
 * 保存表单学生数据
 * @param  {object}
 * @param  {Function}
 */
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
};

/**
 * 更新学生编辑数据
 * @param  {object}
 * @param  {Function}
 */
exports.updateById = function (student, callback) {
	fs.readFile(listPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err);
		}

		let students = JSON.parse(data).students;
		student.id = parseInt(student.id);

		let modifyStu = students.find(function (item) {
			return item.id === student.id;
		});

		for (let key in student) {
			modifyStu[key] = student[key];
		}

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
};

/**
 * 删除对应id的学生数据
 * @param  {number}
 * @param  {Function}
 */
exports.deleteById = function (id, callback) {
	fs.readFile(listPath, 'utf8', function (err, data) {
		if (err) {
			return callback(err);
		}

		let students = JSON.parse(data).students;

		let stuId = students.findIndex(function (item) {
			return item.id === parseInt(id);
		});

		students.splice(stuId, 1);

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
