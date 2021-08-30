import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/Header/Header';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import { Rating, Typography } from '@material-ui/core';
import './Detail.css';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import {ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';


export default function Detail(){
    const [value, setValue] = useState(0);
    const detail_movie = useSelector(state=>state.detail_movie);

    return(
        <Fragment>
            <Header showButton={true} />
            <Link to="/" style={{ textDecoration: 'none' }}>
            <Grid container direction="row" alignItems="center" className="backToHome">
                <Grid item>
                    <ArrowBackIosIcon size={8}/>
                </Grid>
                <Grid item>
                    <Typography>Back to Home</Typography>
                </Grid>
            </Grid>   
            </Link>
            <br />
            <Grid container direction="row" alignItems="top" className="movieDetails" spacing={4}>
                <Grid item xs={3} l={2}>
                    <img src={detail_movie.poster_url} alt={detail_movie.title}/> 
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4">{detail_movie.title}</Typography>
                    <Typography><b>Genre: </b>{detail_movie.genres}</Typography>
                    <Typography><b>Duration: </b>{detail_movie.duration}</Typography>
                    <Typography><b>Release Date: </b>{detail_movie.release_date}</Typography>                    
                    <Typography><b>Rating: </b>{detail_movie.rating}</Typography>
                    <br />
                    <Typography><b>Plot: </b>{detail_movie.storyline}</Typography>
                    <br />
                    <br />
                    <Typography><b>Trailer: </b></Typography>
                    <ReactPlayer url={detail_movie.trailer_url} />
                </Grid>
                <Grid item xs={3}>
                    <Typography component="legend"><b>Rate This Movie</b></Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}/>
                    <br/><br/>
                    <Typography component="legend"><b>Artists</b></Typography>
                    <ImageList cols={2} rowHeight={250} gap={8}>
                                {detail_movie.artists.map((item) => {return (
                                    <ImageListItem key={item.id}>
                                        <img key={item.first_name} src={item.profile_url} alt={item.first_name} />
                                        <ImageListItemBar title={item.first_name + " " + item.last_name} />
                                    </ImageListItem>
                                    )} )} 
                    </ImageList>
                </Grid>
            </Grid>
            
        </Fragment>
          
    );

}