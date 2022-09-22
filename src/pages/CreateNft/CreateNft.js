import PropTypes from "prop-types";

import {Button} from "components";

import {ButtonTypes} from "types";
import {Table} from "./components";

import "./CreateNft.css";

const propTypes = {
    itemsMapping: PropTypes.object.isRequired,
    selectedItemsMapping: PropTypes.object.isRequired,
    handleItemSelection: PropTypes.func.isRequired
};

const CreateNft = ({
    itemsMapping,
    selectedItemsMapping,
    handleItemSelection
}) => {
    const isItemsSelected = Object.keys(selectedItemsMapping).length > 0;

    return (
        <div className="create-nft-page-container">
            <div className="sub-header-container">
                <div className="title-container">
                    <h2 className="title">Cool Cats</h2>
                    <span className="description">10 NFTs added</span>
                </div>
                <p>Search</p>
                <div className={`visibility-${isItemsSelected ? "visible" : "hidden"}`}>
                    <Button type={ButtonTypes.Outline}>Edit Properties</Button>
                </div>
            </div>
            <div>
                <Table
                    itemsMapping={itemsMapping}
                    handleItemSelection={handleItemSelection}
                    selectedItemsMapping={selectedItemsMapping}
                />
            </div>
        </div>
    );
}

CreateNft.propTypes = propTypes;

export default CreateNft;