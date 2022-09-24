import PropTypes from "prop-types";

import "./SidePanel.css";

const propTypes = {
    children: PropTypes.node.isRequired
};

const SidePanel = ({
    children
}) => {
    return (
        <div className="custom-side-panel-container">
            <div className="custom-side-panel-content">
                {children}
            </div>
        </div>
    )
};

SidePanel.propTypes = propTypes;

export default SidePanel;