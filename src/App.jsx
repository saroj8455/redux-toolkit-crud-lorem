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
import Posts from './components/Posts';

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

      <Container>
        <h3 className='mb-3 text-700 font-medium text-3xl'>
          Generate paragraph from lorem api
        </h3>
        {lorem.data &&
          lorem.data.map((paraText, index) => {
            return (
              <p key={index} className='text-800 mb-3'>
                {paraText}
              </p>
            );
          })}
      </Container>

      <Divider></Divider>
      <Posts />
      <Divider />
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
