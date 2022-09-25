import PropTypes from "prop-types";
import {
    FaTrash,
    FaPlus
} from "react-icons/fa";

import {
    InputText,
    InputSelect,
    Empty
} from "components";
import "./Form.css";

const propTypes = {
    formData: PropTypes.object.isRequired,
    handleNameUpdate: PropTypes.func.isRequired,
    handleAddProperty: PropTypes.func.isRequired,
    propertyValuesMapping: PropTypes.object.isRequired,
    handleUpdateProperties: PropTypes.func.isRequired,
    emptyPropertiesMessage: PropTypes.string
};

const defaultProps = {
    handleNameUpdate: () => {},
    emptyPropertiesMessage: "No properties are added yet."
};

const Form = ({
    formData,
    handleNameUpdate,
    handleAddProperty,
    propertyValuesMapping,
    handleUpdateProperties,
    emptyPropertiesMessage
}) => {
    const isPropertiesPresent = Object.keys(formData.properties).length > 0;
    const isNamePresent = "name" in formData;

    const propertyNameOptions = [], propertyValueOptions = {};
    for (const [property, values] of Object.entries(propertyValuesMapping)) {
        propertyNameOptions.push({
            value: property,
            label: property[0].toUpperCase() + property.slice(1, property.length)
        });
        propertyValueOptions[property] = [];

        for (const value of values) {
            propertyValueOptions[property].push({
                value,
                label: value[0].toUpperCase() + value.slice(1, value.length)
            });
        }
    }
    
    const propertiesContent = [];
    if (isPropertiesPresent) {
        for (const [property, formPropertyValues] of Object.entries(formData.properties)) {
            const transformedPropertyValues = [];
            for (const value of formPropertyValues.values) {
                transformedPropertyValues.push({
                    value,
                    label: value[0].toUpperCase() + value.slice(1, value.length)
                });
            }

            propertiesContent.push(
                <div className="property-value-input-container">
                    <div className="input-select-wrapper">
                        <InputSelect
                            label="Property"
                            isRequired
                            placeHolder="Select..."
                            valueOptions={{
                                value: property,
                                label: property[0].toUpperCase() + property.slice(1, property.length)
                            }}
                            options={propertyNameOptions}
                            handleChange={handleUpdateProperties}
                            errorString={formPropertyValues.errorString}
                        />
                    </div>
                    <div className="input-select-wrapper">
                        <InputSelect
                            label="Values"
                            isRequired
                            placeHolder="Select..."
                            valueOptions={transformedPropertyValues}
                            options={propertyValueOptions[property]}
                            isMulti
                            handleChange={(updatedDetails) => {
                                updatedDetails.property = property;
                                handleUpdateProperties(updatedDetails);
                            }}
                        />
                    </div>
                    <div
                        className="delete-icon-container"
                        role="button"
                        onClick={() => handleUpdateProperties({
                            property,
                            values: formPropertyValues.values
                        }, true)}
                    >
                        <FaTrash />
                    </div>
                </div>
            );
        }
    } else {
        propertiesContent.push(
            <div>
                <Empty
                    hideIcon
                    textString={emptyPropertiesMessage}
                />
            </div>
        );
    }

    return (
        <form className="edit-item-form-container">
            {
                isNamePresent ? (
                    <InputText
                        label="Name"
                        isRequired
                        value={formData.name.value}
                        errorString={formData.name.errorString}
                        handleChange={handleNameUpdate}
                    />
                ) : null
            }

            <div>
                {propertiesContent}
                <div
                    className="add-property-value-container"
                    role="button"
                    onClick={handleAddProperty}
                >
                    <span className="plus-icon"><FaPlus /></span> Property
                </div>
            </div>
        </form>
    )
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;