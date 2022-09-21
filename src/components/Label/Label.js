import PropTypes from "prop-types";

import "./Label.css";

const propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired
};

const defaultProps = {
    type: "success"
};

const Label = ({
    type,
    children
}) => {
    return (
        <span className={`custon-label-container custom-label-${type}`}>
            {children}
        </span>
    );
}

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;