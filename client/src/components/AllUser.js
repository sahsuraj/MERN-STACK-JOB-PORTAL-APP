import React from "react";
const AllUser = ({ users, handleRemoveCallBack, handleEditCallBack }) => {
  //callback function to send data to parent component
  const sendCallBackRemoveToParent = (data) => {
    handleRemoveCallBack(data);
  };
  const sendCallBackEditToParent = (data) => {
    handleEditCallBack(data);
  };

  return (
    <tbody className="table-group-divider" height="300">
      {users.users?.map((user, index) => (
        <tr key={user._id} id={index}>
          <td>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.location}</td>
          <td>
            <span>
              <i
                className="fa-solid fa-edit text-primary"
                variant="warning"
                onClick={() => sendCallBackEditToParent(user)}
              ></i>
            </span>
            ||
            <span>
              <i
                onClick={() => sendCallBackRemoveToParent(user._id)}
                style={{ cursor: "pointer" }}
                className="fa-solid fa-remove text-danger"
              ></i>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AllUser;
