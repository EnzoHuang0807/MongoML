import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import ML from './ML';
import Data from './Data';
import AppFrame from './AppFrame';
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import './app.css';

const Wrapper = styled.div`
  margin: auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppFrame />}>
            <Route path="/" element={
              <Wrapper>
                <Header />
                <Body />
              </Wrapper>} 
            />

            <Route path="/ML" element={
              <>
              <Header />
              <ML />
              </>} 
            />

            <Route path="/data_exploration" element={
              <>
              <Header />
              <Data />
              </>} 
            />

            <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

