import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Pie } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    rootgrid: {
      maxWidth: 1000,
      margin: '0 auto',
      marginTop: 50
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
}));

export default function Countries() {
  const [globalData, setGlobalData] = useState([{}]);
  const [countryState, setcountryState] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
      let CountryData = await response.json();
      delete CountryData.sitedata;
      setGlobalData(Object.values(Object.values(CountryData.countryitems)[0]));
      // console.log(CountryData);

    }
    getData();


  }, [])
  console.log(globalData)
  const classes = useStyles();
  const handleChange = (event) => {
    setcountryState(event.target.value);
  };
  console.log(countryState);
  let result = globalData.filter(country => country.title === countryState);
  let Ui = "";
  if (result.length === 0) {
    // result = [
    //   {
    //     total_cases: 10000,
    //     total_recovered: 3030,   // FOR HARD CODE
    //     total_death: 2222,
    //   }
    // ]
  }
  else {
    let datas = [result[0].total_cases, result[0].total_recovered, result[0].total_deaths];
    console.log("data", datas);
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        data: datas,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    };
    Ui = (

      <div className={classes.rootgrid}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h3>Total Cases</h3>
              <h2>{result[0].total_cases}</h2></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h3>Total Recovered</h3>
              <h2>{result[0].total_recovered}</h2>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h3>Total Deaths</h3>
              <h2>{result[0].total_deaths}</h2>
            </Paper>
          </Grid>
        </Grid>

        <div>
          <h2>Pie Example</h2>
          <Pie data={data} />
        </div>

      </div>
    )
  }
  console.log(result);
  console.log(result[0]);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="filled-select-country"
          select
          label="Select"
          value={countryState}
          onChange={handleChange}
          helperText="Please select your country"
          variant="filled"
        >
          {globalData.map((option) =>
            <MenuItem key={option.ourid} value={option.title}>
              {option.title}
            </MenuItem>
          )}

        </TextField>
      </div>
      {Ui}
    </form>
  );
}
