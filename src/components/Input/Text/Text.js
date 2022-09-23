import {useState, useEffect} from "react";
import PropTypes from "prop-types";

import "./Text.css";

const propTypes = {
    label: PropTypes.string,
    placeHolder: PropTypes.string,
    isRequired: PropTypes.bool,
    value: PropTypes.string,
    errorString: PropTypes.string,
    handleChange: PropTypes.func
};

const defaultProps = {
    label: "",
    placeHolder: "",
    isRequired: false,
    value: "",
    errorString: "",
    handleChange: () => {}
}

const Text = ({
    label,
    placeHolder,
    isRequired,
    value,
    errorString,
    handleChange,
    ...props
}) => {
    const [textString, setTextString] = useState("");
    useEffect(() => {
        setTextString(value);
    }, [value]);

    const isErrorPresent = errorString.length > 0;

    const onChange = (event) => {
        const {value} = event.target;
        setTextString(value);
        handleChange(value);
    };

    return (
        <div className="custom-text-input-container">
            <label>
                <div className="label-text">
                    {label}
                    {isRequired && <span>*</span>}
                </div>
                <input
                    type="text"
                    onChange={onChange}
                    placeholder={placeHolder}
                    value={textString}
                    {...props}
                />
                <div className={`error-text visibility-${isErrorPresent ? "visible" : "hidden"}`}>
                    {isErrorPresent ? errorString : "placeholder"}
                </div>
            </label>
        </div>
    )
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;