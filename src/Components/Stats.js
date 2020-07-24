import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: 50
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Stats() {
    const [globalData, setGlobalData] = useState([{}]);
    useEffect(() => {
        async function getData() {
            const response = await fetch("https://api.thevirustracker.com/free-api?global=stats");
            let data = await response.json();
            delete data.results[0].source;
            setGlobalData(data.results[0]);
            // console.log(data.results[0]);
        }
        getData();
    }, [])
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                <h3>Total Cases</h3>
                <h2>{globalData.total_cases}</h2></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
            <h3>Total Recovered</h3>
                <h2>{globalData.total_recovered}</h2>
                </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
            <h3>Total Deaths</h3>
                <h2>{globalData.total_deaths}</h2>
                </Paper>
          </Grid>
        </Grid>
      </div>
    );
}
