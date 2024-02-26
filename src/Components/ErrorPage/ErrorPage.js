import './Error.css'
import img from "../../Images/Error.png"

function ErrorPage(){
    return(
        <div className="error">
        <img src={img} alt="Error" />
        </div>
    );
}

export default ErrorPage;