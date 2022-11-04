import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { getSuggestedFollowings, getUsers } from "../mockedAPI/mockedAPI";
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
    const [usersList, setUsersList] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleFilterTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const makeRows = () => {
        const rows = [];
        usersList.forEach((item, key) => {
            if (!searchText.length) {
                return;
            } else {
                if (!item.username.toLowerCase().startsWith(searchText.toLowerCase())) {
                    return;
                }
                rows.push(
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
                );
            }
        });
        return rows;
    };

    useEffect(() => {
        async function fetchData() {
            const suggestedList = await getSuggestedFollowings(props.userID);
            setSuggestFollowings(suggestedList);
            const allUsers = await getUsers();
            setUsersList(allUsers);
        }
        fetchData();
    }, [props.userID])

    return (
        <Box className="rightbar" 
            flex={2} p={2} bgcolor="#f5f5f5">
            <Typography variant="h6" fontWeight={100} align="center">
                Search Results
            </Typography>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleFilterTextChange}
                />
            </Search>
            <Box className="searchResultBox"
                alignItems="center"
                justifyContent="center">
                <List className="searchResultList">
                    {makeRows()}
                </List>
            </Box>
            <Typography variant="h6" fontWeight={100} margin-top={20} align="center">
                Suggested Followings
            </Typography>
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