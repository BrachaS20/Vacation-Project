import { Component } from "react";
import { NavLink } from "react-router-dom";
import { History } from "history";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import VacationModel from "../../../Models/VacationModel";
import { vacationAddedAction, vacationsDownloadedAction } from "../../../Redux/VacationsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import VacationCard from "../VacationCard/VacationCard";
import notify from "../../../Services/Notify";
import VacationService from "../../../Services/vacationService";
import "./VacationList.css";

interface VacationListProps {
    history: History;
}

interface VacationListState {
    vacations: VacationModel[];
}

class ProductList extends Component<VacationListProps, VacationListState> {

    public follow: number[] = []; // Array for vacations that the user follows
    private vacationService: VacationService = new VacationService(); // Service for actions of socket.io

    public constructor(props: VacationListProps) {
        super(props);
        this.state = {
            vacations: store.getState().vacationsState.vacations,
        };
    }

    public async componentDidMount() {
        try {

            // Block non logged-in users:
            if(!store.getState().authState.user) {
                notify.error("You are not logged in.");
                this.props.history.push("/login");
                return;
            }

            // Connect to socket.io
            this.vacationService.connect();

            // socket.io action for Add/Update vacation
            this.vacationService.socket.on("msg-from-server", msg => {

                // Get the current vacations
                const newVacationsArr = [...this.state.vacations];

                // If The vacation taken already exist, exchanged between them
                for (let i = 0; i < newVacationsArr.length; i++) {
                    if (newVacationsArr[i].id === msg.id) {
                        newVacationsArr[i] = msg;
                        this.setState({ vacations: newVacationsArr })
                        break;
                    }
                }

                // Push the new vacation form the socket to the array only if it doesn't already exist
                if (store.getState().authState.user.username !== "admin") {
                    if (!newVacationsArr.find(v => v.id === msg.id)) {
                        newVacationsArr.push(msg);
                        this.setState({ vacations: newVacationsArr });
                        store.dispatch(vacationAddedAction(msg));
                    }
                }

            });

            // socket.io action for delete vacation
            this.vacationService.socket.on("msg-from-server2", id => {

                // Get the current vacations
                const newVacationsArr = [...this.state.vacations];

                // Delete the new vacation from the socket from the current vacations
                for (let i = 0; i < newVacationsArr.length; i++) {
                    if (newVacationsArr[i].id === id) {
                        newVacationsArr.splice(i, 1);
                        this.setState({ vacations: newVacationsArr })
                        break;
                    }
                }

            });


            // Get the vacations from database only if the state is empty
            if (this.state.vacations.length === 0) {
                try {
                    const response = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl); // response is a wrapper.                
                    this.setState({ vacations: response.data });
                    store.dispatch(vacationsDownloadedAction(response.data));    
                } catch (error) {
                    notify.error(error);
                    this.props.history.push("/logout");
                }
            }

            // Get the all the vacations that with follow
            try {
                const followers = await jwtAxios.get(globals.vacationsUrl + "followers"); // response is a wrapper.                
                const allFollowers = followers.data;
    
                // Push the vacation to array, if the user follow this vacation
                for (let f of allFollowers) {
                    if (f.userID === store.getState().authState.user.userID) {
                        this.follow.push(f.vacationID);
                    }
                }
                
                // Sort the array to get first the vacations that the user follows them
                for (let f of this.follow) {
                    const v = this.state.vacations.sort((v) => (v.id !== f) ? 1 : -1);
                    this.setState( { vacations: v })
                }
            } catch (err) {
                console.log(err);
            }

        }
        catch (err) {
            this.props.history.push("/logout");
            notify.error(err);
        }
    }


    public render(): JSX.Element {
        return (
            <div className="VacationList">
                <Grid container spacing={2}>
                    { this.state.vacations.length === 0 && <PleaseWait />}

                    <Grid item xs={2}>
                        {globals.isAdmin()?
                        <NavLink className="NewVacation" to="/vacations/new" exact>
                            <Button variant="contained" size="small">Add Vacation</Button>
                        </NavLink> : null}
                    </Grid>

                    <Grid container item xs={12}>
                        {this.state.vacations.map(v => <VacationCard vacation={v} key={v.id} />)}
                    </Grid>
                </Grid>
            </div>
        );
    }

    // public componentWillUnmount() {
    //     this.setState({ vacations: [] });
    // }

}

export default ProductList;
