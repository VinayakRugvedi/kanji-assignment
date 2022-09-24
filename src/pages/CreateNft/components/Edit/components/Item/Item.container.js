import {useState, useEffect} from "react";
import PropTypes from "prop-types";

import {triggerToast} from "utils";
import {ToastTypes} from "types";
import Item from "./Item";

const propTypes = {
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    updateItemsMapping: PropTypes.func.isRequired
};

const ItemContainer = ({
    handleClose,
    item,
    updateItemsMapping
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

    const handleSave = () => {
        if (!formData.name.value || formData.name.value.length === 0) {
            triggerToast("Name cannot be empty. Please enter the name of the NFT", ToastTypes.Warning);
            return;
        }

        const updatedItem = {...item};
        updatedItem.name = formData.name.value;
        updatedItem.properties = {};

        for (const [key, value] of Object.entries(formData.properties)) {
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
        />
    );
};

ItemContainer.propTypes = propTypes;

export default ItemContainer;