import React from 'react';
import {Container,Grid,Paper,makeStyles} from '@material-ui/core'
//xs-means if the elements are present in the width less than 600 then element will divide theem selves according to the value that we have mention in bracket
//sm-means if the elements are present in the width between 600 to 960 then element will divide theem selves according to the value that we have mention in bracket
//md-means if the elements are present in the width more than 960 then element will divide theem selves according to the value that we have mention in bracket
const Grids = () => {
    let useStyles=makeStyles({
         size:{
             height:"20vh",
             backgroundColor:"lightgray"
         },
         color:"lightgreen"
    })
    let classes=useStyles()
    return <div>
        <Container>
            <Grid container spacing={5} >
                 <Grid item xs={5} sm={2} md={5}>
                     <Paper className={classes.size}>aa</Paper>
                 </Grid>
                 <Grid item xs={5} sm={2} md={5} >
                 <Paper className={classes.size}>bb</Paper>
                 </Grid>
                 <Grid item xs={5} sm={8} md={2} >
                 <Paper className={classes.size}>cc</Paper>
                 </Grid>
                 
            </Grid>
            <Grid container spacing={5} >
                 <Grid item xs={5} sm={2} md={5}>
                     <Paper className={classes.size}>aa</Paper>
                 </Grid>
                 <Grid item xs={5} sm={2} md={5} >
                 <Paper className={classes.size}>bb</Paper>
                 </Grid>
                 <Grid item xs={5} sm={8} md={2} >
                 <Paper className={classes.size}>cc</Paper>
                 </Grid>
                 
            </Grid>
        </Container>

    </div>;
}
 
export default Grids;