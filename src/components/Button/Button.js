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
        <div className="custom-button-container">
            <button 
                className={`custom-button custom-button-${type}`}
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}

Button.propTypes = propTypes;

export default Button;