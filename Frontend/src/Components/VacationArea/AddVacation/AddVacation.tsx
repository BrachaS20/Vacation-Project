import { useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import VacationModel from "../../../Models/VacationModel";
import { vacationAddedAction } from "../../../Redux/VacationsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import VacationService from "../../../Services/vacationService";
import "./AddVacation.css";

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
            marginTop: "15px",
            borderRadius: "10px"
        },
        input: {
            display: 'none',
        },
    }),
);


function AddVacation(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const classes = useStyles();
    const vacationService: VacationService = new VacationService(); // Service for actions of socket.io

    useEffect(() =>  {

        // Block non logged-in users:
        if(!store.getState().authState.user) {
            notify.error("You are not logged in.");
            history.push("/login");
            return;
        }

        // Block non admin
        if (store.getState().authState.user.username !== "admin") {
            history.push("/vacations");
            return;
        }
        
    }, [])


    async function addVacation(vacation: VacationModel) {
        try {
            const response = await jwtAxios.post<VacationModel>(globals.vacationsUrl, VacationModel.convertToFormData(vacation));
            const addedVacation = response.data; // The added product in the backend.
            addedVacation.followersNumber = 0; // insert 0 to followers number as starting value
            store.dispatch(vacationAddedAction(addedVacation));
            vacationService.send(addedVacation); // send to socket service 
            notify.success("Vacation has been added. ID: " + addedVacation.id);
            history.push("/vacations"); // Go to that route!
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <b>Add New Vacation:</b>
            <form onSubmit={handleSubmit(addVacation)} className={classes.root}>
                <TextField
                    autoFocus
                    label="Destination"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    {...register("destination", { required: true, minLength: 5, maxLength: 50 })}
                />
                {formState.errors.destination?.type === "required" && <span>Missing destination.</span>}
                {formState.errors.destination?.type === "minLength" && <span>Destination too short.</span>}
                {formState.errors.destination?.type === "maxLength" && <span>Destination too long.</span>}
                <br />

                <TextField 
                    label="Description"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    {...register("description", { required: true, minLength: 5, maxLength: 250 })}
                />
                {formState.errors.description?.type === "required" && <span>Missing description.</span>}
                {formState.errors.description?.type === "minLength" && <span>Description too short.</span>}
                {formState.errors.description?.type === "maxLength" && <span>Description too long.</span>}
                <br />

                <TextField
                    id="datetime-local"
                    label="Arrival"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("arrival", { required: true, minLength: 5 })}
                />
                {formState.errors.arrival?.type === "required" && <span>Missing arrive vacation.</span>}
                {formState.errors.arrival?.type === "minLength" && <span>Arrive vacation too short.</span>}
                <br />

                <TextField
                    id="datetime-local"
                    label="Departure"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    {...register("departure", { required: true, minLength: 5 })}
                />
                {formState.errors.departure?.type === "required" && <span>Missing description.</span>}
                {formState.errors.departure?.type === "minLength" && <span>Depart Vacation too short.</span>}
                <br />

                <TextField
                    label="Price"
                    type="number"
                    size="small"
                    variant="outlined"
                    {...register("price", { required: true, minLength: 0 })}
                />
                {formState.errors.price?.type === "required" && <span>Missing price.</span>}
                {formState.errors.price?.type === "min" && <span>Price can't be negative.</span>}
                <br /><br />

                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" size="small">
                        Upload Image
                    </Button>
                </label>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    {...register("image", { required: true })}
                />
                {formState.errors.image?.type === "required" && <span><br /> Missing image.</span>}
                <br /><br />

                <Button variant="outlined" color="primary" type="submit" size="small">
                    Add Vacation
                </Button>
            </form>
        </Paper>
    );
}

export default AddVacation;