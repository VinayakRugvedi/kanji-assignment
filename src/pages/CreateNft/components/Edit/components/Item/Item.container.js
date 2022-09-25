import {useState, useEffect} from "react";
import PropTypes from "prop-types";

import {triggerToast} from "utils";
import {ToastTypes} from "types";
import Item from "./Item";

const propTypes = {
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    updateItemsMapping: PropTypes.func.isRequired,
    propertyValuesMapping: PropTypes.object.isRequired
};

const ItemContainer = ({
    handleClose,
    item,
    updateItemsMapping,
    propertyValuesMapping
}) => {
    const [formData, setFormData] = useState({
        name: {
            value: "",
            errorString: ""
        },
        properties: {}
    });

    useEffect(() => {
        const formDataCopy = {};
        formDataCopy.name = {
            value: item.name,
            errorString: ""
        }
        formDataCopy.properties = {};
        for (const [key, value] of Object.entries(item.properties)) {
            formDataCopy.properties[key] = {
                values: [...value],
                errorString: ""
            };
        }

        setFormData(formDataCopy);
    }, []);

    const handleNameUpdate = (updatedName = "") => {
        let errorString = ""
        if (updatedName.length === 0) {
            errorString = "Name can't be empty."
        }
        const formDataCopy = {...formData};
        formDataCopy.name = {
            value: updatedName,
            errorString
        }
        setFormData(formDataCopy);
    };

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
        if (!formData.name.value || formData.name.value.length === 0) {
            triggerToast("Name cannot be empty. Please enter the name of the NFT", ToastTypes.Warning);
            return;
        }

        const updatedItem = {...item};
        updatedItem.name = formData.name.value;
        updatedItem.properties = {};

        for (const [key, value] of Object.entries(formData.properties)) {
            if (value.values.length === 0) {
                triggerToast(`A property value can't be left empty. Please add a value for ${key.toUpperCase()} property.`, ToastTypes.Warning);
                return;
            }
            updatedItem.properties[key] = value.values;
        }

        const updatedItemMapping = {
            [item.id] : updatedItem
        };

        updateItemsMapping(updatedItemMapping);
    };

    return (
        <Item
            handleClose={handleClose}
            item={item}
            formData={formData}
            handleNameUpdate={handleNameUpdate}
            handleSave={handleSave}
            handleAddProperty={handleAddProperty}
            propertyValuesMapping={propertyValuesMapping}
            handleUpdateProperties={handleUpdateProperties}
        />
    );
};

ItemContainer.propTypes = propTypes;

export default ItemContainer;