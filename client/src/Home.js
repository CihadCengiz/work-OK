import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Job from "./Job";
import Volunteer from "./Volunteer";
import useFetchJobs from "./useFetchJobs";
import useFetchVol from "./useFetchVol";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [params] = useState({});
  const page = 0;
  const size = 5;
  const [location] = useState([]);
  const { jobs, loading, error } = useFetchJobs(params, page, size, location);
  const { volunteers } = useFetchVol(params, page, size, location);

  return (
    <Container fluid className="my-4">
        <div className="d-flex justify-content-between">
          <h4 className="text-muted hometitle d-sm-block pt-1">Internship offers</h4>
          <Link to="/internships" className="link d-none d-sm-block">View More</Link>
        </div>
          {jobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })}
        <div className="d-flex justify-content-center">
          {loading && (
            <ClipLoader color={"#36D7B7"} loading={loading} size={100} />
          )}
          {error && <h1>Error...</h1>}
        </div>
    </Container>
  );
}
