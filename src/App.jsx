import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import Container from './components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getLorems } from './store/reducers/lorem/loremSlice';
import { Divider } from 'primereact/divider';
import { createPost, getPosts } from './store/reducers/posts/postsSlice';
import { Button } from 'primereact/button';
import randomQuotes from 'random-quotes';
import { v6 as uuidv6 } from 'uuid';

function App() {
  const lorem = useSelector((state) => state.lorem);
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLorems());
    dispatch(getPosts());
  }, []);

  return (
    <>
      <Welcome />
      <Divider />
      <Container>{JSON.stringify(lorem)}</Container>
      <Divider />
      <Container>
        <ul className='p-0 m-0'>
          {posts.map((p, index) => (
            <li key={index} className='mb-2 text-500'>
              {p.body}
            </li>
          ))}
        </ul>
      </Container>
      <Divider></Divider>
      <Container>
        <div className='card flex justify-content-center gap-3'>
          <Button
            label='Check'
            icon='pi pi-check'
            onClick={() => {
              const newPost = { title: 'another title v2', views: 201 };
              dispatch(createPost({ newPost }));
            }}
          />
          <Button
            label='random quotes'
            icon='pi pi-check'
            onClick={async () => {
              try {
                const newPost = { id: uuidv6(), ...randomQuotes() };
                await dispatch(createPost({ newPost }));
                dispatch(getPosts());
              } catch (error) {
                console.log('Error handling post creation...', error);
              }
            }}
          />
        </div>
      </Container>
    </>
  );
}

export default App;
