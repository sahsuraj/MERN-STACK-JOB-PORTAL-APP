import React from "react";

const JobList = ({ jobs }) => {
    return (
        <tbody className="table-group-divider" height="300">
            {
                jobs.jobs?.map((job) => (
                    <tr key={job._id}>
                        <td>{job.position}</td>
                        <td>{job.workLocation}</td>
                        <td>{job.workType}</td>
                        <td>{job.company}</td>
                    </tr>
                ))
            }
        </tbody>

    );
};

export default JobList;
