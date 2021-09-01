import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {Grow, Container, Grid} from '@material-ui/core';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import getPosts from "../../actions/posts";
import useStyles from '../../style'

const Home = () =>
{
    const dispatch = useDispatch()
    const classes = useStyles()

    const [currentId, setCurrentId] = useState(null)

   useEffect(() => {
       dispatch(getPosts())
   }, [currentId, dispatch])

    return (
        <Grow in>
        <Container>
            <Grid className={classes.mainContainer} container justify-content="space-between" alignItems="stretch" spacing={4}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    )
}

export default Home

 