import PropTypes from "prop-types";

import {Item} from "./components";

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

    let item = {}
    if (isSingleItem) {
        for (let key in selectedItemsMapping) {
            item = selectedItemsMapping[key];
        }
    }

    const handleClose = () => {
        handleCanEdit();
    };

    return (
        <>
            {
                (canEdit && isSingleItem) ? (
                    <Item
                        handleClose={handleClose}
                        item={item}
                        updateItemsMapping={updateItemsMapping}
                        propertyValuesMapping={propertyValuesMapping}
                    />
                ) : null
            }
        </>
    );
};

Edit.propTypes = propTypes;

export default Edit;