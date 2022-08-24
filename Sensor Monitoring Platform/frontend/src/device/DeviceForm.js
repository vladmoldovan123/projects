import InputField from "../commons/InputField";
import React from "react";

const DeviceForm = ({handleSubmit, handleChangeDescription,handleChangeMaxEnergy,handleChangeAvgEnergy,handleChangeAddress,buttonName,description,maxEnergy,avgEnergy,address}) => (

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
            value={maxEnergy}
            placeholder="Maximum Energy Consumption"
            label="Max Energy:"
            name="maxEnergy"
            onChange={handleChangeMaxEnergy}
        />
        <InputField
            type="text"
            value={avgEnergy}
            placeholder="Average Energy Consumption"
            label="Avg Energy:"
            name="avgEnergy"
            onChange={handleChangeAvgEnergy}
        />
        <InputField
            type="text"
            value={address}
            placeholder="Address"
            label="Address:"
            name="address"
            onChange={handleChangeAddress}
        />
        <button className="saveButton">SAVE</button>
    </form>
);

export default DeviceForm;