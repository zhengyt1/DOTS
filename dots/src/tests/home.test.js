import React, { useState } from 'react';
// import testing library functions
import { render, screen, waitFor } from '@testing-library/react';
import Feed from '../components/feed';
import Home from '../pages/home';
import Share from '../components/share';
import { BrowserRouter as Router } from 'react-router-dom';
import Rightbar from '../components/rightbar';
import userEvent from '@testing-library/user-event';
import Post from '../components/post';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: () => ({
        userID: "2",
    }),
    useDispatch: () => mockDispatch
}));


describe('Testing Home Page Components Rendering', () => {

    it('Shows Home page', () => {

        render(
            <Router>
                <Home />
            </Router>
        );

    });
    it('Shows feed', () => {
        const postInfo1 = {
            text: "It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala, It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala",
            // pic: "https://source.unsplash.com/random",
            pic: "/asset/photo.jpg",
            video: "",
            owner: "2",
            comments: [{ user: "yuting", comment: "Love your Post!" }, { user: "shuyue", comment: "hhhh" }],
            likes: [],
            createdTime: "March 19",
            id: "1"
        };
        const postInfo2 = {
            text: "It’s finally here! ",
            pic: "/asset/photo.jpg",
            video: "",
            owner: "2",
            comments: [{ user: "yuting", comment: "Love your Post!" }, { user: "shuyue", comment: "hhhh" }],
            likes: ["2"],
            createdTime: "March 19",
            id: "2"
        };
        const posts = [postInfo1, postInfo2];

        render(
            <Router><Feed posts={posts} /></Router>
        );
        const unlikeBtn = screen.getByTestId("unlike-1");
        userEvent.click(unlikeBtn);
    });

    it("comment and post", () => {
        const postInfo1 = {
            text: "It’s finally here! ",
            pic: "/asset/photo.jpg",
            video: "",
            owner: "2",
            comments: [{ user: "yuting", comment: "Love your Post!" }, { user: "shuyue", comment: "hhhh" }],
            likes: ["2"],
            createdTime: "March 19",
            id: "2"
        };
        render(
            <Router>
                <Post postInfo={postInfo1} />
            </Router>
        );
        const button = screen.getByText("Post");
        userEvent.click(button);

        const comment = screen.getByTestId("comment-input")
        userEvent.type(comment, 'xixi')
        userEvent.click(button);

    });

    it('Shows Share Post', () => {

        render(
            <Router>
                <Share />
            </Router>
        );
        expect(screen.getByRole('button').textContent).toBe('Share');
    });

    it('Show searching', async () => {
        const suggestList = [
            {
                "username": "Brook6",
                "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg",
                "password": "yZOaHI4siqpg_jb",
                "email": "zhengyt1@gmail.com",
                "description": "description 2",
                "followers": [
                    "4",
                    "3"
                ],
                "followings": [
                    "5",
                    "6",
                    "7",
                    "4"
                ],
                "posts": [],
                "id": "2"
            },
            {
                "username": "Aaron13",
                "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/840.jpg",
                "password": "3",
                "email": "3@3.com",
                "description": "description 3",
                "followers": [],
                "followings": [
                    "4",
                    "5",
                    "6",
                    "7",
                    "2"
                ],
                "posts": [],
                "id": "3"
            }]

        jest.mock('../mockedAPI/mockedAPI', () => ({
            getSuggestedFollowings: () => suggestList,
            getUsers: () => suggestList
        }))
        render(
            <Rightbar userID="2" />
        );
        const searchBar = screen.getByPlaceholderText("Search…");
        userEvent.type(searchBar, 'B');

    });
});
