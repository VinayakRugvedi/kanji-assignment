import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./Checkbox.css";

const propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    handleOnChange: PropTypes.func
};

const defaultProps = {
    checked: false,
    label: "",
    handleOnChange: () => {}
}

const Checkbox = ({
    checked,
    label,
    handleOnChange,
    ...props
}) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const onChange = () => {
        setIsChecked((previous) => !previous);
        handleOnChange();
    };

    return (
      <div className="custom-checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className={isChecked ? "checked" : ""}
            {...props}
          />
          <span>{label}</span>
        </label>
      </div>
    )
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;