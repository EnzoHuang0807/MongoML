import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

const ContentPaper = styled(Paper)`
  height: 100px;
  padding: 2em;
  overflow: auto;
  white-space: pre-wrap;
`;

const db_options = ["ML_final"];
const train_options = ["train", "enzo"];
const test_options = ["test"];
const model_options = ["CatBoostRegressor", "LightGBMRegressor", "LinearRegression"];
const column_options = ["Danceability"];

const Body = () => {
  const classes = useStyles();

  const { messages, addRegularMessage} =
    useMessage();

  const Image = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} width="50%"/>

  const [db, setDB] = useState();
  const [train, setTrain] = useState();
  const [test, setTest] = useState();
  const [model, setModel] = useState();
  const [column, setColumn] = useState();

  const [dup, setDup] = useState('');
  const [scaling, setScaling] = useState('');
  const [impute, setImpute] = useState('');

  const [heatmap, setHeatmap] = useState();
  const [barChart, setBarChart] = useState();

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleRadio = (func, value) => (event) => {
    if (event.target.value == value){
        func('')
    } else {
        func(event.target.value)
    }
    
  };

  const handleTrain = async () => {
    const {
      data: { response_type, data, heatmap, barchart },
    } = await axios.post('/machine_learning', {
        database: db, 
        train_collection: train,
        test_collection: test,
        predict_column: column,
        model: model,
        preprocessing_methods: [dup, scaling, impute] 
    });
    addRegularMessage("The prediction mean is : " + data)
    setHeatmap(heatmap);
    setBarChart(barchart);
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
            id="select-train"
            select
            helperText="Select Train Collection"
            value = {train}
            onChange={handleChange(setTrain)}
        >
          {train_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            id="select-test"
            select
            helperText="Select Test Collection"
            value = {test}
            onChange={handleChange(setTest)}
        >
          {test_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            id="select-test"
            select
            helperText="Select Model"
            value = {model}
            onChange={handleChange(setModel)}
        >
          {model_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            id="select-test"
            select
            helperText="Select Predict Column"
            value = {column}
            onChange={handleChange(setColumn)}
        >
          {column_options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
          ))}
        </TextField>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!db || !train || !test || !model || !column}
          onClick={handleTrain}
        >
          Confirm
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              column
              value={dup}
              onClick={handleRadio(setDup, dup)}
            >
              <FormControlLabel
                value="remove_duplicates"
                control={<Radio color="primary" />}
                label="remove duplicates"
              />

            </RadioGroup>
          </FormControl>
        </StyledFormControl>

        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              column
              value={scaling}
              onClick={handleRadio(setScaling, scaling)}
            >
              <FormControlLabel
                value="standard_scaling"
                control={<Radio color="primary" />}
                label="standard scaling"
              />
              <FormControlLabel
                value="min_max_scaling"
                control={<Radio color="primary" />}
                label="min-max scaling"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>

        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              column
              value={impute}
              onClick={handleRadio(setImpute, impute)}
            >
              <FormControlLabel
                value="impute_mean"
                control={<Radio color="primary" />}
                label="Impute mean"
              />

              <FormControlLabel
                value="impute_median"
                control={<Radio color="primary" />}
                label="Impute median"
              />

              <FormControlLabel
                value="impute_most_frequent"
                control={<Radio color="primary" />}
                label="Impute most-frequent"
              />

            </RadioGroup>
          </FormControl>
        </StyledFormControl>
      </Row>

      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ fontSize: "20px", color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <Row>
        {heatmap? <Image data={heatmap} /> : <></>}
        {barChart? <Image data={barChart} /> : <></>}
      </Row>
    </Wrapper>
  );
};

export default Body;
