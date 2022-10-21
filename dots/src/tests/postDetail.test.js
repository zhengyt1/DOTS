import { 
  BrowserRouter as Router,
 } from 'react-router-dom';
import { render, screen } from "@testing-library/react"
import PostDetail from "../components/postDetail"



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
