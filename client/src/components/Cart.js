import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQ,
  incrementQ,
  removeFromCart
} from "../redux/saga/Cart/cartSlice";
import Layout from "./Layout/Layout";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={item.image}
                          className="fluid rounded"
                          width={60}
                          height={60}
                          alt={item.name}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <i
                          onClick={() => dispatch(incrementQ(item))}
                          style={{ cursor: "pointer" }}
                          className="fas fa-plus"
                        ></i>
                        <span className="mx-2">{item.quantity}</span>
                        <i
                          onClick={() => dispatch(decrementQ(item))}
                          style={{ cursor: "pointer" }}
                          className="fas fa-minus"
                        ></i>
                      </td>
                      <td>${item.price}</td>
                      <td>${item.price * item.quantity}</td>
                      <td>
                        <i
                          onClick={() => dispatch(removeFromCart(item))}
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
                        {cartItems.reduce(
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
}
