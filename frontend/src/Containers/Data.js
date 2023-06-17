import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from '../hooks';
import axios from '../api';
import { useMessage } from '../hooks/useMessage';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;


const Body = () => {

  const classes = useStyles();
  const {db_options} = useMessage();

  const Image = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} width="100%"/>

  const [db, setDB] = useState();
  const [collection, setCollection] = useState();
  const [figure_type, setFigureType] = useState();

  const [figure, setFigure] = useState();

  const [collection_options, setCollectionOption] = useState([])

  const handleChange = (func) => async(event) => {
    func(event.target.value);

    if (func == setDB){
      const {
        data: { response_type, data},
      } = await axios.post('/collection', {
          database: event.target.value, 
      });
      
      setCollectionOption(data);
    } 
  };

  const handleExplore = async () => {
    const {
      data: { response_type, data},
    } = await axios.post('/data_exploration', {
        database: db, 
        collection: collection,
        figure_type: figure_type
    });
    
    setFigure(data);
  };


  return (
    <Wrapper>
      <Row>
        <TextField
            id="select-db"
            select
            helperText="Select Database"
            value = {db}
            onChange={handleChange(setDB)}
        >
          {db_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            id="select-collection"
            select
            helperText="Select Collection"
            value = {collection}
            onChange={handleChange(setCollection)}
        >
          {collection_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              column
              value={figure_type}
              onChange={handleChange(setFigureType)}
            >
              <FormControlLabel
                value="show_missing_values"
                control={<Radio color="primary" />}
                label="show missing values"
              />

              <FormControlLabel
                value="show_feature_distributions"
                control={<Radio color="primary" />}
                label="show feature distributions"
              />

            </RadioGroup>
          </FormControl>
        </StyledFormControl>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!db || !collection || !figure_type }
          onClick={handleExplore}
        >
          Explore
        </Button>

      </Row>
      <Row>
        {figure? <Image data={figure} /> : <></>}
      </Row>
    </Wrapper>
  );
};

export default Body;
