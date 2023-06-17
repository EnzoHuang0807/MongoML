import Header from './Header';
import Body from './Body';
import styled from 'styled-components';

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
    <Wrapper>
        <Header />
        <Body />
    </Wrapper>
  );
}

export default App;
