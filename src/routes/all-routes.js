import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import  Routes  from "./routes";
import PublicRoute from "./public-route";
import PrivateRoute from "./private-route.js";
import Login from '../components/login/login';
import Home from '../components/home/home';

const AllRoutes = () => {
    return (
        <Router>
        <React.Fragment>
            <Route >
                <Switch>
                    <PrivateRoute  path={Routes.HOME} component={Home}/>
                    <PublicRoute exact path={Routes.LOGIN} component={Login}/>
                    <Redirect to={Routes.LOGIN}/>
                </Switch>
            </Route>
        </React.Fragment>
    </Router>

    );
};

export default AllRoutes;
