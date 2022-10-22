import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { getUsers } from "../mockedAPI/mockedAPI";
import { Link } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

function Rightbar(props) {
    const [suggestFollowings, setSuggestFollowings] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await getUsers();
            setSuggestFollowings(data)
            // console.log("suggestFollowings: ", data)
        }
        fetchData();
    }, [props.suggestedUsers])
    return (
        <Box className="rightbar" 
            flex={2} p={2} bgcolor="#f5f5f5">
            <Typography variant="h6" fontWeight={100} align="center">
                Suggested Following
            </Typography>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Box className="suggestUsersBox"
                alignItems="center"
                justifyContent="center">
                <List className="suggestUsersList">
                    {suggestFollowings.map((item, key)=>(   
                        <Link to={`/profile/${item.id}`} key={`/profile/${item.id}`}>
                            <ListItem key={key}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={item.avatar}
                                        sx={{ width: 30, height: 30 }}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    {item.username}
                                </ListItemText>
                            </ListItem>
                        </Link> 
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default Rightbar;