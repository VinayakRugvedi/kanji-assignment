import {useState} from "react";
import PropTypes from "prop-types";

import {triggerToast} from "utils";
import {ToastTypes} from "types";
import Items from "./Items";

const propTypes = {
    handleClose: PropTypes.func.isRequired,
    selectedItemsMapping: PropTypes.object.isRequired,
    updateItemsMapping: PropTypes.func.isRequired,
    propertyValuesMapping: PropTypes.object.isRequired
};

const ItemsContainer = ({
    handleClose,
    selectedItemsMapping,
    updateItemsMapping,
    propertyValuesMapping
}) => {
    const [formData, setFormData] = useState({properties: {}})

    const handleAddProperty = () => {
        let canAddNewProperty = false;
        const formDataCopy = {...formData};
        for (let property of Object.keys(propertyValuesMapping)) {
            if (property in formDataCopy.properties) continue;
            else {
                canAddNewProperty = true;
                formDataCopy.properties[property] = {
                    values: [propertyValuesMapping[property][0]],
                    errorString: ""
                };
                break;
            }
        }

        if (canAddNewProperty) {
            setFormData(formDataCopy);
        } else {
            triggerToast("You don't have any new properties to add.", ToastTypes.Warning);
        }
    };

    const handleUpdateProperties = (updatedPropertyAndValues, shouldDelete = false) => {
        const formDataCopy = {...formData};
        if (shouldDelete) {
            delete formDataCopy.properties[updatedPropertyAndValues.property];
        } else {
            // This "if" is for when the property name is changed
            if (updatedPropertyAndValues.fromProperty) {
                if (updatedPropertyAndValues.fromProperty === updatedPropertyAndValues.toProperty) {
                    return;
                }

                let isNewProperty = true;
                for (const property of Object.keys(formDataCopy.properties)) {
                    if (property === updatedPropertyAndValues.toProperty) {
                        isNewProperty = false;
                        triggerToast(`Can't select the ${property.toUpperCase()} property as it has been already added.`, ToastTypes.Warning);
                        formDataCopy.properties[updatedPropertyAndValues.fromProperty].errorString = `${property.toUpperCase()} is already added.`
                    }
                }

                if (isNewProperty) {
                    delete formDataCopy.properties[updatedPropertyAndValues.fromProperty];
                    formDataCopy.properties[updatedPropertyAndValues.toProperty] = {
                        errorString: "",
                        values: []
                    }
                }
            } else {
                // This "else" is for when the property values have changed
                const errorString = updatedPropertyAndValues.values.length === 0 ? "Value can't empty." : "";
                formDataCopy.properties[updatedPropertyAndValues.property].errorString = errorString;
                formDataCopy.properties[updatedPropertyAndValues.property].values = updatedPropertyAndValues.values;
            }
        }

        setFormData(formDataCopy);
    };

    const handleSave = () => {
        const selectedItemsMappingCopy = {...selectedItemsMapping};
        const updatedProperties = {};

        for (const [key, value] of Object.entries(formData.properties)) {
            if (value.values.length === 0) {
                triggerToast(`A property value can't be left empty. Please add a value for ${key.toUpperCase()} property.`, ToastTypes.Warning);
                return;
            }
            updatedProperties[key] = value.values;
        }

        for (const key in selectedItemsMappingCopy) {
            selectedItemsMappingCopy[key].properties = updatedProperties;
        }
        updateItemsMapping(selectedItemsMappingCopy);
    };

    return (
        <Items
            propertyValuesMapping={propertyValuesMapping}
            selectedItemsMapping={selectedItemsMapping}
            formData={formData}
            handleClose={handleClose}
            handleAddProperty={handleAddProperty}
            handleUpdateProperties={handleUpdateProperties}
            handleSave={handleSave}
        />
    );
};

ItemsContainer.propTypes = propTypes;

export default ItemsContainer;