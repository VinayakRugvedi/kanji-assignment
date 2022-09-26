import {useState, useCallback} from "react";

import {
    nftItems,
    triggerToast
} from "utils";
import {Edit} from "./components";
import CreateNft from "./CreateNft";

const getTransformedNftItem = (item) => {
    const propertyNames = Object.keys(item.properties);
    const transformedNames = [];
    for (let name of propertyNames) {
        transformedNames.push(name[0].toUpperCase() + name.slice(1, name.length))
    }
    item.propertyNamesString = transformedNames.length > 0 ? transformedNames.join(" | ") : "";

    const values = Object.values(item.properties);
    const transformedValues = [];
    for (let valueItems of values) {
        valueItems = valueItems.map(valueItem => `${valueItem[0].toUpperCase()}${valueItem.slice(1, valueItem.length)}`);
        transformedValues.push(valueItems.join(", "));
    }
    item.propertyValuesString = transformedValues.length > 0 ? transformedValues.join(" | ") : "";

    return item;
};

const getNftItemsMapping = () => {
    const itemsMapping = {};
    for (let item of nftItems) {
        const transformedItem = getTransformedNftItem(item);
        itemsMapping[item.id] = transformedItem;
    }

    return itemsMapping;
};

const getPropertyValuesMapping = () => {
    return {
        eyes: ["green", "black", "blue"],
        hair: ["blond", "ginger", "black", "brown"],
        rarity: ["rare", "very rare", "common"]
    };
};

const CreateNftContainer = () => {
    const [itemsMapping, setItemsMapping] = useState(getNftItemsMapping());
    const [selectedItemsMapping, setSelectedItemsMapping] = useState({});
    const [propertyValuesMapping, setPropertyValuesMapping] = useState(getPropertyValuesMapping());
    const [canEdit, setCanEdit] = useState(false);
    const [searchResults, setSearchResults] = useState({searchString: ""});

    //TIP: Integerate useCallback for these handlers
    const handleItemSelection = (selectedItem = null) => {
        if (!selectedItem) {
            if (Object.keys(selectedItemsMapping).length === Object.keys(itemsMapping).length) {
                setSelectedItemsMapping({});
            } else {
                const itemsMappingCopy = {...itemsMapping};
                setSelectedItemsMapping(itemsMappingCopy);
            }
        } else {
            const selectedItemsMappingCopy = {...selectedItemsMapping};
            if (selectedItem.id in selectedItemsMapping) {
                delete selectedItemsMappingCopy[selectedItem.id]
            } else {
                selectedItemsMappingCopy[selectedItem.id] = selectedItem;
            }
            setSelectedItemsMapping(selectedItemsMappingCopy);
        }
    };

    const handleSearch = () => {
        let timer;
        return (searchString = "") => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                searchString = searchString.toLowerCase();
                if (searchString.length === 0) {
                    setSearchResults({
                        searchString: ""
                    });
                } else {
                    const searchResultsCopy = {
                        searchString
                    };
                    for (let item in itemsMapping) {
                        const searchContextString = `${itemsMapping[item].propertyNamesString.toLowerCase()} ${itemsMapping[item].propertyValuesString.toLowerCase()}`;
                        if (searchContextString.includes(searchString)) {
                            searchResultsCopy[item] = {...itemsMapping[item]};
                        }
                    }
                    setSearchResults(searchResultsCopy);
                }
            }, 500);
        };
    };
    const debouncedHandleSearch = useCallback(handleSearch(), [itemsMapping]);

    const handleCanEdit = () => {
        setCanEdit((previous) => !previous);
    };

    const updateItemsMapping = (updatedItemsMapping) => {
        const itemsMappingCopy = {...itemsMapping};
        const searchResultsCopy = {...searchResults};
        for (const [id, item] of Object.entries(updatedItemsMapping)) {
            const updatedItem = getTransformedNftItem(item);
            itemsMappingCopy[id] = updatedItem;
            if (searchResults.searchString.length > 0 && searchResultsCopy[id]) {
                const searchContextString = `${updatedItem.propertyNamesString.toLowerCase()} ${updatedItem.propertyValuesString.toLowerCase()}`;
                if (searchContextString.includes(searchResults.searchString)) {
                    searchResultsCopy[id] = updatedItem;
                } else {
                    delete searchResultsCopy[id];
                }
            }
        };
        setItemsMapping(itemsMappingCopy);
        setSearchResults(searchResultsCopy);
        handleCanEdit();
        setSelectedItemsMapping({});
        triggerToast("Successfully updated the details!");
    };

    return (
        <>
            <CreateNft
                itemsMapping={itemsMapping}
                searchResults={searchResults}
                selectedItemsMapping={selectedItemsMapping}
                handleItemSelection={handleItemSelection}
                handleSearch={debouncedHandleSearch}
                handleCanEdit={handleCanEdit}
            />
            <Edit
                canEdit={canEdit}
                handleCanEdit={handleCanEdit}
                selectedItemsMapping={selectedItemsMapping}
                updateItemsMapping={updateItemsMapping}
                propertyValuesMapping={propertyValuesMapping}
            />
        </>
    );
}

export default CreateNftContainer;
