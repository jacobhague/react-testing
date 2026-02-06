import React, { useState } from "react";


const Button = () => {

    const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
    ]

    const [colorIndex, setColorIndex] = useState(0);

    const getButtonClassName = (colorIndex: any) => { return "btn btn-" + colors[colorIndex] }

    const onClick = () => {

        let newColorIndex = colorIndex + 1;
        newColorIndex = newColorIndex % 8;
        setColorIndex(newColorIndex);
        

    }

    return(
        <button className={getButtonClassName(colorIndex)} onClick={onClick}>
            {colors[colorIndex]}
        </button>
    )
}

export default Button