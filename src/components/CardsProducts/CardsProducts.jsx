import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import './CardsProducts.css'
import '../../assets/fonts.css'

const CardsProducts = ({product}) => {
  return (
    <div className='cards' style={{margin:18}}>
        <Card sx={{ maxWidth: 315, borderRadius:3, }} className='card'>
            <CardActionArea>
                <CardMedia
                className='imgs'
                component="img"
                height="315"
                image={product.image}
                alt={product.name}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'Josefin Slab', serif", fontWeight: "700", textAlign:"center", fontSize:25}}>
                    {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{fontFamily: "'Josefin Slab', serif", fontWeight:"800", marginLeft: 12, fontSize:20, textDecoration:"none !important"}}>
                    Precio: €{product.price}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div> 
  )
}

export default CardsProducts