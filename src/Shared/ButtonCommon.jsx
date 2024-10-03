import React from 'react';

const ButtonCommon = ({ btnName, customStyle }) => {
    return (
        <p className={`px-6 py-3 rounded-md ${customStyle}`}>
            {btnName}
        </p>
    );
};

export default ButtonCommon;