// Authentication Menu (login/logout/register)
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import { Button, Paper, Typography } from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';
import login from "../../../Assets/Images/login.png";
import logout from "../../../Assets/Images/logout.png";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { user: store.getState().authState.user };
    }

    public componentDidMount(): void {
        this.unsubscribe = store.subscribe(() => this.setState({ user: store.getState().authState.user }));
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
                {
                    this.state.user &&
                    <>
                        <Hidden only="xs">
                            <Paper elevation={4} className="authMenu">
                                <Typography>Hello {this.state.user.username}!</Typography>
                                <NavLink to="/logout" className="logout" exact><Button>Log out</Button></NavLink>
                            </Paper>
                        </Hidden>
                        <Hidden only={['lg', 'md', 'sm']}>
                            <NavLink to="/logout"><img src={logout} alt="logout" /></NavLink>
                        </Hidden>
                    </>
                }
                {
                    !this.state.user &&
                    <>
                        <Hidden only="xs">
                            <Paper elevation={4} className="authMenu">
                                <Typography>Hello Guest!</Typography>
                                <NavLink to="/login" exact><Button>Log in</Button></NavLink>
                            </Paper>
                        </Hidden>
                        <Hidden only={['lg', 'md', 'sm']}>
                            <NavLink to="/login"><img src={login} alt="login" /></NavLink>
                        </Hidden>
                    </>
                }

            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribe();
    }
}

export default AuthMenu;
