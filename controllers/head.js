// const Student = require("../models/student");
// const Quiz = require("../models/quiz");
// const path = require("path");
// const fs = require("fs");

const arr = [{regno:2, name:"bk", marks: 100}]
const arrClasses = [{id:1, roomNo:101, students: ["qasim","bk","ali"]}]
module.exports.getStudentResultByregNo = async (req, res) => {
    try {
      const regNo = req.body.regno;
      // const student = await Student.findOne({ regNo });
      const student = arr.find((stu)=>stu.regno === regNo)
      
      if (!student) {
        return res.json({ message: "Student not found" });
      }
      if (!student.marks || student.marks.length === 0) {
        return res.json({ message: "Marks not available for this student" });
      }
  
      // const marks = student.results.map((result) => ({
      //   subjectName: result.subject.name,
      //   grade: result.grade,
      // }));


      return res.status(200).json(student.marks);
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  };

  module.exports.viewAllClasses = async (req, res) => {
    try {
      if (!arrClasses) {
        return res.json({ message: "No Classes" });
      }
      
      return res.status(200).json(arrClasses);
    } catch (error) {
      return res.json({ message: "Internal server error" });
    }
  };