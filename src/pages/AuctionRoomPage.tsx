import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useAuctionRoom } from "../hooks/useAuctionRoom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Countdown, { type CountdownRendererFn } from "react-countdown";
import GavelIcon from '@mui/icons-material/Gavel';
import { BidForm } from "../components/BidForm";
export default function AuctionRoomPage() {
  const { auction, bids, formik, maxBid, isLoading, open, handleClick, handleClose } = useAuctionRoom();


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

    const months = Math.floor(days / 30);
    const remainingDaysAfterMonths = days % 30;

    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const remainingDays = remainingDaysAfterMonths % 7;

    const timeParts = [
      { val: months, label: 'months' },
      { val: weeks, label: 'weeks' },
      { val: remainingDays, label: 'days' },
      { val: hours, label: 'hours' },
      { val: minutes, label: 'minutes' },
      { val: seconds, label: 'seconds' },
    ];

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
        <Grid container spacing={1}>
          {timeParts.map(({ val, label }) => (
            <Grid size={{ xs: 4, sm: 2 }} key={label}>
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

  if (isLoading) {
    return (
      <Container sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <CircularProgress size="8rem" />
      </Container>
    );
  }

  if (!auction || !auction.product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Subasta no encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Puede que la subasta haya sido eliminada o que el enlace sea incorrecto.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <BidForm bidType={auction.bidType} formik={formik} maxBid={maxBid} open={open} handleClose={handleClose} />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 0, position: "relative", overflow: "hidden" }}>
            {auction.product.image ? (
              <>
                {/* Imagen del producto */}
                <CardMedia
                  component="img"
                  image={auction.product.image}
                  alt={auction.product.name ?? ""}
                  height="350"
                  sx={{ objectFit: 'contain', p: 2, backgroundColor: '#fafafa' }}
                />

                {/* Precio base flotante */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "primary.main",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    Precio base: ${auction.price.toFixed(2)}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0"
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Imagen no disponible
                </Typography>
              </Box>
            )}
          </Card>


          <Box sx={{ position: 'relative', textAlign: 'center', mt: 2, mb: 4 }}>
            <Divider>
              <Typography variant="h6" sx={{ letterSpacing: 2 }}>
                {auction.product.name ?? ""}
              </Typography>
            </Divider>
            <KeyboardArrowDownIcon
              sx={{
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'primary.main'
              }}
            />
          </Box>

          {auction.endDate && (
            <Countdown date={new Date(auction.endDate)} renderer={renderer} />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              maxHeight: 'calc(100dvh - 200px)',
              overflowY: 'auto',
              pr: 1
            }}
          >
            {auction.product.categories && (
              <Box marginBottom={3}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Categorías
                </Typography>

                <Box
                  sx={{
                    backgroundColor: '#f9f9f9',
                    p: 2,
                    borderRadius: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  {auction.product.categories.map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      color={category === auction.product.mainCategory ? "primary" : "default"}
                      variant={category === auction.product.mainCategory ? "filled" : "outlined"}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box marginBottom={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Descripción del Producto
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  backgroundColor: "#f5f5f5",
                  p: 2,
                  borderRadius: 2,
                  color: "text.primary",
                  lineHeight: 1.6
                }}
              >
                {auction.product.description ?? "Este producto no tiene una descripción disponible."}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop={4}
              marginBottom={2}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Ofertas
              </Typography>

              <Button
                variant="contained"
                color="primary"
                disabled={auction.state !== "current bid"}
                onClick={handleClick}
              >
                Publicar oferta
              </Button>
            </Box>
            {bids && bids.length > 0 ? (
              <Stack spacing={2}>
                {bids.map((bid, index) => (
                  <Card
                    key={bid.id}
                    variant="outlined"
                    sx={{ display: 'flex', alignItems: 'center', p: 2 }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <GavelIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        Oferta #{index + 1}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${bid.bid.toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID de usuario: {bid.userId.slice(0, 6)}...
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Box
                sx={{
                  height: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 2,
                  mt: 2
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Aún no hay ofertas registradas
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
