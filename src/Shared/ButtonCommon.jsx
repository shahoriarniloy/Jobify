import React from 'react';
import { FaArrowRight } from "react-icons/fa";
const ButtonCommon = ({ btnName, customStyle }) => {
    return (
        <p className={`btn bg-transparent link-color rounded-none border-[#197ef083]`}>
            {btnName}
            <FaArrowRight/>
        </p>
    );
};

export default ButtonCommon;