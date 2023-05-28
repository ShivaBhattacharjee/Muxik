import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingSpinner = ({ size = 40 }) => {
  return (
    <div className="w-fit">
     <PacmanLoader color="#2764eb" size={size} />
    </div>
  );
};

export default LoadingSpinner;
