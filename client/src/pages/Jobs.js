import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { GET_JOB } from "../utils/constant";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/shared/Spinner";
import JobList from "../components/JobList";

const Job = () => {
    const [jobs, setJobs] = useState("");
    const [sorts, setSortOrder] = useState("newest");
    const [search, setSearch] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setcurrentPage] = useState(1);
    const dispatch = useDispatch();
    const selectRef = useRef();

    //redux state
    const { loading } = useSelector((state) => state.alerts);

    const getJobs = async () => {
        try {
            dispatch(showLoading());
            //GET API REQUEST
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                token: localStorage.getItem("token")
            };
            const PARAMS = {
                sort: sorts,
                search: search,
                page: currentPage,
                limit: 10
            };

            await axios
                .get(GET_JOB, {
                    params: PARAMS,
                    headers
                })
                .then((res) => {
                    setJobs(res.data);
                    setPageCount(res.data.pageCount);
                })

                .catch((err) => {
                    console.log(err.message);
                });

            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    //function for Sort
    const handleSort = (event) => {
        const selectedProperty = selectRef.current.value;
        setSortOrder(selectedProperty);
    };

    //function for search
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        getJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorts, search, currentPage]);


    const handlePageClick = (e) => {
        setcurrentPage(e.selected + 1);
    };

    return (
        <Layout>
            <div className="row p-5">
                <div className="col-sm-6 card  jobcard">
                    <div className="container text-center">
                        <div className="row align-items-start p-3">
                            <div className="col">
                                <label>
                                    Sort By:
                                    <select
                                        ref={selectRef}
                                        onChange={handleSort}
                                        defaultValue={sorts}
                                        className="job-select"
                                    >
                                        <option value="latest">Sort by Date (Asc)</option>
                                        <option value="oldest">Sort by Date (Desc)</option>
                                        <option value="a-z">Sort by Position (Asc)</option>
                                        <option value="z-a">Sort by Pposition (Desc)</option>
                                    </select>
                                </label>
                            </div>
                            <div className="col">
                                <label>
                                    Search By Position:
                                    <input
                                        onChange={handleSearch}
                                        value={search}
                                        className="job-select"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table " height="300">
                            <thead>
                                <tr>
                                    <th scope="col">Position</th>
                                    <th scope="col">workLocation</th>
                                    <th scope="col">workType</th>
                                    <th scope="col">company</th>
                                </tr>
                            </thead>

                            {loading ? <Spinner /> : <JobList jobs={jobs} />}
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                                marginPagesDisplayed={2}
                                containerClassName="pagination justify-content-center"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                                forcePage={currentPage - 1}
                            />
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Job;
