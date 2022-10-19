import { 
  BrowserRouter as Router,
  Route,
  Routes,
  MemoryRouter,
 } from 'react-router-dom';
import { render, screen, waitFor } from "@testing-library/react";
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import Home from "../pages/home"
import PostDetail from "../components/postDetail"
import axios from "axios";
import MockAdapter from "axios-mock-adapter";


const post = {
  "createdTime": "2022-10-13T15:40:12.039Z",
  "text": "Cumque eos quia dicta non velit repellendus maxime quaerat. Magnam pariatur illum esse. Aut et sed beatae molestiae et repellendus dolore rem hic.",
  "pic": "http://loremflickr.com/640/480/nature",
  "video": "",
  "owner": "2",
  "comments": [],
  "likes": [],
  "isPrivate": true,
  "mentions": [],
  "id": "1"
}

const user = {
  "username": "Brook6",
  "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg",
  "password": "yZOaHI4siqpg_jb",
  "email": "zhengyt1@gmail.com",
  "description": "description 2",
  "followers": [],
  "followings": [
    "3",
    "4",
    "5",
    "6"
  ],
  "posts": [
    "1"
  ],
  "id": "2"
}

// const postParam = {
//   "postId": "2",
// }

const mockedNavigate = jest.fn();
const mockedParam = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: () => mockedParam,
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: () => ({
        userID: "2",
    }),
    useDispatch: () => mockDispatch
}));

const mockPost = jest.fn();
const mockUser = jest.fn();
jest.mock('../mockedAPI/mockedAPI', () => ({
  getPostByID: () => mockPost,
  getUser: () => mockUser,
}))

describe('test postDetail page', () => {
  
  it('renders postDetail by checking existence of post text', () => {
    // const mock = new MockAdapter(axios);

    // This sets the mock adapter on the default instance
    // mock.onGet(`${BASE_URL}/users`).networkErrorOnce();
    // mock.onGet('https://63446bd6dcae733e8fdeff41.mockapi.io/api/user/2').reply(200, user);
    // mock.onGet('https://63446bd6dcae733e8fdeff41.mockapi.io/api/post/2').reply(200, post);

    render(
      <Router>
        <PostDetail />
      </Router>
    )
    expect(screen.getByText('Post').textContent).toBe('Post');

  });

})
