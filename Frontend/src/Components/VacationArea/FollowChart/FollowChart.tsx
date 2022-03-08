import { Component } from "react";
import { Bar } from 'react-chartjs-2';
import { History } from "history";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import VacationModel from "../../../Models/VacationModel";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import "./FollowChart.css";

interface FollowChartProps {
    history: History;
}

interface FollowChartState {
    vacations: VacationModel[];
    labels: number[]; // the labels of the chart
    data: number[]; // the data of the chart
}

class FollowChart extends Component<FollowChartProps, FollowChartState> {

    public vacations_id: number[] = [];
    public followers: number[] = [];

    constructor(props: FollowChartProps) {
        super(props);
        this.state = {
            vacations: store.getState().vacationsState.vacations,
            labels: store.getState().vacationsState.vacations.map(v => {return v.id}),
            data: store.getState().vacationsState.vacations.map(v => {return v.followersNumber})
        }
    }

    public async componentDidMount() {
        try {

            // Block non logged-in users:
            if(!store.getState().authState.user) {
                notify.error("You are not logged in.");
                this.props.history.push("/login");
                return;
            }

            // Block non admin
            if (store.getState().authState.user.username !== "admin") {
                this.props.history.push("/vacations");
                return;
            }

            if (this.state.vacations.length === 0) {
                try {
                    const allVacations = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl);
                    store.dispatch(vacationsDownloadedAction(allVacations.data));
                    this.setState({ vacations: allVacations.data });    
                } catch (error) {
                    notify.error(error);
                }
            }

            // If the vacation has followers, push to array to display in the chart
            for (let v of this.state.vacations) {
                if (v.followersNumber > 0) {
                    this.vacations_id.push(v.id);
                    this.followers.push(v.followersNumber);
                    this.setState({ labels: this.vacations_id, data: this.followers });
                }       
            }

        }
        catch (err) {
            console.log(err);
            notify.error(err);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="FollowChart">
                <h1>Vacations's Follow Report</h1>
                <Bar
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                label: 'Followers Number Per Vacation',
                                data: this.state.data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                ],
                                borderWidth: 2,
                            }
                        ]        
                    }}
                    options={{
                        scales:{
                            yAxes:{
                                ticks:{
                                    precision: 0
                                }
                            }
                        }

                    }}
                />
            </div>
        );
    }
}

export default FollowChart;