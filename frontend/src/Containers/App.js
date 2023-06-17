import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import ML from './ML';
import AppFrame from './AppFrame';
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import './app.css';

const Wrapper = styled.div`
  margin: auto;
  width: 70%;
  height: 100vh;
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
            <Route path="/ML" element={<ML/>} />
            <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

