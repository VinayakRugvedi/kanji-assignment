import {useState} from "react";
import PropTypes from "prop-types";
import {
    FaSearch,
    FaRegWindowClose
} from "react-icons/fa";

import "./Search.css";

const propTypes = {
    label: PropTypes.string,
    handleSearch: PropTypes.func,
    placeHolder: PropTypes.string
};

const defaultProps = {
    label: "",
    handleSearch: () => {},
    placeHolder: "Search here..."
}

const Search = ({
    label,
    handleSearch,
    placeHolder,
    ...props
}) => {
    const [searchString, setSearchString] = useState("");

    const onChange = (event) => {
        const {value} = event.target;
        setSearchString(value);
        handleSearch(value);
    };

    const onClose = () => {
        setSearchString("");
        handleSearch("");
    };

    return (
        <div className="custom-search-input-container">
            <label>
                <span>{label}</span>
                <input
                    type="search"
                    onChange={onChange}
                    placeholder={placeHolder}
                    value={searchString}
                    {...props}
                />
            </label>
            <span className="search-icon"><FaSearch /></span>
            {
                searchString.length > 0 ?
                    <span
                        className="search-close-icon"
                        onClick={onClose}
                        role="button"
                    >
                        <FaRegWindowClose />
                    </span> : null
            }
        </div>
    )
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;