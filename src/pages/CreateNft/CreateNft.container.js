import {useState} from "react";

import {nftItems} from "utils";
import CreateNft from "./CreateNft";

const getNftItemsMapping = () => {
    const itemsMapping = {};
    for (let item of nftItems) {
        itemsMapping[item.id] = item
    }
    return itemsMapping;
};

const CreateNftContainer = () => {
    const [itemsMapping, setItemsMapping] = useState(getNftItemsMapping());
    const [selectedItemsMapping, setSelectedItemsMapping] = useState({});

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

    return (
        <CreateNft
            itemsMapping={itemsMapping}
            selectedItemsMapping={selectedItemsMapping}
            handleItemSelection={handleItemSelection}
        />
    );
}

export default CreateNftContainer;
