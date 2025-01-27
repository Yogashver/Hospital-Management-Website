import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {Table} from "antd";
import moment from "moment";
// import { useSelector } from "react-redux";

const PatientAppointmentPage = () => {
  // const { user } = useSelector((state) => state.user);

  const [appointments, setAppointments] = useState([]);
  // console.log(user);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Message",
      dataIndex:"message"
    },
   
  ];
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "/api/v1/user/user-appointments",
          // { userId: user._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          console.log(res.data)
          console.log(res.data.data)
          setAppointments(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  // return (
  //   <Layout>
  //     <h3>My Appointments</h3>
  //     <div>
  //       {appointments.map((appointment) => (
  //         <div key={appointment._id}>
  //           <p>Doctor: {appointment.doctorInfo.firstName} {appointment.doctorInfo.lastName}</p>
  //           <p>Date: {appointment.date}</p>
  //           <p>Time: {appointment.time}</p>
  //           {/* Display message */}
  //           <p>Message: {appointment.message}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </Layout>
  // );

  return (
    <Layout>
      <h1 className="m-2">Appointment Lists</h1>
      <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
};

export default PatientAppointmentPage;