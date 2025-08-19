import { useEffect, useState } from "react";
import API from "../api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get("appointments/")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <div className="alert alert-info">No appointments found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Age</th>
              <th>Date</th>
              <th>Slot</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.doctor_name}</td>
                <td>{a.patient_name}</td>
                <td>{a.age}</td>
                <td>{a.appointment_date}</td>
                <td>
                  {a.slot_start} - {a.slot_end}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}