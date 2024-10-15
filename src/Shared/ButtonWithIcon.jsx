import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const ButtonWithIcon = ({ btnName,customStyle,textSize }) => {
    return (
        <p className={`flex items-center gap-2 px-6 py-3 rounded-md ${customStyle}`}>
            <span className={`text-xl font-semibold ${textSize}`}> {btnName}</span>
            <FaArrowRight />
        </p>
    );
};

export default ButtonWithIcon;