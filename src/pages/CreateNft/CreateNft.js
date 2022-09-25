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
    handleSearch: PropTypes.func.isRequired,
    handleCanEdit: PropTypes.func.isRequired,
    searchResults: PropTypes.object.isRequired
};

const CreateNft = ({
    itemsMapping,
    selectedItemsMapping,
    handleItemSelection,
    handleSearch,
    handleCanEdit,
    searchResults
}) => {
    const hasSearched = searchResults.searchString.length > 0;
    const isSearchItemsPresent = Object.keys(searchResults).length > 1;
    const isItemsSelected = Object.keys(selectedItemsMapping).length > 0;

    const searchResultsCopy = {...searchResults};
    delete searchResultsCopy.searchString;

    return (
        <div className="create-nft-page-container">
            <div className="sub-header-container">
                <div className="title-container">
                    <h2 className="title">Cool Cats</h2>
                    <span className="description">10 NFTs added</span>
                </div>
                <InputSearch handleSearch={handleSearch} />
                <div className={`visibility-${isItemsSelected ? "visible" : "hidden"}`}>
                    <Button
                        type={ButtonTypes.Outline}
                        handleClick={() => handleCanEdit()}
                    >
                        Edit Properties
                    </Button>
                </div>
            </div>
            <div className="table-wrapper">
                <Table
                    itemsMapping={hasSearched ? searchResultsCopy :itemsMapping}
                    handleItemSelection={handleItemSelection}
                    selectedItemsMapping={selectedItemsMapping}
                />
                <div className={`visibility-${hasSearched && !isSearchItemsPresent ? "visible" : "hidden"} empty-wrapper`}>
                    <Empty textString="No search results were found. Please update your search."/>
                </div>
            </div>
        </div>
    );
}

CreateNft.propTypes = propTypes;

export default CreateNft;