import axios from "axios";
import { useState, useEffect } from "react";

export default function Alldata() {
  let [data, setData] = useState([]);
  let [editId, setEditId] = useState(null);
  let [editUser, setEditUser] = useState({ name: "", email: "", password: "", amount: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let result = await axios.get("http://localhost:8080/data");
    setData(result.data);
  }

  async function handleDelete(id) {
    await axios.delete(`http://localhost:8080/delete/${id}`);
    fetchData();
  }

  function handleEdit(user) {
    setEditId(user._id);
    setEditUser(user);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await axios.put(`http://localhost:8080/update/${editId}, editUser`);
    setEditId(null);
    fetchData();
  }

  return (
    <>
      <h1>ALL DATA</h1>
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>E-MAIL</th>
            <th>PASSWORD</th>
            <th>BALANCE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.amount}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editId && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={editUser.password}
            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
            placeholder="Password"
          />
          <input
            type="number"
            value={editUser.amount}
            onChange={(e) => setEditUser({ ...editUser, amount: e.target.value })}
            placeholder="Balance"
          />
          <button type="submit">Update</button>
        </form>
      )}
    </>
  );
}
