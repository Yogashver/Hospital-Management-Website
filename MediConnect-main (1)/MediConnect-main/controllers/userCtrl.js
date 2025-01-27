const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

// Register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
  }
};

// Login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login Controller: ${error.message}` });
  }
};

// Auth controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    } else {
      res.status(200).send({ success: true, data: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Auth Error", success: false, error });
  }
};

// Apply Doctor controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({ success: true, message: "Doctor Account Applied Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error while applying for doctor" });
  }
};

// Notification controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const seenNotifications = user.seenNotifications;
    const notification = user.notification;
    seenNotifications.push(...notification);
    user.notification = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    res.status(200).send({ success: true, message: "All notifications marked as read", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Notification", success: false, error });
  }
};

// Delete notifications controller
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    user.notification = [];
    user.seenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({ success: true, message: "Notifications deleted successfully", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable to delete all notifications", error });
  }
};

// Get all doctors controller
const getAllDoctorsController = async (req, res) => {
  try {
    const firstName = req.query.firstName;
    const address = req.query.address;
    const experience=parseInt(req.query.experience);
    const feesPerCunsaltation=parseInt(req.query.feesPerCunsaltation);

    console.log(firstName);
    const status = req.query.status;
    const filter = {};

    if(firstName) filter.firstName =  new RegExp(firstName,"i");
    if(address) filter.address =  new RegExp(address,"i");
    if(experience) filter.experience = {$gte:experience}
    if(feesPerCunsaltation) filter.feesPerCunsaltation = {$lte:feesPerCunsaltation}

    filter.status = "approved";
    console.log(filter);
    const doctors = await doctorModel.find(filter );
    res.status(200).send({ success: true, message: "Doctors List Fetched Successfully", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error while fetching doctors" });
  }
};

// Book appointment controller
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    console.log(req.body);
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findById(req.body.doctorInfo.userId);
    user.notifcation.push({
      type: "new-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error while booking appointment" });
  }
};

// Booking availability controller
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({ message: "Appointments not available at this time", success: true });
    } else {
      return res.status(200).send({ success: true, message: "Appointments available" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error in booking" });
  }
};

// User appointments controller
const userAppointmentsController = async (req, res) => {
  try {
    
    const appointments = await appointmentModel.find({ userId: req.body.userId });
    res.status(200).send({ success: true, message: "User's appointments fetched successfully", data: appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error in user appointments" });
  }
};

// Save message controller
const saveMessageController = async (req, res) => {
  try {
    const appointmentId = req.body.appointmentId;
    const message = req.body.message;
    const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { message });
    res.status(200).send({ success: true, message: "Message saved successfully", data: appointment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error while saving message" });
  }
};

module.exports = {
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
};