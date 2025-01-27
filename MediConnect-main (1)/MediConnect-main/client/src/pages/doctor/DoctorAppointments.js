import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import useHistory hook for redirection
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
// import {useNavigate} from "react-router-dom"

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  // const [handleReviewAppointment, setHandleReviewAppointment] = useState([]);
  // const [selectedAppointment, setSelectedAppointment] = useState(null);
  // const history = useHistory();
  // const navigate = useNavigate();

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
        // if (status === "approved") {
        //   // Update the selected appointment and redirect to the specified page
        //   setSelectedAppointment(record);
        //   history.push("http://localhost:5000/index.html"); // Replace "/your-route" with your actual route
        // }
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  

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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
          <div>
      {/* Basic usage */}
      <button style={{ backgroundColor:'red' }} class = "button"><Link to="http://localhost:5000/index.html" style={{ color: 'white', textDecoration: 'none'}}>Close Appointments</Link></button>
     

      {/* With custom styling */}
      <button style={{ backgroundColor:'#6fb0a8' }} class = "button">  <Link to="http://localhost:5000/appointment.html" style={{ color: 'white', textDecoration: 'none'}}>Review </Link>
</button>
     
    
      
    </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="bool"> Appointments Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
