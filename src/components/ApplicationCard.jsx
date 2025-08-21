import { Link } from "react-router-dom";

export default function ApplicationCard({ job }) {
  return (
    <Link to={`/job/${job.id}`} className="card card-hover">
      <div className="card-row">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="company">{job.company}</p>
        </div>
        <span className={`status badge ${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>
      <div className="muted">Applied: {job.appliedDate}</div>
    </Link>
  );
}
