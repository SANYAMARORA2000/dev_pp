import React, { useState, useEffect } from 'react';
import thankyouimg from "./thankyou.jpg";
import {
    TextField,
    Grid,
    Button,
    Paper,
    Card,
    CardContent,
    CardActions,
    Container,
    CardMedia,
    Typography,
    makeStyles,
    IconButton,
    CardActionArea,
  } from "@material-ui/core";

const Buynowpage = () => {
    let useStyles = makeStyles({
        root:{
            height:"100vh",
            width:"100vw",
            marginTop:"5rem",
        },
        display:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        },
        cardmediaimg:{
            height:"70vh",
            width:"100vw",
            backgroundSize:"contain",
        },
    });
    let classes = useStyles();

    return ( 
        <div>
            <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h4"
                    className={classes.display}>
                        Thank You for shopping, Our Executive will contact you for further details for your order
                    </Typography>
                </CardContent>

                <CardMedia
                className={classes.cardmediaimg}
                image={thankyouimg}
                >
                </CardMedia>


            </CardActionArea>
            </Card>
           
        </div>
     );
}
 
export default Buynowpage;