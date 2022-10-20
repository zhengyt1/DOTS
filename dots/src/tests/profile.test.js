import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Profile from '../pages/profile';
import Gallery from '../components/Gallery';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    MemoryRouter,
} from 'react-router-dom';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: () => ("2"),
    useDispatch: () => mockDispatch
}));

const para = { userId: "2" };
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => (para)
}));

const postInfo1 = {
    text: "It’s finally here!",
    pic: "/asset/photo.jpg",
    video: "",
    owner: "2",
    comments: [{ user: "3", comment: "Love your Post!" }, { user: "4", comment: "hhhh" }],
    likes: [],
    createdTime: "March 19",
    id: "1"
};
const postInfo2 = {
    text: "It’s finally here!",
    pic: "",
    video: "",
    owner: "2",
    comments: [{ user: "3", comment: "Love your Post!" }],
    likes: [],
    createdTime: "March 19",
    id: "2"
};
jest.mock('../mockedAPI/mockedAPI', () => ({
    getPostsByUserID: () => [postInfo1, postInfo2],
    getUser: () => "2",
    getFollowings: () => [],
    getFollowers: () => []
}))

describe('Testing Profile Page Rendering', () => {
    const posts = [postInfo1, postInfo2];

    it('Shows Gallery', () => {
        render(
            <Router>
                <Gallery posts={posts} saved={[]} />
            </Router>
        );
    });
    it('Shows Profile', () => {
        render(
            <Router>
                <Profile />
            </Router>
        );
    });

});