import InputField from "../commons/InputField";
import React from "react";

const SensorForm = ({handleSubmit, handleChangeDescription,handleChangeMaxValue,description,maxValue,buttonName}) => (

    <form className="form" onSubmit={handleSubmit}>
        <InputField
            type="text"
            value={description}
            placeholder="Description"
            label="Description:"
            name="description"
            onChange={handleChangeDescription}
        />
        <InputField
            type="text"
            value={maxValue}
            placeholder="Maximum value"
            label="Max Value:"
            name="maxValue"
            onChange={handleChangeMaxValue}
        />
        <button className="saveButton">SAVE</button>
    </form>
);

export default SensorForm;