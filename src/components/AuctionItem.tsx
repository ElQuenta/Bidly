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
import Countdown, { type CountdownRendererFn } from 'react-countdown';
import type { JSX } from 'react';
import {
  PushPin as PushPinIcon,
  Search as SearchIcon,
  Devices as DevicesIcon,
  Checkroom as FashionIcon,
  Chair as HomeIcon,
  SportsSoccer as SportsIcon,
  Toys as ToysIcon,
  Build as ToolsIcon,
  MenuBook as BooksIcon,
  Face as BeautyIcon,
  SportsEsports as GamesIcon,
  MusicNote as MusicIcon,
  Movie as MoviesIcon,
  Brush as ArtIcon,
  AutoAwesome as CollectiblesIcon,
  Favorite as HealthIcon,
  Pets as PetsIcon,
  DirectionsCar as AutomotiveIcon,
  Yard as GardenIcon,
  Work as OfficeIcon,
  FlightTakeoff as TravelIcon,
  Piano as InstrumentsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";

const iconCategory = (category: string) => {
  const menu: { [key: string]: JSX.Element } = {
    "Electrónica": <DevicesIcon />,
    "Moda": <FashionIcon />,
    "Hogar": <HomeIcon />,
    "Deportes": <SportsIcon />,
    "Juguetes": <ToysIcon />,
    "Herramientas": <ToolsIcon />,
    "Libros": <BooksIcon />,
    "Belleza": <BeautyIcon />,
    "Videojuegos": <GamesIcon />,
    "Música": <MusicIcon />,
    "Películas": <MoviesIcon />,
    "Arte": <ArtIcon />,
    "Coleccionables": <CollectiblesIcon />,
    "Salud": <HealthIcon />,
    "Mascotas": <PetsIcon />,
    "Automotriz": <AutomotiveIcon />,
    "Jardín": <GardenIcon />,
    "Oficina": <OfficeIcon />,
    "Viajes": <TravelIcon />,
    "Instrumentos": <InstrumentsIcon />,
  };
  return menu[category] || <SearchIcon />;
};

interface AuctionItemProps {
  image: string;
  title: string;
  auctionState: string;
  category: string;
  bidType: string;
  timeLeft: Date;
  visibility: boolean;
  onClick?: () => void;
  onPinClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onClose?: ()=>void;
}

const AuctionItem = ({
  image,
  title,
  auctionState,
  bidType,
  category,
  visibility,
  timeLeft: endDate,
  onClick,
  onPinClick,
  onEditClick,
  onDeleteClick,
  onClose
}: AuctionItemProps) => {
  const renderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      onClose?.()
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
        <IconButton size="small" sx={{ bgcolor: 'white' }}>
          {iconCategory(category)}
        </IconButton>
      </Box>
      {visibility && (<Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          zIndex: 2,
        }}
      >
        <IconButton
          size="small"
          sx={{ bgcolor: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            onEditClick?.();
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ bgcolor: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick?.();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>)
      }

      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'contain', p: 2 }}
        />
        <Countdown date={endDate} renderer={renderer} />
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
