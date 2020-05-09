import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from "../node_modules/react-router-dom";
import { LoginForm } from "./components/login_form";
import { RegisterForm } from "./components/register_form";
import UsersList from "./components/users";
import PrivateRoute from "./components/privateRoute";

function App() {
    return (
        <Router>
            <div className="App">
                <Link to="/login">Login</Link>
                <Link to="/users">User List</Link>
                <Link to="/register">Register</Link>

                <Switch>
                    <PrivateRoute exact path="/users" component={UsersList} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route component={RegisterForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
