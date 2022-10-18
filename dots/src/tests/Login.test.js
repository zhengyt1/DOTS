import { 
  BrowserRouter as Router,
  Route,
  Routes,
  MemoryRouter,
 } from 'react-router-dom';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';
import Login from "../pages/login"
import Home from "../pages/home"
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
  "posts": [
    "1"
  ],
  "id": "2"
}
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

jest.mock('../mockedAPI/mockedAPI', () => ({
  getUserByEmail: () => [user]
}))

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: () => ({
        userID: "2",
    }),
    useDispatch: () => mockDispatch
}));

describe('test login page', () => {
  
  it('renders Login heading', () => {
    render(
      <Router>
          <Login />
      </Router>
    );
    expect(screen.getByRole('heading').textContent).toBe('Login');
  });
  
  it('renders Login button', () => {
    render(
      <Router>
          <Login />
      </Router>
    );
    expect(screen.getByRole('button').textContent).toBe('Login');
  });

  it('link change when submit user', async() => {

    render(
      <Router>
        <Login />
      </Router>
    )
    
    const button = screen.getByRole('button');
    await waitFor(() => {
      userEvent.click(button);
    })
    expect(mockedNavigate).toHaveBeenCalledWith('/home');
    
  });

})

describe("My app", () => {
  it("renders correctly", () => {
    let component = renderer.create(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} > 
            <Route path=":userId" element={<></>} ></Route>
          </Route>
          <Route path="/post" element={<PostDetail />} >
            <Route path=":postId" element={<></>} />
          </Route> */}
          <Route path="*" element={
            <div style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </div>
          }></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
// beforeEach(() => {
// })
// afterEach(() => {
//   mock.reset();
// });


// it("should return users list", async () => {
//     // given
    
//   const user = await getUserByEmail()
//   console.log(user)
//     // when
//     // const result = await getUsers();

//     // // then
//     // expect(mock.history.get[0].url).toEqual(`${rootURL}/user`);
//     // expect(result.data).toEqual(users);
//   });
