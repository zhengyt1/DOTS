import React from 'react';
// import testing library functions
import { render, screen } from '@testing-library/react';
import Feed from '../components/feed';
import Home from '../pages/home';
import Share from '../components/share';
import {BrowserRouter as Router} from 'react-router-dom';

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
    it('Shows feed', () =>{
        const postInfo = {
            text: "It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala, It’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalalaIt’s finally here! Catch our latest summer collection, “Juniper Valley,” and use code BELLEJUNI to get 10% off your first order. alalalalalalalalallalalala",
            // pic: "https://source.unsplash.com/random",
            pic: "/asset/photo.jpg",
            video: "",
            owner: "1",
            comments: [{user: "yuting", comment: "Love your Post!"},{user: "shuyue", comment: "hhhh"}],
            likes: [],
            createdTime: "March 19",
        };
        const posts = [postInfo, postInfo];
        render(
            <Router><Feed posts={posts}/></Router>
        );
    }) 
    it('Shows Share Post', () => {

        render(
            <Router>
                <Share />
            </Router>
        );
        expect(screen.getByRole('button').textContent).toBe('Share');

    });
});
