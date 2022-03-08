import Hidden from '@material-ui/core/Hidden';
import gif from "../../../Assets/Images/vacationgif.gif";
import gif2 from "../../../Assets/Images/loadingart.gif";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <Hidden only={["xs", "sm"]}>
                <img src={gif} alt="Home" />
            </Hidden>
            <Hidden only={["md", "lg", "xl"]}>
                <img src={gif2} alt="Home" />
            </Hidden>
        </div>
    );
}

export default Home;
