const router = require('express').Router();
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require('../../controllers/studentController');

// /get all users, and create a new user
router.route('/').get(getStudents).post(createStudent);

// change to get single user, delete user + add update user router here
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// you will pass your userId/friends instead of studentId/assignments, and run your addFriend controller here
router.route('/:studentId/assignments').post(addAssignment);

// This will be for your delete friend controller
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
