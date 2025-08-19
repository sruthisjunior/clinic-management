import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("doctors/")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Doctors</h2>
      {doctors.length === 0 ? (
        <div className="alert alert-info">No doctors found.</div>
      ) : (
        <div className="row">
          {doctors.map((doc) => (
            <div className="col-md-4 mb-3" key={doc.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{doc.name}</h5>
                  <p className="card-text text-muted">{doc.speciality}</p>
                  <Link
                    to={'/book/${doc.id}'}
                    className="btn btn-sm btn-success"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}