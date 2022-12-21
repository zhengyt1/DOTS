import React, { useState } from 'react';
// import testing library functions
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Feed from '../components/feed';
import Home from '../pages/home';
import Share from '../components/share';
import Rightbar from '../components/rightbar';
import Post from '../components/post';
import { act } from 'react-dom/test-utils';

const user = {
  username: 'Brook6',
  avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg',
  password: 'yZOaHI4siqpg_jb',
  email: 'zhengyt1@gmail.com',
  description: 'description 2',
  followers: [],
  followings: [
    '3',
    '4',
    '5',
    '6',
  ],
  posts: [],
  _id: '2',
};
const post = {
  createdTime: '2022-10-13T15:40:12.039Z',
  text: 'Cumque eos quia dicta non velit repellendus maxime quaerat. Magnam pariatur illum esse. Aut et sed beatae molestiae et repellendus dolore rem hic.',
  pic: 'https://firebasestorage.googleapis.com/v0/b/dots-38a1f.appspot.com/o/images%2FWechatIMG246.png1667851042803?alt=media&token=ba9ecef7-d736-46e6-9a52-73f397d5c36c',
  video: '',
  owner: '2',
  comments: [
    {
      ownerID: '2',
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg',
      comment: 'love my post:)',
      createdTime: '2022-11-03T21:28:38.002Z',
    },
  ],
  likes: [],
  isPrivate: true,
  mentions: [],
  _id: '1',
};

jest.mock('../mockedAPI/mockedAPI', () => ({
  getSuggestedFollowings: () => [],
  getUsers: () => [user],
  getUser: () => user,
  getFeed: () => [],
  createPost: () => post,
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => ('2'),
  useDispatch: () => mockDispatch,
}));

window.scrollTo = jest.fn();

describe('Testing Home Page Components Rendering', () => {
  it('Shows Home page', async () => {
    await act(async () => render(
      <Router>
        <Home />
      </Router>,
    ));
  });
  // it('Shows feed', async () => {
  //   const posts = [post];

  //   render(
  //     <Router><Feed posts={posts} /></Router>,
  //   );
  //   const unlikeBtn = await (screen.findByTestId('unlike-1'));
  //   await waitFor(async () => {
  //     userEvent.click(unlikeBtn);
  //   });
  //   // expect(await screen.findByTestId('unlike-1')).toBeInTheDocument();
  //   // const unlikeBtn = await screen.findByTestId('unlike-1');
  // });

  // it('comment and post', () => {
  //   const postInfo1 = {
  //     text: 'It’s finally here! ',
  //     pic: '/asset/photo.jpg',
  //     video: '',
  //     owner: '2',
  //     comments: [{ user: 'yuting', comment: 'Love your Post!' }, { user: 'shuyue', comment: 'hhhh' }],
  //     likes: ['2'],
  //     createdTime: 'March 19',
  //     _id: '2',
  //   };
  //   render(
  //     <Router>
  //       <Post postInfo={postInfo1} />
  //     </Router>,
  //   );
  //   const button = screen.getByText('Post');
  //   userEvent.click(button);

  //   const comment = screen.getByTestId('comment-input');
  //   userEvent.type(comment, 'xixi');
  //   userEvent.click(button);
  // });

  // it('Shows Share Post', () => {
  //   render(
  //     <Router>
  //       <Share />
  //     </Router>,
  //   );
  //   expect(screen.getByRole('button').textContent).toBe('Share');
  // });

  // it('Show searching', async () => {
  //   const suggestList = [
  //     {
  //       username: 'Brook6',
  //       avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg',
  //       password: 'yZOaHI4siqpg_jb',
  //       email: 'zhengyt1@gmail.com',
  //       description: 'description 2',
  //       followers: [
  //         '4',
  //         '3',
  //       ],
  //       followings: [
  //         '5',
  //         '6',
  //         '7',
  //         '4',
  //       ],
  //       posts: [],
  //       _id: '2',
  //     },
  //     {
  //       username: 'Aaron13',
  //       avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/840.jpg',
  //       password: '3',
  //       email: '3@3.com',
  //       description: 'description 3',
  //       followers: [],
  //       followings: [
  //         '4',
  //         '5',
  //         '6',
  //         '7',
  //         '2',
  //       ],
  //       posts: [],
  //       _id: '3',
  //     }];

  //   jest.mock('../mockedAPI/mockedAPI', () => ({
  //     getSuggestedFollowings: () => suggestList,
  //     getUsers: () => suggestList,
  //   }));
  //   render(
  //     <Rightbar userID="2" />,
  //   );
  //   const searchBar = screen.getByPlaceholderText('Search…');
  //   userEvent.type(searchBar, 'B');
  // });
});
