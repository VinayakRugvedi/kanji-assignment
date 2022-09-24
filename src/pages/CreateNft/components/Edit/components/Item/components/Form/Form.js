import PropTypes from "prop-types";

import {InputText} from "components";
import "./Form.css";

const propTypes = {
    formData: PropTypes.object.isRequired,
    handleNameUpdate: PropTypes.func.isRequired
};

const Form = ({
    formData,
    handleNameUpdate
}) => {
    return (
        <form>
            <InputText
                label="Name"
                isRequired
                value={formData.name.value}
                errorString={formData.name.errorString}
                handleChange={handleNameUpdate}
            />
        </form>
    )
};

Form.propTypes = propTypes;

export default Form;