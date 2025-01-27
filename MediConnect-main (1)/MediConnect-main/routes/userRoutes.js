const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  saveMessageController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// LOGIN
router.post("/login", loginController);

// REGISTER
router.post("/register", registerController);

// AUTH
router.post("/getUserData", authMiddleware, authController);

// APPLY DOCTOR
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// NOTIFICATIONS
router.post("/get-all-notification", authMiddleware, getAllNotificationController);
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

// GET ALL DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// BOOKING AVAILABILITY
router.post("/booking-availability", authMiddleware, bookingAvailabilityController);

// USER APPOINTMENTS
router.get("/user-appointments", authMiddleware, userAppointmentsController);

// SAVE MESSAGE
router.post("/save-message", authMiddleware, saveMessageController);

module.exports = router;