import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import RegisterForm from '../LoginForm'
import Dialog from '@mui/material/Dialog';
import { useHistory } from "react-router-dom";

import '../GlobalNavBarCss.css';
import {ClickAwayListener, DialogContent} from "@mui/material";
import { createStyles, makeStyles } from '@mui/styles';
import dreamJobs from "../../assets/images/dreamjobs.png";

const pages = ['Acasă', 'Joburi'];


const NavBar = () => {

    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRedirectPage = (page)=>{
        console.log("Page: ",page);
        if(page==='Acasă'){
            history.push("/");
        }
        else{
            if(page==="Joburi"){
                history.push("/jobs");
            }
        }
        setAnchorElUser(null);
    }



    return (
        <AppBar position="static" sx={{ bgcolor: "#268991" }}>
            <Container maxWidth="
">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mt:"-12px",mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        {/*<img src={dreamJobs}  alt="Dream Jobs"/>*/}
                        <Box
                            component="img"
                            sx={{
                                width:200
                            }}
                            alt="DreamJobs"
                            src={dreamJobs}
                        />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={()=>handleRedirectPage(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=>handleRedirectPage(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <div>
                        <Button variant="contained" sx={{textTransform:'none', m:"auto", bgcolor:"#268991"}} onClick={handleClickOpen}>Autentificare</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <DialogContent sx={{padding:0}}>
                                    <RegisterForm handleClose={handleClose}/>
                                </DialogContent>
                            </ClickAwayListener>
                        </Dialog>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;