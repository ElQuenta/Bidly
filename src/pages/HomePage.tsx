import { Container, Grid, Typography, CircularProgress, Autocomplete, TextField, Select, MenuItem, Paper, Stack, InputAdornment, FormControl, InputLabel, Box, Divider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import AuctionItem from "../components/AuctionItem";
import { useAuctionsCatalog } from "../hooks/useAuctionsCatalog";

export default function HomePage() {
  const { data, filterData, filters, isLoading, pinActions, navAuction} = useAuctionsCatalog()

  return (
    isLoading ? (
      <Container sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <CircularProgress size="8rem" />
      </Container>
    ) : (
      <Container sx={{ py: 4 }}>
        <Box sx={{ position: 'relative', textAlign: 'center', mt: 2, mb: 4 }}>
          <Divider>
            <Typography variant="h6" sx={{ letterSpacing: 2 }}>
              FIJADOS
            </Typography>
          </Divider>
          <KeyboardArrowDownIcon sx={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', color: 'primary.main' }} />
        </Box>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {data.pinnedCatalog.map((auction) => (
            <Grid key={auction.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <AuctionItem
                image={auction.product.image}
                title={auction.product.name}
                auctionState={auction.state}
                bidType={auction.bidType}
                timeLeft={new Date(auction.endDate)}
                onPinClick={() => pinActions(auction)}
                onClick={()=>navAuction(auction.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ position: 'relative', textAlign: 'center', mt: 2, mb: 3 }}>
          <Divider>
            <Typography variant="h6" sx={{ letterSpacing: 2 }}>
              SUBASTAS
            </Typography>
          </Divider>
          <KeyboardArrowDownIcon sx={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', color: 'primary.main' }} />
        </Box>

        <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField
              value={filters.productFilter}
              placeholder="Ingresa el nombre del producto"
              label="Buscar"
              onChange={(e) => filters.setProductFilter(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />

            <Autocomplete
              multiple
              options={filterData.categories}
              getOptionLabel={(option) => option.name}
              value={filters.categoriesFilter}
              onChange={(_e, value) => filters.setCategoriesFilter(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categorías"
                  placeholder="Selecciona..."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
              sx={{ minWidth: 200 }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={filters.auctionsStateFilter || ''}
                label="Estado"
                onChange={(e) => {
                  const state = e.target.value
                  filters.setAuctionsStateFilter(state || null)
                }}
                startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="">Todos</MenuItem>
                {filterData.auctionsStates.map((state) => (
                  <MenuItem key={state.id} value={state.name}>{state.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Tipo de Puja</InputLabel>
              <Select
                value={filters.bidTypeFilter || ''}
                label="Tipo de Puja"
                onChange={(e) => {
                  const type = e.target.value
                  filters.setBidTypeFilter(type || null)
                }}
                startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="">Todos</MenuItem>
                {filterData.bidTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Auction Items Grid */}
        <Grid container spacing={2}>
          {data.filteredCatalog.map((auction) => (
            <Grid key={auction.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <AuctionItem
                image={auction.product.image}
                title={auction.product.name}
                auctionState={auction.state}
                bidType={auction.bidType}
                timeLeft={new Date(auction.endDate)}
                onPinClick={() => pinActions(auction)}
                onClick={()=>navAuction(auction.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  )
}
