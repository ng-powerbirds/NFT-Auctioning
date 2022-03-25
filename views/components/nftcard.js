import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Nftcard() {
  return (
    <Card sx={{ minWidth:'200px', margin: 5, width:'400px' }}>
      <CardMedia
        component="img"
        height="140"
        image="https://source.unsplash.com/1000x1000/?NFT"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Minimum Bid : $1000<br/>
          Current Bid : $1200 <br/>

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Place Bid</Button>
      </CardActions>
    </Card>
  );
}
