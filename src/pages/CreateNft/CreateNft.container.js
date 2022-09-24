import {useState} from "react";

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
    for (let value of values) {
        for (let valueItem of value) {
            transformedValues.push(valueItem[0].toUpperCase() + valueItem.slice(1, valueItem.length))
        }
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

const CreateNftContainer = () => {
    const [itemsMapping, setItemsMapping] = useState(getNftItemsMapping());
    const [selectedItemsMapping, setSelectedItemsMapping] = useState({});
    const [canEdit, setCanEdit] = useState(false);

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

    const handleSearch = (searchString = "") => {
        searchString = searchString.toLowerCase();
        const nftItemsMapping = getNftItemsMapping();
        if (searchString.length === 0) {
            setItemsMapping(nftItemsMapping);
        } else {
            const searchResults = {};
            for (let item in nftItemsMapping) {
                const searchContextString = `${nftItemsMapping[item].propertyNamesString.toLowerCase()} ${nftItemsMapping[item].propertyValuesString.toLowerCase()}`;
                if (searchContextString.includes(searchString)) {
                    searchResults[item] = nftItemsMapping[item];
                }
            }
            setItemsMapping(searchResults);
        }
    };

    const handleCanEdit = () => {
        setCanEdit((previous) => !previous);
    };

    const updateItemsMapping = (updatedItemsMapping) => {
        const itemsMappingCopy = {...itemsMapping};
        for (const [id, item] of Object.entries(updatedItemsMapping)) {
            const updatedItem = getTransformedNftItem(item);
            itemsMappingCopy[id] = updatedItem;
        };
        setItemsMapping(itemsMappingCopy);
        handleCanEdit();
        setSelectedItemsMapping({});
        triggerToast("Successfully updated the NFT");
    };

    return (
        <>
            <CreateNft
                itemsMapping={itemsMapping}
                selectedItemsMapping={selectedItemsMapping}
                handleItemSelection={handleItemSelection}
                handleSearch={handleSearch}
                handleCanEdit={handleCanEdit}
            />
            <Edit
                canEdit={canEdit}
                handleCanEdit={handleCanEdit}
                selectedItemsMapping={selectedItemsMapping}
                updateItemsMapping={updateItemsMapping}
            />
        </>
    );
}

export default CreateNftContainer;
