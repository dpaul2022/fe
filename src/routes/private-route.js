import React from "react";
import { Route, Redirect } from "react-router-dom";
import Routes from "./routes";
import AuthService from "../utils/auth-service";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const redirectPath = rest.redirectPath || Routes.LOGIN;

	return (
		<Route
			{...rest}
			render={props =>
				AuthService.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: redirectPath,
							state: { from: props.location, authError: true }
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
