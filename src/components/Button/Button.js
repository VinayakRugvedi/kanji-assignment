import PropTypes from "prop-types";

import "./Button.css";

const propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    handleClick: PropTypes.func.isRequired
};

const Button = ({
    type,
    children,
    handleClick,
    ...props
}) => {
    return (
        <button 
            className={`custom-button-container custom-button-${type}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = propTypes;

export default Button;