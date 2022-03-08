import { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Badge, Paper } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink, useHistory } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import jwtAxios from "../../../Services/JwtAxios";
import { vacationDeletedAction, vacationUpdatedAction } from "../../../Redux/VacationsState";
import notify from "../../../Services/Notify";
import VacationService from "../../../Services/vacationService";
import "./VacationCard.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: "300px",
        maxWidth: "350px",
        maxHeight: "5000px",
        borderRadius: "25px",
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    paper: {
        display: "inline-block",
        margin: "20px 2px",
        width: "300px",
        maxWidth: "350px",
        maxHeight: "500px",
        borderRadius: "25px",
        
    },
    toggle: {
        border: "none",
        borderRadius: "50px",
        width: "50px",
        height: "50px",
    },
    btn: {
        margin: "0 9px"
    },
    description: {
        height: "100px"
    }
  }),
);

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [selected, setSelected] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const vacationService: VacationService = new VacationService(); // Service for actions of socket.io

    useEffect(() => {

        // Block non logged-in users:
        if (!store.getState().authState.user) {
            history.push("/login");
            return;
        }

        async function getFollowers() {
            try {
                // Get the vacations with follow
                const response = await jwtAxios.get(globals.vacationsUrl + "followers");
                const followers = response.data;

                // Set the follow button to selected if the user follow this vacation
                for (let f of followers) {
                    if (f.vacationID === props.vacation.id && f.userID === store.getState().authState.user.userID) {
                        setSelected(!selected);
                    }
                }
            } catch (err) {
                notify.error(err);
            }
        }

        getFollowers();
        
    }, [])

    // Delete vacation
    async function deleteVacation() {
        try {
            const ok = window.confirm("Are you sure you want to delete vacation? ID: "  + props.vacation.id);
            if (!ok) return;
            await jwtAxios.delete<VacationModel>(globals.vacationsUrl + props.vacation.id);
            store.dispatch(vacationDeletedAction(props.vacation.id));
            vacationService.delete(props.vacation.id);
            notify.success("Vacation has been deleted. ID: " + props.vacation.id);
            history.push("/vacations");
        }
        catch (err) {
            notify.error(err);
        }
    }

    // Follow/Unfollow vacation
    async function follow() {
        
        const vacation_id = props.vacation.id;
        const user_id = store.getState().authState.user.userID;
        const followers_number = props.vacation.followersNumber;
        const follower = {
            vacationID: vacation_id,
            userID: user_id,
            followersNumber: followers_number
        };
        const currentVacation = props.vacation;

        if (!selected) {

            try {
                alert("Follow");
                const response = await jwtAxios.post(globals.vacationsUrl + "follow", follower);
                const followVacation = response.data;

                // Add to current vacation one of the number of followers
                currentVacation.followersNumber++

                store.dispatch(vacationUpdatedAction(currentVacation));

                notify.success("You are now following this vacation: " + followVacation.vacationID);
                
                setSelected(!selected);
                
                vacationService.send(store.getState().vacationsState.vacations.find(v => v.id === followVacation.vacationID));    
            
            } catch (error) {
                notify.error(error);
            }

        } else {

            try {
                alert("Unfollow");
                await jwtAxios.post(globals.vacationsUrl + "unfollow", follower);

                // Remove to current vacation one of the number of followers
                currentVacation.followersNumber--

                store.dispatch(vacationUpdatedAction(currentVacation));

                notify.success("You are now not following this vacation: " + follower.vacationID);

                setSelected(!selected);

                vacationService.send(store.getState().vacationsState.vacations.find(v => v.id === follower.vacationID));

            } catch (error) {
                notify.error(error);
            }
        }
    }

    return (
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2}>
            <Paper elevation={6} className={classes.paper}>
                <Card className={classes.root}>
                    <CardHeader
                        title={props.vacation.destination}
                        subheade={props.vacation.arrival + " - " + props.vacation.departure}
                    />
                    <CardMedia
                        className={classes.media}
                        image={globals.vacationsUrl + "images/" + props.vacation.imageName}
                        title={props.vacation.destination}
                    />
                    <CardContent>
                        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                            {props.vacation.description}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>{(props.vacation.arrival) + " - " + (props.vacation.departure)}</b>
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>Price: </b>${props.vacation.price}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                        {globals.isAdmin()? 
                        <Badge badgeContent={props.vacation.followersNumber} className={classes.btn} color="primary">
                            <FavoriteBorderIcon />
                        </Badge> : null}

                        {globals.isAdmin()? null: 
                        <ToggleButton
                            value="check"
                            selected={selected}
                            onChange={follow}
                            className={classes.toggle}
                        >
                            <Badge badgeContent={props.vacation.followersNumber} color="primary">
                                <FavoriteBorderIcon />
                            </Badge>
                        </ToggleButton>}

                        {globals.isAdmin()?
                        <NavLink to={"/vacations/edit/" + props.vacation.id}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </NavLink>: null}

                        {globals.isAdmin()?
                        <IconButton aria-label="delete" href="#" onClick={deleteVacation}>
                            <DeleteIcon />
                        </IconButton>: null}
                    </CardActions>
                </Card>
            </Paper>
        </Grid>
    );
}

export default VacationCard;