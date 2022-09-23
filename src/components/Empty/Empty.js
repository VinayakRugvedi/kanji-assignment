import PropTypes from "prop-types";
import {FaBatteryEmpty} from "react-icons/fa";

import "./Empty.css";

const propTypes = {
    textString: PropTypes.string,
    hideIcon: PropTypes.bool
};

const defaultProps = {
    textString: "Nothing was found!",
    hideIcon: false
}

const Empty = ({
    textString,
    hideIcon,
    ...props
}) => {
    return (
        <div className="custom-empty-container" {...props}>
            {!hideIcon ? <div className="empty-icon-container"><FaBatteryEmpty /></div> : null}
            <p className="empty-text">{textString}</p>
        </div>
    );
};

Empty.propTypes = propTypes;
Empty.defaultProps = defaultProps;

export default Empty;