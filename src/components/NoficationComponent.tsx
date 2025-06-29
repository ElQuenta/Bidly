import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@mui/material";
import {
  Alarm,
  Cancel,
  Delete,
  LocalAtm,
  CheckCircle,
  NewReleases
} from "@mui/icons-material";

interface NotificacionProps {
  message: string;
  type: string;
  readed: boolean;
  auction: string;
  onArchive: () => void;
  onClick: () => void;
}

const getIconByType = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    NearEnd: <Alarm />,
    LostBid: <Cancel />,
    BidPlaced: <LocalAtm />,
    BidWon: <CheckCircle />
  };
  return icons[type] || <NewReleases />;
};

const NotificacionComponent = ({
  message,
  readed,
  type,
  auction,
  onArchive,
  onClick
}: NotificacionProps) => {
  return (
    <ListItem
      sx={{
        bgcolor: readed ? "background.paper" : "rgba(25, 118, 210, 0.1)",
        borderLeft: readed ? "none" : "4px solid #1976d2",
        transition: "background 0.3s ease",
        alignItems: "flex-start"
      }}
      onClick={onClick}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onArchive}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: readed ? "grey.300" : "primary.main",
            color: readed ? "text.primary" : "common.white"
          }}
        >
          {getIconByType(type)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={message}
        secondary={auction}
      />
    </ListItem>
  );
};

export default NotificacionComponent;