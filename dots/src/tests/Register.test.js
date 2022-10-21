import { 
  BrowserRouter as Router,
 } from 'react-router-dom';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Register from "../pages/register"



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
  "posts": [],
  "id": "2"
}
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

jest.mock('../mockedAPI/mockedAPI', () => ({
  createUser: () => user,
}))

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: () => ({
        userID: "2",
    }),
    useDispatch: () => mockDispatch
}));

describe('test register page', () => {
  
  it('renders Register heading', () => {
    render(
      <Router>
          <Register />
      </Router>
    );
    expect(screen.getByRole('heading').textContent).toBe('Register');
  });
  
  it('renders Register button', () => {
    render(
      <Router>
          <Register />
      </Router>
    );
    expect(screen.getByRole('button').textContent).toBe('Register');
  });

  it('link change to home when submit user', async() => {

    render(
      <Router>
        <Register />
      </Router>
    )
    // const mock = new MockAdapter(axios);

    // This sets the mock adapter on the default instance
    // mock.onGet(`${BASE_URL}/users`).networkErrorOnce();
    // mock.onPost('https://63446bd6dcae733e8fdeff41.mockapi.io/api/user/2').reply(200, user);

    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/home');
    })
    
  });

})
