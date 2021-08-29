import React, { useState, useEffect, Fragment } from 'react';
import './Home.css'
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Checkbox, TextField } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import {ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Label } from '@material-ui/icons';


const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#4791db',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 240,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      },
      imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
  }));

export default function ReleasedMovies(){
    
    const [releasedMovies, setReleasedMovies] = useState({movies: []});
    const [genresList, setGenresList] = useState({genres : []});
    const [artistsList, setArtistsList] = useState({artists: []});

    useEffect(() => {
        async function fetchgenre(){
            const rawResponse = await fetch('/api/v1/genres', {
                method: 'GET',
                header:{
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            });

            const response = await rawResponse.json();
            setGenresList({genres : response.genres});
        }

        async function fetchReleasesMovies(){
            const rawResponse = await fetch('/api/v1/movies?page=1&limit=10&status=released', {
                method: 'GET',
                header:{
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            });

            const response = await rawResponse.json();
            setReleasedMovies({movies : response.movies});
        }

        async function fetchArtists(){
            const rawResponse = await fetch('api/v1/artists?page=1&limit=20', {
                method: 'GET',
                header:{
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            });

            const response = await rawResponse.json();
            setArtistsList({artists : response.artists});
        }

        fetchReleasesMovies();
        fetchgenre();
        fetchArtists();
        
    }, [])

    const movieFilterHandler = (e) => {
        return 1;
    }

    const applyFilterHandler = (e) => {
        return 1;
    }

    const genreChangeHandler = (e) => {
        return 1;
    }

    const movieDetailsHandler = (e) => {
        return 1;
    }

    const {genres} = genresList;
    const {artists} = artistsList;
    const {movies} =  releasedMovies;
    const classes = useStyles();

    const [genreValue, setGenreValue] = useState([]);
    const [artistValue, setArtistValue] = useState([]);
    const [releaseDateEnd, setReleaseDateEnd] = useState("");
    const [releaseDateStart, setReleaseDateStart] = useState("");


    return(
        <Fragment>
            <div className="flexConatiner">
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <div className={classes.root}>
                            <ImageList cols={4} rowHeight={350} className={classes.imageList}>
                                {movies.map((item) => (
                                    <ImageListItem key={item.id}>
                                        <img src={item.poster_url} alt={item.title} onClick={movieDetailsHandler} />
                                        <ImageListItemBar title={item.title} 
                                        subtitle={<span>Release Date: {item.release_date}</span>} />
                                    </ImageListItem>
                                    ))}
                            </ImageList>
                        </div> 
                        
                    </Grid>
                    <Grid item xs={3}>
                        <div className="filterMovies">
                            <Card className="cardStyle">
                                <CardContent theme={theme}>
                                    <Typography variant="headline" component="h3" color='primary' >
                                        FIND MOVIES BY
                                    </Typography>
                                    <br />
                                    <FormControl required className="formControl" style={{minWidth: 240}}>
                                        <TextField id="standard-basic" label="Movie Name" onChange={movieFilterHandler} />
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl className={classes.formControl} style={{minWidth: 240}}>
                                        <InputLabel htmlFor="genres">Genres</InputLabel>
                                        <Select
                                                multiple
                                                value={genreValue}
                                                onChange={genreChangeHandler}
                                                >
                                            {genres.map((name) => (
                                                <MenuItem key={name.id} 
                                                          value={name.genre}
                                                          checked={genreValue.includes(name.id)}
                                                          >
                                                    {name.genre}
                                                    {/* <Checkbox value={name.genre} >
                                                        <Label>{name.genre}</Label>
                                                    </Checkbox> */}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl className={classes.formControl} style={{minWidth: 240}}>
                                        <InputLabel htmlFor="genres">Artists</InputLabel>
                                        <Select
                                                multiple
                                                value={artistValue}
                                                onChange={genreChangeHandler}
                                                >
                                            {artists.map((name) => (
                                                <MenuItem key={name.id} 
                                                          value={name.genre}
                                                          checked={artistValue.includes(name.id)}
                                                          >
                                                    {name.genre}
                                                    {/* <Checkbox value={name.genre} >
                                                        <Label>{name.genre}</Label>
                                                    </Checkbox> */}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl className={classes.formControl} style={{minWidth: 240}}>
                                        <TextField
                                            id="date"
                                            label="Release Date Start"
                                            type="date"
                                            value={releaseDateStart}
                                            defaultValue="dd-mm-yyyy"
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />                
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl className={classes.formControl} style={{minWidth: 240}}>
                                        <TextField
                                            id="date"
                                            label="Release Date End"
                                            type="date"
                                            value={releaseDateEnd}
                                            defaultValue="dd-mm-yyyy"
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />                
                                    </FormControl>
                                    <br />
                                    <br />
                                    <Button variant="contained" onClick={applyFilterHandler} color="primary" style={{minWidth: 240}}>
                                    APPLY
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>    
        </Fragment>
    );    
}