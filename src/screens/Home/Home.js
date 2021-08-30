import React, {useEffect} from 'react';
import { Fragment, useState } from 'react';
import Header from '../../common/Header/Header';
import './Home.css';
import {ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ReleasedMovies from './ReleasedMovies';

const useStyles = makeStyles((theme) => ({
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

export default function Home(){
    const [movieList, setMovieList] = useState({
        movies: []
    });

    useEffect(() => {
        async function fetchData(){
            const rawResponse = await fetch('/api/v1/movies?page=1&limit=6&status=published', {
                method: 'GET',
                header:{
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            });

            const response = await rawResponse.json();
            setMovieList({movies : response.movies});
        }

        fetchData();
        
    }, [])

    const {movies} = movieList;
    const classes = useStyles();

    return(
        <Fragment>
            <Header showButton={false} />
            <div className="upcomingMovies" >Upcoming Movies</div>
            <div className={classes.root}>
                <ImageList cols={6} rowHeight={250} className={classes.imageList}>
                    {movies.map((item) =>  (
                        <ImageListItem key={item.id}>
                            <img src={item.poster_url} alt={item.title} />
                            <ImageListItemBar title={item.title} />
                        </ImageListItem>
                        ))}
                </ImageList>
            </div>    
            <div className="releasedMovies">
                <ReleasedMovies />
            </div>            
        </Fragment>
    )
}