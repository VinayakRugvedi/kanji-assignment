import PropTypes from "prop-types";
import ReactSelect from "react-select";

import "./Select.css";

const propTypes = {
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    errorString: PropTypes.string,
    handleChange: PropTypes.func,
    valueOptions: PropTypes.array.isRequired,
    isMulti: PropTypes.bool,
    options: PropTypes.array.isRequired
};

const defaultProps = {
    label: "",
    isRequired: false,
    placeHolder: "Select from options...",
    errorString: "",
    handleChange: () => {},
    isMulti: false
}

const ActionTypes = {
    SelectOption: "select-option",
    RemoveValue: "remove-value",
    Clear: "clear"
};

const Select  = ({
    label,
    isRequired,
    placeHolder,
    valueOptions,
    errorString,
    handleChange,
    options,
    isMulti,
    ...props
}) => {
    const isErrorPresent = errorString.length > 0;

    const onChange = (selectedOption, actionMeta) => {
        let updatedDetails;
        if (actionMeta.action === ActionTypes.SelectOption) {
            if (isMulti) {
                updatedDetails = {values: []};
                for (const option of selectedOption) {
                    updatedDetails.values.push(option.value);
                }
            } else {
                updatedDetails = {
                    fromProperty: valueOptions.value,
                    toProperty: selectedOption.value,
                };
            }
        } else if (actionMeta.action === ActionTypes.RemoveValue) {
            updatedDetails = {
                values: []
            };
            if (valueOptions.length > 1) {
                for (const valueOption of valueOptions) {
                    if (valueOption.value !== actionMeta.removedValue.value) {
                        updatedDetails.values.push(valueOption.value);
                    }
                }
            }
        } else if (actionMeta.action === ActionTypes.Clear) {
            updatedDetails = {
                values: []
            };
        }
        
        handleChange(updatedDetails);
    };

    return (
        <div className="custom-select-input-container">
            <label>
                <div className="label-text">
                    {label}
                    {isRequired && <span>*</span>}
                </div>
                <ReactSelect
                    classNamePrefix="react-select"
                    value={valueOptions}
                    onChange={onChange}
                    placeholder={placeHolder}
                    options={options}
                    isMulti={isMulti}
                    {...props}
                />
                <div className={`error-text visibility-${isErrorPresent ? "visible" : "hidden"}`}>
                    {isErrorPresent ? errorString : "placeholder"}
                </div>
            </label>
        </div>
    );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
