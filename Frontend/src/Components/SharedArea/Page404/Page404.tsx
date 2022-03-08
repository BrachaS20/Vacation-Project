import Hidden from '@material-ui/core/Hidden';
import gif from "../../../Assets/Images/error.gif";
import "./Page404.css";

function Page404(): JSX.Element {
    return (
        <div className="Page404">

            <Hidden only={["xs", "sm"]}>
                <img src={gif} alt="Not Found." />
            </Hidden>
            <p>The page you are looking for, not found.</p>

        </div>
    );
}

export default Page404;
