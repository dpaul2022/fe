import React, { useEffect, useState } from "react";
import DataService from "../../utils/data-service";
import UserTable from "./user-table";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthService from "../../utils/auth-service";
import Routes from "../../routes/routes";

const Home = ({ history }) => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = () => {
        DataService.fetchList('https://jsonplaceholder.typicode.com/users').subscribe(
            response => {
                setUsers(response)
                setIsLoading(false);
            },
            err => {
                setIsLoading(false);
                console.log(err)
            }
        )
    }

    const logout  = () => {
        AuthService.logout();
        history.push(Routes.LOGIN)
    }

    useEffect(getUsers, []);

    return (
        <div>
             <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        </Typography>
                       <Button onClick={logout} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {isLoading ? <span>Loading</span> : users.length && <UserTable rows={users}/>}
        </div>
    )
}

export default Home;