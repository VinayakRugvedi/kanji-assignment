import PropTypes from "prop-types";
import {FaRegWindowClose} from "react-icons/fa";

import {
    Button,
    SidePanel
} from "components";
import {ButtonTypes} from "types";
import Form from "../Form/Form";
import "./Items.css";

const propTypes = {
    propertyValuesMapping: PropTypes.object.isRequired,
    selectedItemsMapping: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAddProperty: PropTypes.func.isRequired,
    handleUpdateProperties: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
};

const Items = ({
    propertyValuesMapping,
    selectedItemsMapping,
    formData,
    handleClose,
    handleAddProperty,
    handleUpdateProperties,
    handleSave
}) => {
    const itemsCount = Object.keys(selectedItemsMapping).length;
    const emptyPropertiesMessage = "NOTE: The properties you add here will override the properties of all the selected NFT items. Saving with this empty state will erase all the properties(if any) of NFT items.";

    const itemsDescriptionContent = [];
    for (const key in selectedItemsMapping) {
        const properties = selectedItemsMapping[key].properties, transformedStrings = [];
        for (let [name, values] of Object.entries(properties)) {
            values = values.map(value => `${value[0].toUpperCase()}${value.slice(1, value.length)}`);
            const valuesString = values.join(", ");
            const transformedString = `${name.toUpperCase()} - ${valuesString}`;
            transformedStrings.push(transformedString);
        }

        itemsDescriptionContent.push(
            <div className="selected-item-details-container">
                <p className="name">{selectedItemsMapping[key].name}</p>
                <p className="properties">{transformedStrings.length > 0 ? `${transformedStrings.join(" | ")}` : "No properties"}</p>
            </div>
        )
    }

    return (
        <SidePanel>
            <div className="edit-nft-items-container">
                <div className="sidebar-header-container">
                    <h4 className="header-text">Edit {itemsCount} NFTs</h4>
                    <div
                        className="close-icon-container"
                        onClick={() => handleClose()}
                        role="button"
                    >
                        <FaRegWindowClose />
                    </div>
                </div>

                <div className="description-container">
                    <h4>Previous properties and values</h4>
                    {itemsDescriptionContent}
                </div>

                <div className="form-container">
                    <h4>New properties and values</h4>
                    <Form
                        formData={formData}
                        handleAddProperty={handleAddProperty}
                        propertyValuesMapping={propertyValuesMapping}
                        handleUpdateProperties={handleUpdateProperties}
                        emptyPropertiesMessage={emptyPropertiesMessage}
                    />
                </div>

                <div className="buttons-container">
                    <div style={{marginRight: "1rem"}}>
                        <Button
                            type={ButtonTypes.Secondary}
                            handleClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>

                    <Button
                        type={ButtonTypes.Primary}
                        handleClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </SidePanel>
    );
};

Items.propTypes = propTypes;

export default Items;