import PropTypes from "prop-types";

import {
    Item,
    Items
} from "./components";

const propTypes = {
    canEdit: PropTypes.bool.isRequired,
    handleCanEdit: PropTypes.func.isRequired,
    selectedItemsMapping: PropTypes.object.isRequired,
    updateItemsMapping: PropTypes.func.isRequired,
    propertyValuesMapping: PropTypes.object.isRequired
};

const Edit = ({
    canEdit,
    handleCanEdit,
    selectedItemsMapping,
    updateItemsMapping,
    propertyValuesMapping
}) => {
    const isSingleItem = Object.keys(selectedItemsMapping).length === 1;
    const isMultipleItems = Object.keys(selectedItemsMapping).length > 1;

    let item = {}
    if (isSingleItem) {
        for (let key in selectedItemsMapping) {
            item = selectedItemsMapping[key];
        }
    }

    const handleClose = () => {
        handleCanEdit();
    };

    if (canEdit && isSingleItem) {
        return (
            <Item
                handleClose={handleClose}
                item={item}
                updateItemsMapping={updateItemsMapping}
                propertyValuesMapping={propertyValuesMapping}
            />
        );
    }

    if (canEdit && isMultipleItems) {
        return (
            <Items
                handleClose={handleClose}
                selectedItemsMapping={selectedItemsMapping}
                updateItemsMapping={updateItemsMapping}
                propertyValuesMapping={propertyValuesMapping}
            />
        );
    }
};

Edit.propTypes = propTypes;

export default Edit;