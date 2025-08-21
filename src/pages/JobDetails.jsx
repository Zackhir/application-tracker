import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteApplication, updateApplication } from "../features/applicationsSlice.js";
import { useState } from "react";

export default function JobDetails() {
  const { id } = useParams();
  const job = useSelector((s) => s.applications.list.find((j) => j.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(job);

  if (!job) {
    return (
      <div className="card">
        <h2>Job not found</h2>
        <button className="btn" onClick={() => navigate("/dashboard")}>Back</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateApplication(form));
    navigate("/dashboard");
  };

  const handleDelete = () => {
    if (confirm("Delete this application?")) {
      dispatch(deleteApplication(job.id));
      navigate("/dashboard");
    }
  };

  return (
    <section className="card">
      <div className="card-row">
        <h2>Job Details</h2>
        <button className="btn danger" onClick={handleDelete}>Delete</button>
      </div>

      <form className="form" onSubmit={handleSave}>
        <label>
          Company
          <input name="company" value={form.company} onChange={handleChange} />
        </label>
        <label>
          Job Title
          <input name="title" value={form.title} onChange={handleChange} />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </label>
        <label>
          Applied Date
          <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} />
        </label>
        <label>
          Notes
          <textarea name="notes" rows="4" value={form.notes} onChange={handleChange} />
        </label>

        <div className="form-actions">
          <button className="btn-primary" type="submit">Save Changes</button>
        </div>
      </form>
    </section>
  );
}
