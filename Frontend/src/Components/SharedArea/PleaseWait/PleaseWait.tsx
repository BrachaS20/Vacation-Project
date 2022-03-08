import "./PleaseWait.css";
import loadingImage from "../../../Assets/Images/loadingart.gif";

function PleaseWait(): JSX.Element {
    return (
        <div className="PleaseWait">
			<img src={loadingImage} />
        </div>
    );
}

export default PleaseWait;
