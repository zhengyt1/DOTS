import React from 'react';
import { render, screen } from '@testing-library/react';
import { toHaveStyle } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import Profile from '../pages/profile';
import Gallery from '../components/Gallery';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import ProfileOverview from '../components/ProfileOverview';
import { act } from 'react-dom/test-utils';

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
    _id: "1"
};
const postInfo2 = {
    text: "It’s finally here!",
    pic: "",
    video: "",
    owner: "2",
    comments: [{ user: "3", comment: "Love your Post!" }],
    likes: [],
    createdTime: "March 19",
    _id: "2"
};

const user = {
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
    "_id": "2"
};
jest.mock('../mockedAPI/mockedAPI', () => ({
    getPostsByUserID: () => [postInfo1, postInfo2],
    getUser: () => user,
    getFollowings: () => [],
    getFollowers: () => []
}))

describe('Testing Profile Page Rendering', () => {

    it('Shows Profile', async () => {
        await act(async () => render(
            <Router>
                <Profile />
            </Router>
        ));
    });

});

describe('test Gallery component', () => {
    const posts = [postInfo1, postInfo2];

    it('Shows Gallery', async () => {
        await act(async () => render(
            <Router>
                <Gallery posts={posts} saved={[]} />
            </Router>
        ));
    });

    it('Click Posts', async () => {
        await act(async () => render(
            <Router>
                <Gallery posts={posts} saved={[]} />
            </Router>
        ));
        const div = screen.getByText('Posts').parentNode;
        userEvent.click(div);
        expect(div).toHaveStyle('borderTop: 1px solid black');
    });

    it('Click Saved', async () => {
        await act(async () => render(
            <Router>
                <Gallery posts={posts} saved={[]} />
            </Router>
        ));
        const div = screen.getByText('Saved').parentNode;
        userEvent.click(div);
        expect(div).toHaveStyle('borderTop: 1px solid black');
    });
});

describe('test ProfileOverview component', () => {
    it('Show Self ProfileOverview', async () => {
        await act(async () => render(
            <Router>
                <ProfileOverview
                    selfID={"2"}
                    profileID={"2"}
                    username={"user2"}
                    userAvatar={""}
                    description={"description 2"}
                    numOfFollowers={3}
                    numOfFollowings={2}
                    numOfPosts={2} />
            </Router>
        ));
        const SettingElement = screen.getByText("Settings");
        expect(SettingElement).toBeInTheDocument();
    });

    it('Show Other ProfileOverview', async () => {
        await act(async () => render(
            <Router>
                <ProfileOverview
                    selfID={"2"}
                    profileID={"3"}
                    username={"user3"}
                    userAvatar={""}
                    description={"description 3"}
                    numOfFollowings={2}
                    numOfPosts={2} />
            </Router>
        ));
        const button = screen.getAllByRole('button')[0];
        expect(button.text).not.toBe("Settings");
    })
})