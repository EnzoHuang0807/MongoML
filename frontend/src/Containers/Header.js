import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useMessage } from '../hooks/useMessage';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { removeMessage } = useMessage();

  const handleClear = async () => {
    removeMessage();
  };

  return (
    <Wrapper>
      <Typography variant="h2">MongoML</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
