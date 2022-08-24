import React from 'react'
import logo from './commons/images/icon.png';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';




const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const handleLogout = () =>{
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");
}

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem>
                            <NavLink href="/#/admin/user">Users</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/#/admin/device">Devices</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/#/admin/sensor">Sensors</NavLink>
                        </DropdownItem>


                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
            <Button href ="/#/login" variant="outlined" onClick={handleLogout} startIcon={<LogoutIcon />}>
                Logout
            </Button>
        </Navbar>
    </div>
);

export default NavigationBar
