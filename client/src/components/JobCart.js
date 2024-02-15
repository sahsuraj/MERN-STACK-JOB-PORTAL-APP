import React from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionJobRemoveToCart,
  ActionjobIncrementQ,
  ActionjobDecrementQ
} from "../redux/redux-without-toolkit/action";
const JobCart = () => {
  const jobData = useSelector((state) => state.jobData);

  const dispatch = useDispatch();
  return (
    <Layout>
      <div className="row my-4">
        <div className="col-md-12">
          <div className="card jobcard">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {jobData.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.company}</td>
                      <td>
                        <i
                          onClick={() => dispatch(ActionjobIncrementQ(item))}
                          style={{ cursor: "pointer" }}
                          className="fas fa-plus"
                        ></i>
                        <span className="mx-2">{item.quantity}</span>
                        <i
                          onClick={() => dispatch(ActionjobDecrementQ(item))}
                          style={{ cursor: "pointer" }}
                          className="fas fa-minus"
                        ></i>
                      </td>
                      <td>${item.price}</td>
                      <td>${item.price * item.quantity}</td>
                      <td>
                        <i
                          onClick={() => dispatch(ActionJobRemoveToCart(item))}
                          style={{ cursor: "pointer" }}
                          className="fa-solid fa-remove text-danger"
                        ></i>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th colSpan={3} className="text-center">
                      Total
                    </th>
                    <td colSpan={3} className="text-center">
                      <span className="badge bg-danger rounded-pill">
                        $
                        {jobData.reduce(
                          (accs, item) => (accs += item.price * item.quantity),
                          0
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobCart;
