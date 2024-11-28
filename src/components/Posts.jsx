import React, { useEffect } from 'react';
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/reducers/posts/postsSlice';

export default function Posts() {
  const { posts, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
    </Container>
  );
}
