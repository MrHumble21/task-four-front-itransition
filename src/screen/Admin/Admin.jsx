import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { baseURL } from "../../constant";

import NoData from "./NoData";

const listOfUsers = [];

function Admin() {
  const [allUsers, setUsers] = useState([]);
  const [fake, setFake] = useState([]);
  // const [listOfUsers, setListOfUsers] = useState([]);
  const getdata = async () => {
    await axios
      .get(baseURL + "/all_users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const asyncListUsers = async () => {
    await getdata();
  };
  useLayoutEffect(() => {
    asyncListUsers();
  });
  useEffect(() => {}, []);
  return (
    <div className="p-1 overflow-scroll container-fluid">
      <nav className="navbar">
        <form className="container-fluid  justify-content-start">
          <input type="hidden" value={fake} />
          <button
            style={{
              color: "white",
            }}
            onClick={async () => {
              if (listOfUsers.length > 0) {
                axios
                  .post(baseURL + "/delete_selected_users", {
                    selectedUsers: listOfUsers,
                  })
                  .then((res) => console.log(res));
              }

              // window.location.reload();
            }}
            className="btn rounded-5 bg-warning rounded-0 btn-sm btn-outline-secondary"
            type="button"
          >
            Delete Selected users
          </button>
          {allUsers.length > 0 && (
            <button
              style={{
                color: "white",
              }}
              onClick={() => {
                axios
                  .post(baseURL + "/delete_all")
                  .then((res) => console.log(res));

                // window.location.reload();
              }}
              className="btn rounded-5 bg-danger mx-3 rounded-0 btn-sm btn-outline-secondary"
              type="button"
            >
              Delete All users
            </button>
          )}
          <span
            onClick={() => {
              window.location.href = "/";
            }}
            className="badge rounded-5 mx-3 rounded-0 bg-info"
          >
            Logout
          </span>
        </form>
      </nav>
      <h1 className="text-center">Users managements system</h1>
      <div className="table-responsive table-responsive-sm table-responsive-md table-responsive-lg  table-responsive-xl">
        <table className="table w-100 table-hover">
          <thead>
            <tr>
              <th scope="col">
                <div className="form-check">{String("Delete  \nall")}</div>
              </th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Last login time</th>
              <th scope="col">Email</th>
              <th scope="col">registration time</th>
              <th scope="col">status</th>
              <th scope="col">Change status</th>
              <th scope="col">Delete user</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user, i) => (
                <tr key={i} className="table-light">
                  <th scope="row">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={user._id}
                        onChange={(e) => {
                          listOfUsers.push(e.target.value);
                          console.log(listOfUsers);
                        }}
                        id="flexCheckDefault"
                      />
                    </div>
                  </th>
                  <td className="">
                    <div className="d-flex  h-100 justify-content-start align-items-start">
                      {user.name}
                    </div>
                  </td>
                  <td>{user.surname}</td>
                  <td>{user.lastLogin}</td>
                  <td>{user.email}</td>

                  <td>
                    {/* {} */}
                    {String(user.time)}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        {user.status ? (
                          <span className="badge rounded-pill bg-info">
                            User is Blocked
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-success">
                            User is Open
                          </span>
                        )}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <span
                        type="button"
                        onClick={async () => {
                          await axios
                            .post(baseURL + `/block_user`, {
                              id: user._id,
                            })
                            .then((res) => {
                              console.log(res);
                            });
                          window.location.reload();
                        }}
                        className="badge rounded-pill bg-warning"
                      >
                        {user.status ? "Unblock" : "Block"}
                      </span>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <form method="post">
                      <input type="hidden" value={user.id} />
                      <span
                        onClick={async () => {
                          console.log("clicked");
                          await axios
                            .post(baseURL + `/delete_user`, { id: user._id })
                            .then((res) => {
                              console.log(res);
                            });
                          window.location.reload();
                        }}
                        type="submit"
                        className="badge rounded-pill bg-danger"
                      >
                        Delete
                      </span>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
