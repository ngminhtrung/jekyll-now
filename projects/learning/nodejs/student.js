
// getter function: to retrieve list of students
function getAllStudents() {

    var students = storage.getItemSync('students');

    if (typeof students === "undefined") {
        return [];
    }

    return students; 

}

// getter function: to retreive details of a student
function getStudent(studentId) {
    var students = getAllStudents();

    var matchedStudent = null;

    for (var i=0; i < students.length; i ++) {
        if (students[i].id === studentId) {
            matchedStudent = students[i];
            break
        }
    }

    return matchedStudent;
}

// setter function: to add new student
function addStudent(id, fullname) {

    var students = getAllStudents();

    students.push({
        id: id,
        fullname: fullname
    });

    storage.setItemSync("students", students);

}

// setter function: to remove student
function removeStudent(studentId) {

    var students = getAllStudents();

    for (var i=0; i< students.length; i++) {
        if (students[i].id === studentId) {
            students.splice(i,1);
        }
    }

    storage.setItemSync('students', students);

}

// setter function: to edit student 
function editStudent(studentId, studentName) {

    var students = getAllStudents();

    for (var i =0; i < students.length; i++) {
        if (students[i].id === studentId) {
            students[i].fullname = studentName;
        }
    }

    storage.setItemSync('students', students);

}

// getter function: to display students
function showStudents(){

    var students = getAllStudents();
    students.forEach(function(student) {
        console.log("Student: " + student.fullname + ' (' + student.id + ')');
    });

}

var storage = require('node-persist');

// initiation 
// load data on disk 

storage.initSync({
    dir: "students"
})

// // Thêm sinh viên
// addStudent(1, 'Cuong');
// addStudent(2, 'Kinh');
// addStudent(3, 'Chinh');
// addStudent(4, 'Quyen');
 
// Hiển thị danh sách sinh viên
showStudents();

// removeStudent('3');