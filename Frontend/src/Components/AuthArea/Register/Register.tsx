// Register
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {TextField, Button, Paper} from '@material-ui/core';
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { userRegisteredAction } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/Notify";
import "./Register.css";

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
        borderRadius: "10px",
    },
  }),
);

function Register(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const classes = useStyles();

    // Submit:
    async function submit(user: UserModel) {
        try {
            debugger;
            const response = await axios.post<UserModel>(globals.registerUrl, user);
            console.log(response);
            store.dispatch(userRegisteredAction(response.data));
            notify.success("You have been successfully registered.");
            history.push("/home");
        }
        catch (err) {
            console.log(err);
            notify.error(err);
        }
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <b>Register:</b>
            <form onSubmit={handleSubmit(submit)} className={classes.root}>
                <TextField
                    label="First Name"
                    id="firstName"
                    variant="outlined"
                    size="small"
                    {...register("firstName", {
                        required: { value: true, message: "Missing first name." },
                        minLength: { value: 2, message: "First name too short." }
                    })}
                />
                <span>{formState.errors.firstName?.message}</span>
                <br />

                <TextField
                    label="Last Name"
                    id="lastName"
                    variant="outlined"
                    size="small"
                    {...register("lastName", {
                        required: { value: true, message: "Missing last name." },
                        minLength: { value: 2, message: "Last name too short." }
                    })}
                />
                <span>{formState.errors.lastName?.message}</span>
                <br />

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
                <span>{formState.errors.username?.message}</span>
                <br />

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
                <span>{formState.errors.password?.message}</span>
                <br /><br />

                <Button variant="contained" type="submit">
                    Register
                </Button>
            </form>
        </Paper>
    );
}

export default Register;