import React from 'react';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import BarChartIcon from '@material-ui/icons/BarChart';
import "./Menu.css";

const useStyles = makeStyles({
  root: {
      width: 400,
  },
});

function Menu(): JSX.Element {

  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            event.preventDefault();
            setValue(newValue);
        }}
        className={classes.root}
    >
      <BottomNavigationAction onClick={() => {history.push("/home")}} label="Home" value="Home" icon={<HomeIcon />} />
      <BottomNavigationAction onClick={() => {history.push("/register")}} label="Register" value="Register" icon={<AccountCircleIcon />} />
      <BottomNavigationAction onClick={() => {history.push("/vacations")}} label="Vacations" value="Vacations" icon={<BeachAccessIcon />} />
      <BottomNavigationAction onClick={() => {history.push("/vacations/chart")}} label="Chart" value="Chart" icon={<BarChartIcon />} />
    
    </BottomNavigation>
  );
}

export default Menu;