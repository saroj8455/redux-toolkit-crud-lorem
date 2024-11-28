import React, { useEffect } from 'react';
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts } from '../store/reducers/posts/postsSlice';
import { Button } from 'primereact/button';
import randomQuotes from 'random-quotes';
import { v6 as uuidv6 } from 'uuid';

export default function Posts() {
  const { posts, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handelCreatePost = async () => {
    try {
      const newPost = { id: uuidv6(), ...randomQuotes() };
      await dispatch(createPost({ newPost }));
      dispatch(getPosts());
    } catch (error) {
      console.log('Error handling post creation...', error);
    }
  };

  return (
    <Container>
      <h3 className='mb-3 text-700 font-medium text-3xl'>
        Generate random posts from json-server
      </h3>
      {loading && (
        <div className='text-orange-400 font-medium text-3xl'>Loading....</div>
      )}
      {error && <div style={{ color: 'red', fontSize: '2rem' }}>{error}</div>}
      <ul className='p-0 m-0'>
        {posts &&
          posts.map((post) => {
            return (
              <li className='mb-2 text-500 font-medium' key={post.id}>
                {post.body}
              </li>
            );
          })}
      </ul>
      <Button
        label='create random quotes'
        icon='pi pi-check'
        onClick={handelCreatePost}
      />
    </Container>
  );
}
