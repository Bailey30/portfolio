import React from "react";

interface Props {
    stroke: string;
    onClick: () => void;
}
const Arrow = ({ stroke, onClick }: Props) => {
    const arrowStyle = {
        stroke: "black",
        strokeWidth: "2px",
        fill: "none",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    } as any;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.29 47.29"
            onClick={onClick}
        >
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <circle
                        style={arrowStyle}
                        cx="23.65"
                        cy="23.65"
                        r="22.65"
                    />
                    <line
                        style={arrowStyle}
                        x1="11.47"
                        y1="23.5"
                        x2="23.65"
                        y2="35.41"
                    />
                    <polyline
                        style={arrowStyle}
                        points="35.82 23.5 23.65 35.41 23.65 11.59"
                    />
                </g>
            </g>
        </svg>
    );
};

export default Arrow;
