import PropTypes from "prop-types";
import {FaRegWindowClose} from "react-icons/fa";

import {
    Avatar,
    SidePanel,
    Button
} from "components";
import {ButtonTypes} from "types";
import Form from "../Form/Form";
import "./Item.css";

const propTypes = {
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    handleNameUpdate: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleAddProperty: PropTypes.func.isRequired,
    propertyValuesMapping: PropTypes.object.isRequired,
    handleUpdateProperties: PropTypes.func.isRequired
};

const Item = ({
    handleClose,
    item,
    formData,
    handleNameUpdate,
    handleSave,
    handleAddProperty,
    propertyValuesMapping,
    handleUpdateProperties
}) => {
    return (
        <SidePanel>
            <div className="edit-nft-item-container">
                <div className="subheader-container">
                    <h4 className="header-text">{item.name}</h4>
                    <div
                        className="close-icon-container"
                        onClick={() => handleClose()}
                        role="button"
                    >
                        <FaRegWindowClose />
                    </div>
                </div>

                <div className="description-container">
                    <Avatar imageUrl={item.imageUrl} alt={item.name} />
                    <h4 className="header-text">{item.name}</h4>
                </div>

                <div className="form-container">
                    <Form
                        formData={formData}
                        handleNameUpdate={handleNameUpdate}
                        handleAddProperty={handleAddProperty}
                        propertyValuesMapping={propertyValuesMapping}
                        handleUpdateProperties={handleUpdateProperties}
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
    )
};

Item.propTypes = propTypes;

export default Item;