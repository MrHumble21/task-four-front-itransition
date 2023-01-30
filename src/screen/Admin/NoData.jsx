import React from "react";
import Lottie from "react-lottie";
import animationData from "./noo.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const NoData = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "",
        left: "30",
      }}
      className={
        "w-100 h-100 d-flex p-5 justify-content-center align-items-center"
      }
    >
      <Lottie height={500} width={600} options={defaultOptions} />
    </div>
  );
};

export default NoData;
