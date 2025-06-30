import {
  AppBar, Toolbar, Button, Grid,
  Avatar, Popover, Box, List,
  CircularProgress,
  Typography,
  IconButton,
  Badge,
  badgeClasses,
  styled
} from "@mui/material";
import { Notifications, NotificationsActive, Cached } from '@mui/icons-material';


import { useNavBar } from "../hooks/useNavBar";
import NotificacionComponent from "../components/NoficationComponent";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Navbar = () => {

  const { user, anchorUser, anchorNotif, notifications, notReaded, isLoading, error, handleRefresh, archiveNotification, markNotificationAsReaded, signOut, handleUserClick, handleUserClose, handleNotifClick, handleNotifClose } = useNavBar()

  return (
    <AppBar position="fixed" sx={{ height: 70 }} color="primary">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between" width="100%">
          <Grid >

          </Grid>
          <Grid >
            <Grid container alignItems="center" spacing={2}>
              <Grid >
                <IconButton
                  onClick={handleNotifClick}
                >
                  <Avatar
                    sx={(theme) => ({ cursor: 'pointer', width: 40, height: 40, bgcolor: theme.palette.secondary.main })}
                  >
                    {notReaded.length === 0 ? <Notifications /> : <NotificationsActive />}
                  </Avatar>
                  <CartBadge badgeContent={notReaded.length} color="error" overlap="circular" />
                </IconButton>
              </Grid>
              <Grid >
                <Avatar
                  src={user.avatar && user.avatar}
                  onClick={handleUserClick}
                  sx={{ cursor: 'pointer', width: 40, height: 40 }}
                >
                  {!user.avatar && user.nickname.charAt(0)}
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>

      <Popover
        open={Boolean(anchorNotif)}
        anchorEl={anchorNotif}
        onClose={handleNotifClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 400, height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid #ddd',
            bgcolor: 'background.paper',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}>
            <Grid container >
              <Grid size={8}>
                <strong>Notificaciones</strong> ({notReaded.length} sin leer)
              </Grid>
              <Grid size={4} display="flex" justifyContent="flex-end">
                <Avatar onClick={handleRefresh} sx={(theme) => ({ cursor: 'pointer', bgcolor: theme.palette.primary.main })}>
                  <Cached />
                </Avatar>
              </Grid>
            </Grid>

          </Box>

          <Box sx={{ overflowY: 'auto', flex: 1 }}>
            <List dense>
              {isLoading ? <CircularProgress /> : notifications.map((n) => (
                <NotificacionComponent
                  key={n.id}
                  message={n.message}
                  readed={n.readed}
                  type={n.type}
                  auction={n.auction}
                  onArchive={() => archiveNotification(n.id)}
                  onClick={() => markNotificationAsReaded(n.id)}
                />
              ))}
              {error ? <Typography>Algo Salio Mal</Typography> : <></>}
            </List>
          </Box>
        </Box>
      </Popover>


      <Popover
        open={Boolean(anchorUser)}
        anchorEl={anchorUser}
        onClose={handleUserClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box display="flex" flexDirection="column" gap={1} sx={{ width: 100, p: 1 }}>
          <Button variant="outlined" fullWidth onClick={signOut}>Logout</Button>

        </Box>
      </Popover>

    </AppBar>
  );
};
export default Navbar;