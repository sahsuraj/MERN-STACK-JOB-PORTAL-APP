import React from "react";
import { ActionJobAddToCart } from "../redux/redux-without-toolkit/action";
import { useDispatch } from "react-redux";

const JobList = ({ jobs }) => {
  const dispatch = useDispatch();
  return (
    <tbody className="table-group-divider" height="300">
      {jobs.jobs?.map((job) => (
        <tr key={job._id}>
          <td>{job.position}</td>
          <td>{job.workLocation}</td>
          <td>{job.workType}</td>
          <td>{job.company}</td>
          <td>
            <button
              onClick={() => {
                let item = null;
                item = { ...job, quantity: 1 };
                dispatch(ActionJobAddToCart(item));
              }}
              className="btn btn-primary"
            >
              {" "}
              Add to Job Cart
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default JobList;
