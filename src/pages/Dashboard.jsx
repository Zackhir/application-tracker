import { useDispatch, useSelector } from "react-redux";
import ApplicationCard from "../components/ApplicationCard.jsx";
import { importMany } from "../features/applicationsSlice.js";
import useReveal from "../hooks/useReveal.js";

// Optional: import sample data from a public API and map it
async function fetchSample() {
  const res = await fetch("https://dummyjson.com/users?limit=6");
  const data = await res.json();
  const statuses = ["Applied", "Interviewing", "Offer", "Rejected"];
  const today = Date.now();

  return data.users.map((u, i) => ({
    company: u.company?.name || `${u.firstName} Inc.`,
    title: u.company?.title || "Frontend Developer",
    status: statuses[i % statuses.length],
    appliedDate: new Date(today - (i + 2) * 86400000)
      .toISOString()
      .slice(0, 10),
    notes: `Imported sample for ${u.firstName} ${u.lastName}`,
  }));
}

export default function Dashboard() {
  useReveal(); // 👈 enables reveal animation

  const jobs = useSelector((s) => s.applications.list);
  const dispatch = useDispatch();

  const handleImport = async () => {
    try {
      const sample = await fetchSample();
      dispatch(importMany(sample));
    } catch (e) {
      alert("Import failed. You can still add jobs manually.");
    }
  };

  const handleExport = () => {
  const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "job-applications.json";
  a.click();
  URL.revokeObjectURL(url);
};

const handleImportJson = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedJobs = JSON.parse(event.target.result);
      dispatch(importMany(importedJobs));
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
};


  return (
    <section className="stack gap">
      <div className="card">
        <div className="card-row">
  <h2>Dashboard</h2>
  <div className="flex gap-2">
    <button className="btn" onClick={handleImport}>Import Sample</button>
    <button className="btn" onClick={handleExport}>Export JSON</button>
    <label className="btn">
      Import JSON
      <input 
        type="file" 
        accept="application/json" 
        onChange={handleImportJson} 
        hidden 
      />
    </label>
  </div>
</div>

        <p className="muted">
          Track your applications. Click a card to view, edit, or delete.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty">
          <p>No applications yet.</p>
          <p className="muted">
            Use “Add Job” to create your first entry, or import samples.
          </p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <ApplicationCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}
