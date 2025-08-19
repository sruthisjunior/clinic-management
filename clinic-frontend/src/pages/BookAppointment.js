import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function BookAppointment() {
  const { id } = useParams();
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    API.get('slots/?doctor=${id}')
      .then((res) => setSlots(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("appointments/", {
        patient_name: patientName,
        age,
        appointment_date: date,
        doctor: id,
        slot,
      });
      setSuccess("Appointment booked successfully!");
      setError("");
      setPatientName("");
      setAge("");
      setDate("");
      setSlot("");
    } catch (err) {
      setError("Booking failed. Please check the details.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Appointment</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input
            type="text"
            className="form-control"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Slot</label>
          <select
            className="form-select"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
          >
            <option value="">-- Select Slot --</option>
            {slots.map((s) => (
              <option key={s.id} value={s.id}>
                {s.start_time} - {s.end_time}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
}