import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import VacationList from "../../VacationArea/VacationList/VacationList";
import Page404 from "../../SharedArea/Page404/Page404";
import Loadable from "react-loadable";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import FollowChart from "../../VacationArea/FollowChart/FollowChart";

function Routing(): JSX.Element {
    return (
        <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/vacations" component={VacationList} exact />
            <Route path="/vacations/edit/:id" component={EditVacation} exact />
            <Route path="/vacations/new" component={AddVacation} exact />
            <Route path="/vacations/chart" component={FollowChart} exact />
            <Route path="/register" component={Loadable({ loader: () => import("../../AuthArea/Register/Register"), loading: PleaseWait })} />
            <Redirect from="/" to="/home" exact />
            <Route component={Page404} /> {/* Must be last! */}
        </Switch>
    );
}

export default Routing;
