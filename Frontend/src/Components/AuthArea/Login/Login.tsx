// Login
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {TextField, Button, Paper} from '@material-ui/core';
import store from "../../../Redux/Store";
import { userLoggedInAction } from "../../../Redux/AuthState";
import globals from "../../../Services/Globals";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/Notify";
import "./Login.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
      '& > *': {
        width: theme.spacing(16),
        margin: "0 auto",
      },
    },
    paper: {
        width: "250px",
        padding: "15px",
        margin: "0 auto",
        marginTop: "20px",
        borderRadius: "10px"
    },
    paper2: {
        padding: "10px",
        margin: "0 auto",
        marginTop: "20px",
        borderRadius: "10px"
    },
    button: {
        marginTop: "10px",
        textDecoration: "none",
    }
  }),
);


function Login(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const classes = useStyles();

    // Submit:
    async function login(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.loginUrl, credentials);
            store.dispatch(userLoggedInAction(response.data));
            notify.success("Logged-in successfully.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <b>Log In:</b>
            <form onSubmit={handleSubmit(login)} className={classes.root}>

                <TextField
                    label="Username"
                    id="username"
                    variant="outlined"
                    size="small"
                    {...register("username", {
                        required: { value: true, message: "Missing username." },
                        minLength: { value: 4, message: "Username too short." }
                    })}
                />
                <br /><span>{formState.errors.username?.message}</span>

                <TextField
                    label="Password"
                    id="password"
                    variant="outlined"
                    size="small"
                    type="password"
                    {...register("password", {
                        required: { value: true, message: "Missing password." },
                        minLength: { value: 4, message: "Password too short." }
                    })}
                />
                <br /><span>{formState.errors.password?.message}</span>
                <br />

                <Button variant="contained" type="submit">
                    Log In
                </Button>
            </form>
            <Paper elevation={6} className={classes.paper2}>
                <b>New User? <br />
                    Go to registration! <br />
                </b>
                <NavLink to="/register" className={classes.button}>
                        <Button>Register</Button>
                </NavLink>
            </Paper>

        </Paper>
    );
}

export default Login;