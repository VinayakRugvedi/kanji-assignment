import PropTypes from "prop-types";

import {
    Button,
    InputSearch,
    Empty
} from "components";

import {ButtonTypes} from "types";
import {Table} from "./components";

import "./CreateNft.css";

const propTypes = {
    itemsMapping: PropTypes.object.isRequired,
    selectedItemsMapping: PropTypes.object.isRequired,
    handleItemSelection: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
};

const CreateNft = ({
    itemsMapping,
    selectedItemsMapping,
    handleItemSelection,
    handleSearch
}) => {
    // TIP: We can introduce a key within itemsMapping to identify the items as search results or not
    const isItemsPresent = Object.keys(itemsMapping).length > 0;
    const isItemsSelected = Object.keys(selectedItemsMapping).length > 0;

    return (
        <div className="create-nft-page-container">
            <div className="sub-header-container">
                <div className="title-container">
                    <h2 className="title">Cool Cats</h2>
                    <span className="description">10 NFTs added</span>
                </div>
                <InputSearch handleSearch={handleSearch} />
                <div className={`visibility-${isItemsSelected ? "visible" : "hidden"}`}>
                    <Button type={ButtonTypes.Outline}>Edit Properties</Button>
                </div>
            </div>
            <div className="table-wrapper">
                <Table
                    itemsMapping={itemsMapping}
                    handleItemSelection={handleItemSelection}
                    selectedItemsMapping={selectedItemsMapping}
                />
                <div className={`visibility-${!isItemsPresent ? "visible" : "hidden"} empty-wrapper`}>
                    <Empty textString="No search results were found. Please update your search."/>
                </div>
            </div>
        </div>
    );
}

CreateNft.propTypes = propTypes;

export default CreateNft;