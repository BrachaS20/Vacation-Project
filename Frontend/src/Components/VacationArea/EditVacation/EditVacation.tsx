import { Paper, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import { vacationUpdatedAction } from "../../../Redux/VacationsState";
import VacationService from "../../../Services/vacationService";
import "./EditVacation.css";

// interface containing the route parameters.
// The exact route params in the Routing must be here as string variables:
interface RouteParams {
    id: string;
}

// Our props interface must extends the following:
interface EditVacationProps extends RouteComponentProps<RouteParams> {
    vacation: VacationModel;
}

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
            padding: "10px",
            margin: "0 auto",
            alignItems: "center",
            borderRadius: "10px"
        },
        input: {
            display: 'none',
        },
    }),
);


function EditVacation(props: EditVacationProps): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const classes = useStyles();
    const id = +props.match.params.id;
    const [vacationState, setVacationState] = useState<VacationModel>(store.getState().vacationsState.vacations.find(v => v.id === id));
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
        
        // Get one vacation by the id in the route
        (async () => {
            if(vacationState === undefined){
                const response = await jwtAxios.get<VacationModel>(globals.vacationsUrl + id);
                const vacation = response.data
                setVacationState(vacation);
            }
        })()

    }, [])

    async function editVacation(vacation: VacationModel) {
        try {
            const id = +props.match.params.id;
            const response = await jwtAxios.put<VacationModel>(globals.vacationsUrl + id, VacationModel.convertToFormData(vacation));
            const updatedVacation = response.data;
            updatedVacation.followersNumber = vacationState.followersNumber; // update the followers number by the state
            store.dispatch(vacationUpdatedAction(updatedVacation));
            vacationService.send(updatedVacation); // send to socket service
            notify.success("Vacation has been updated. ID: " + id);
            history.push("/vacations");
        } catch (err) {
            notify.error(err);
            // history.push("/logout");
        }
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <b>Edit Vacation:</b>
            { vacationState &&
                <form onSubmit={handleSubmit(editVacation)} className={classes.root}>
                    <TextField
                        defaultValue={vacationState.destination}
                        autoFocus
                        label="Destination"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        {...register("destination", { required: true, minLength: 5, maxLength: 50 })}
                    />
                    {formState.errors.destination?.type === "required" && <span><br /> Missing destination.</span>}
                    {formState.errors.destination?.type === "minLength" && <span><br />Destination too short.</span>}
                    {formState.errors.destination?.type === "maxLength" && <span><br />Destination too long.</span>}
                    <br />

                    <TextField 
                        defaultValue={vacationState.description}
                        label="Description"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        {...register("description", { required: true, minLength: 5, maxLength: 250 })}
                    />
                    {formState.errors.description?.type === "required" && <span><br /> Missing description.</span>}
                    {formState.errors.description?.type === "minLength" && <span><br /> Description too short.</span>}
                    {formState.errors.description?.type === "maxLength" && <span><br /> Description too long.</span>}
                    <br />

                    <TextField
                        defaultValue={(vacationState.arrival).slice(0, 10)}
                        id="datetime-local"
                        label="Arrival"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("arrival", { required: true, minLength: 5 })}
                    />
                    {formState.errors.arrival?.type === "required" && <span><br /> Missing arrive vacation.</span>}
                    {formState.errors.arrival?.type === "minLength" && <span><br /> Arrive vacation too short.</span>}
                    <br />

                    <TextField
                        defaultValue={(vacationState.departure).slice(0, 10)}
                        id="datetime-local"
                        label="Departure"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("departure", { required: true, minLength: 5 })}
                    />
                    {formState.errors.departure?.type === "required" && <span><br /> Missing description.</span>}
                    {formState.errors.departure?.type === "minLength" && <span><br /> Depart Vacation too short.</span>}
                    <br />

                    <TextField
                        defaultValue={vacationState.price}
                        label="Price"
                        type="number"
                        size="small"
                        variant="outlined"
                        {...register("price", { required: true, minLength: 0 })}
                    />
                    {formState.errors.price?.type === "required" && <span><br /> Missing price.</span>}
                    {formState.errors.price?.type === "min" && <span><br /> Price can't be negative.</span>}
                    <br />

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
                        Save Changes
                    </Button>

                </form>
            }
        </Paper>
    );
}

export default EditVacation;