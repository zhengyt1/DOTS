import { 
    BrowserRouter as Router,
   } from 'react-router-dom';
  import { render, screen, waitFor } from "@testing-library/react"
  import Post from "../components/post"
  import userEvent from '@testing-library/user-event';
  import '@testing-library/jest-dom'
  
  const mockedNavigate = jest.fn();
  const mockedParam = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    useParams: () => mockedParam,
  }));
  
  const mockDispatch = jest.fn();
  jest.mock('react-redux', () => ({
      useSelector: () => "2",
      useDispatch: () => mockDispatch
  }));
  
  const mockPost = jest.fn();
  // const mockUser = jest.fn();
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
    "id": "2"
   };
  const post = {
    "createdTime": "2022-10-13T15:40:12.039Z",
    "text": "Cumque eos quia dicta non velit repellendus maxime quaerat. Magnam pariatur illum esse. Aut et sed beatae molestiae et repellendus dolore rem hic.",
    "pic": "https://firebasestorage.googleapis.com/v0/b/dots-38a1f.appspot.com/o/images%2FWechatIMG246.png1667851042803?alt=media&token=ba9ecef7-d736-46e6-9a52-73f397d5c36c",
    "video": "",
    "owner": "2",
    "comments": [
      {
        "ownerID": "2",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg",
        "comment": "love my post:)",
        "createdTime": "2022-11-03T21:28:38.002Z"
      }
    ],
    "likes": [],
    "isPrivate": true,
    "mentions": [],
    "id": "1"
  };
  jest.mock('../mockedAPI/mockedAPI', () => ({
    getPostByID: () => post,
    getUser: () => user,
    updatePost: () => mockPost,
  }))
  
  describe('test post page', () => {
    
    it('renders post by checking existence of post text', () => {
      // const mock = new MockAdapter(axios);
  
      // This sets the mock adapter on the default instance
      // mock.onGet(`${BASE_URL}/users`).networkErrorOnce();
      // mock.onGet('https://63446bd6dcae733e8fdeff41.mockapi.io/api/user/2').reply(200, user);
      // mock.onGet('https://63446bd6dcae733e8fdeff41.mockapi.io/api/post/2').reply(200, post);
  
      render(
        <Router>
          <Post postInfo={post} />
        </Router>
      )
      expect(screen.getByText('Post').textContent).toBe('Post');
    });
  
    it('tests post comment by clicking button without comment', async () => {
      render(
        <Router>
          <Post postInfo={post} />
        </Router>
      )
      const button = screen.getByText("Post");
      userEvent.click(button);
    });

    it('tests post comment by clicking button with comment', async () => {
      render(
        <Router>
          <Post postInfo={post} />
        </Router>
      )
      const button = screen.getByText("Post");
      const comment = screen.getByTestId("comment-input")
      userEvent.type(comment, 'maomaomao')
      userEvent.click(button);
      await waitFor(async () => {
        expect(screen.getByText('maomaomao')).toBeInTheDocument();
      })
    });
  
  })
  