import React from "react";
import { Route, Redirect } from "react-router-dom";
import Routes from "./routes";
import AuthService from "../utils/auth-service";

const PublicRoute = ({ component: Component, ...rest }) => {
	const redirectPath = rest.redirectPath || Routes.HOME;
	return (
		<Route
			{...rest}
			render={props =>
				!AuthService.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: redirectPath }} />
				)
			}
		/>
	);
};

export default PublicRoute;
