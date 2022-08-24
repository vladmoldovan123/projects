import React  from "react";
import InputField from "../commons/InputField";
import './userContainer.css'

const UserForm = ({handleSubmit, handleChangeName,handleChangeUsername,handleChangePassword,handleChangeBirthdate,handleChangeAddress,handleChangeEmail,buttonName,name,username,password,email,birthdate,address},{validationForm}) => (

    <form className="form" onSubmit={handleSubmit}>
        <InputField
            type="text"
            value={name}
            placeholder="Name"
            label="Name:"
            name="name"
            onChange={handleChangeName}
        />
        <InputField
            type="text"
            value={username}
            placeholder="Username"
            label="Username"
            name="username"
            onChange={handleChangeUsername}
        />
        <InputField
            type="password"
            value={password}
            placeholder="Password"
            label="Password:"
            name="password"
            onChange={handleChangePassword}
        />
            <InputField
                type="text"
                value={email}
                placeholder="Email"
                label="Email:"
                name="email"
                onChange={handleChangeEmail}
            />
            <InputField
                type="text"
                value={address}
                placeholder="Address"
                label="Address:"
                name="address"
                onChange={handleChangeAddress}
            />
            <InputField
                type="date"
                value={birthdate}
                placeholder="Birth Date"
                label="Birth Date:"
                name="birthdate"
                onChange={handleChangeBirthdate}
            />
        {validationForm==='' ? <span style="color:red">Test</span> : ""  }
        <button className="saveButton">SAVE</button>
    </form>
);

export default UserForm;