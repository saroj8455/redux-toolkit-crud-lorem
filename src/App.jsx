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

function App() {
  const lorem = useSelector((state) => state.lorem);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLorems());
  }, []);

  return (
    <>
      <Welcome />
      <Divider />
      <Container>{JSON.stringify(lorem)}</Container>
    </>
  );
}

export default App;
