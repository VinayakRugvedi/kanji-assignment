import PropTypes from "prop-types";

import "./Avatar.css";

const propTypes = {
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

// We can also introduce types which shall define the size and shape of the avatar

const Avatar = ({
    imageUrl,
    alt
}) => {
    return (
        <img
            className="custom-avatar"
            src={imageUrl}
            alt={alt}
        />
    )
};

Avatar.propTypes = propTypes;

export default Avatar