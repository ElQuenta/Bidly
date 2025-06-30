import Countdown, { type CountdownRendererFn } from 'react-countdown';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardActionArea,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PushPinIcon from '@mui/icons-material/PushPin';

interface AuctionItemProps {
  image: string;
  title: string;
  auctionState: string;
  bidType: string;
  timeLeft: Date;
  onClick?: () => void;
  onPinClick?: () => void;
}

const AuctionItem = ({
  image,
  title,
  auctionState,
  bidType,
  timeLeft: endDate,
  onClick,
  onPinClick,
}: AuctionItemProps) => {
  const renderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {

    if (completed) {
      return (
        <Box sx={{ p: 1 }}>
          <Typography variant="body2" align="center" color="text.secondary">
            Auction Ended
          </Typography>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 1,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          mx: 2,
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          Time left:
        </Typography>
        <Grid container spacing={2}>
          {[
            { val: days, label: 'days' },
            { val: hours, label: 'hours' },
            { val: minutes, label: 'minutes' },
            { val: seconds, label: 'seconds' },
          ].map(({ val, label }) => (
            <Grid size={3} key={label}>
              <Typography variant="body1" fontWeight={500}>
                {String(val).padStart(2, '0')}
              </Typography>
              <Typography variant="caption" fontWeight={500}>
                {label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          display: 'flex',
          gap: 1,
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        <IconButton
          size="small"
          sx={{ bgcolor: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            onPinClick?.();
          }}
        >
          <PushPinIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ bgcolor: 'white' }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Box>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'contain', p: 2 }}
        />
        <Countdown date={endDate} renderer={renderer} onComplete={() => { /* callback opcional */ }} />
        <CardContent>
          <Typography variant="h6" component="div" align="center">
            {title}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            {auctionState}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            {bidType}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AuctionItem;
