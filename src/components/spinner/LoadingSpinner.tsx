import {Triangle} from "react-loader-spinner";
function LoadingSpinner() {

    return (
        <div className="my-5">
            <div className="loader gap-4">
                <Triangle
                    height={100}
                    width={100}
                    color="#FFF"/>
                <div>Loading...</div>
            </div>
        </div>
    )
}

export default LoadingSpinner