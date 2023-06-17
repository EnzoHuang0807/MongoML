import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from '../hooks';
import axios from '../api';
import { useMessage } from '../hooks/useMessage';

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Dashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10%;
  width: 100%;
  padding: 1em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.textarea`
  width: 50%;
  height: 400px;
  padding: 1em;
  font-size: 15px;
  border: 1px solid #E5E4E2;
`;

const ContentPaper = styled(Paper)`
  width: 50%;
  height: 400px;
  padding: 1em;
  overflow: auto;
  white-space: pre-wrap;
`;

const  db_options = ['ML_final']

const Body = () => {
  const classes = useStyles();

  const { messages, addRegularMessage} =
    useMessage();

  const [operation, setOperation] = useState('');
  const [db, setDB] = useState('');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleRequest = async () => {
    const {
      data: { response_type, data },
    } = await axios.post('/mongodb_operation', {
      database: db, 
      db_operation: operation 
    });
    addRegularMessage(data)
    console.log(data);
  };

  return (
    <Wrapper>
      <Dashboard>

        <TextField
            id="select-db"
            select
            helperText="Please select the Database you want to work on"
            value = {db}
            onChange={handleChange(setDB)}
        >
          {db_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleRequest}
          disabled = {!operation || !db}
        >
          Request
        </Button>

      </Dashboard>
      <Row>

        <Input
        name="query"
        value={operation}
        onChange={handleChange(setOperation)}
        placeholder="Please enter your MongoDB query here..."
        />

        <ContentPaper variant="outlined">
          {messages.map((m, i) => (
            <Typography variant="body2" key={m + i} style={{ fontSize: "15px", color: m.color }}>
              {m.message}
            </Typography>
          ))}
        </ContentPaper>

      </Row>
    </Wrapper>
  );
};

export default Body;
