import React from 'react'
import "@/styles/check-mark.css"

const AnimatedCheckMark = ({ checkedColor = "#1c1c1c", tickColor = "#fff", outerRadius = "74", innerRadius = "72" }) => {
    const styles = {
        '--checked-color': checkedColor,
        '--tick-color': tickColor,
    } as React.CSSProperties;

    return (
        <svg
            data-loader-checked
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 154 154"
            style={styles}
        >
            <g fill="none">
                <circle cx="77" cy="77" r={outerRadius} />
                <circle id="colored" cx="77" cy="77" r={innerRadius} />
                <polyline points="43.5,77.8 63.7,97.9 112.2,49.4" />
            </g>
        </svg>
    );
}

export default AnimatedCheckMark
