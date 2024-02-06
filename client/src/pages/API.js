import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi, fetchApiAll } from "../redux/saga/apiSlice";
import Layout from "../components/Layout/Layout";

const API = () => {
  const dispatch = useDispatch();
  const userId = 2;
  const { data, /* allRecords, */ loading, error } = useSelector(
    (state) => state.apis
  );

  useEffect(() => {
    dispatch(fetchApi(userId));
    dispatch(fetchApiAll());
  }, [dispatch, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <Layout>
      <div>
        <h2>{data.name}</h2>
        <p>Email: {data.email}</p>
      </div>
    </Layout>
  );
};

export default API;
