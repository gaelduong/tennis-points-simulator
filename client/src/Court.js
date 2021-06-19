import { React } from "react";

const Court = () => {
  const courtStyle = {
    fill: "#559adc",
  };
  return (
    <g id="court">
      <rect x="100" y="75" width="300" height="500" style={courtStyle} />
      <g id="court-borders">
        <path
          d="M 100 75 V 575 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
        <path
          d="M 400 75 V 575 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />

        <path
          d="M 97.5 75 H 402.5 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />

        <path
          d="M 97.5 575 H 402.5 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
      </g>

      <g id="court-double-alley-lines">
        <path
          d="M 130 75 V 575 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
        <path
          d="M 370 75 V 575 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
      </g>
      <g id="court-center-mark">
        <path
          d="M 250 75 V 85 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
        <path
          d="M 250 575 V 565 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
      </g>

      <g id="court-net">
        <path
          d="M 100 325 H 400 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
      </g>

      <g id="court-service-lines">
        <path
          d="M 130 200 H 370 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
        <path
          d="M 130 450 H 370 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
      </g>

      <g id="court-center-service-lines">
        <path
          d="M 250 325 V 200 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
        <path
          d="M 250 325 V 450 "
          stroke="#fff"
          strokeWidth="5"
          fill="transparent"
        />
      </g>
    </g>
  );
};

export default Court;
