import { useDispatch } from "react-redux";
import { addApplication } from "../features/applicationsSlice.js";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const company = form.get("company").trim();
    const title = form.get("title").trim();
    const status = form.get("status");
    const appliedDate = form.get("appliedDate");
    const notes = form.get("notes").trim();

    if (!company || !title) return alert("Company and Job Title are required.");
    dispatch(addApplication({ company, title, status, appliedDate, notes }));
    navigate("/dashboard");
  };

  return (
    <section className="card">
      <h2>Add Job</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Company
          <input name="company" placeholder="Acme Corp" required />
        </label>
        <label>
          Job Title
          <input name="title" placeholder="Frontend Developer" required />
        </label>
        <label>
          Status
          <select name="status" defaultValue="Applied">
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </label>
        <label>
          Applied Date
          <input type="date" name="appliedDate"
                 defaultValue={new Date().toISOString().slice(0,10)} />
        </label>
        <label>
          Notes
          <textarea name="notes" rows="4" placeholder="Anything notable…" />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save</button>
        </div>
      </form>
    </section>
  );
}
