import PropTypes from "prop-types";

import "./Button.css";

const propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

const Button = ({
    type,
    children
}) => {
    return (
        <button className={`custom-button-container custom-button-${type}`}>
            {children}
        </button>
    );
}

Button.propTypes = propTypes;

export default Button;