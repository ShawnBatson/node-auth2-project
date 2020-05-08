import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../App.css";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() =>
        axiosWithAuth()
            .get("/users")
            .then((res) => {
                console.log("this is in users", res.data);
                setUsers(res.data);
            })
    );

    const logout = () => {
        localStorage.removeItem("token");
    };

    return (
        <div>
            <div className="userCard">
                {users.map((user) => (
                    <div className="individualCard">
                        <h1 className="userCardWriting">{user.name}</h1>
                        <h2 className="userCardWriting">{user.department}</h2>
                    </div>
                ))}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default UsersList;
