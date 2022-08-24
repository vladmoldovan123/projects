import * as React from 'react';
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
import { useHistory } from "react-router-dom";

import '../GlobalNavBarCss.css';
import ChatIcon from "@mui/icons-material/Chat";
import dreamJobs from "../../assets/images/dreamjobs.png";
import Badge from "@mui/material/Badge";

const pages = ['Acasă','Joburi',"Adaugă Job",'Anunțurile tale'];
const settings = ['Profil','Deconectează-te'];


const BusinessNavBar = () => {


    const history= useHistory();

    const [invisible, setInvisible] = React.useState(true);

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

    const handleCloseUserMenu = (value) => {
        setAnchorElUser(null);
    };


    const handleRedirectUserMenu = (setting)=>{
        if(setting==="Profil"){
            history.push("/account/settings");
        }
        else{
            if(setting==='Deconectează-te'){
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("avatar");
                history.push("/");
                window.location.reload();
            }
        }
        setAnchorElUser(null);
    }

    const handleRedirectPage = (page)=>{
        if(page==="Joburi"){
            history.push("/jobs");
        }
        else{
            if(page==="Adaugă Job"){
                history.push('/add-job');
            }
            else{
                if(page==='Anunțurile tale'){
                    history.push('/my-jobs');
                }
                else{
                    if(page==='Acasă'){
                        history.push('/');
                    }
                }
            }
        }
        setAnchorElUser(null);
    }

    const handleConversation = ()=>{
        history.push("/conversation");
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
                    <Box sx={{ flexGrow: 0, marginRight:'3%' }}>
                        <Badge color="primary" variant="dot" invisible={invisible} onClick={handleConversation} sx={{"&:hover": {cursor: "pointer"}}}>
                            <ChatIcon />
                        </Badge>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft:2 }}>
                                <Avatar alt="Remy Sharp" src={sessionStorage.getItem("avatar")} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px', marginLeft:'60px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={()=>handleRedirectUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default BusinessNavBar;