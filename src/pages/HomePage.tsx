import {
  Container, Grid, Typography, CircularProgress, Autocomplete, TextField, Select,
  MenuItem, Paper, Stack, InputAdornment, FormControl, InputLabel, Box, Divider,
  Button, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import AuctionItem from "../components/AuctionItem";
import { useAuctionsCatalog } from "../hooks/useAuctionsCatalog";
import { AuctionForm } from "../components/AuctionForm";
import { useState } from "react";

export default function HomePage() {
  const {
    data, filterData, filters, isLoading,
    isAdmin, auctionForm, pinActions, navAuction, closeAuction, deleteAuction
  } = useAuctionsCatalog();

  const [view, setView] = useState<"catalog" | "history">("catalog");

  return isLoading ? (
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
      <AuctionForm
        auction={auctionForm.auction}
        formik={auctionForm.formik}
        open={auctionForm.open}
        handleClose={auctionForm.handleClose}
        bidTypes={filterData.bidTypes}
        categories={filterData.categories}
      />

      {/* FIJADOS */}
      {data.pinnedCatalog.length > 0 && (
        <>
          <Box sx={{ position: 'relative', textAlign: 'center', mt: 2, mb: 4 }}>
            <Divider>
              <Typography variant="h6" sx={{ letterSpacing: 2 }}>
                FIJADOS
              </Typography>
            </Divider>
            <KeyboardArrowDownIcon sx={{
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'primary.main'
            }} />
          </Box>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {data.pinnedCatalog.map((auction) => (
              <Grid key={auction.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <AuctionItem
                  image={auction.product.image}
                  title={auction.product.name}
                  auctionState={auction.state}
                  bidType={auction.bidType}
                  category={auction.product.mainCategory}
                  timeLeft={new Date(auction.endDate)}
                  onPinClick={() => pinActions(auction)}
                  onClick={() => navAuction(auction.id)}
                  visibility={isAdmin}
                  onEditClick={() => auctionForm.handleEdit(auction)}
                  onClose={() => { closeAuction(auction.id) }}
                  onDeleteClick={() => { deleteAuction(auction.id) }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_e, next) => {
            if (next) setView(next);
          }}
          color="primary"
        >
          <ToggleButton value="catalog">Catálogo</ToggleButton>
          <ToggleButton value="history">Historial</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ position: 'relative', textAlign: 'center', mt: 2, mb: 3 }}>
        <Divider>
          <Typography variant="h6" sx={{ letterSpacing: 2 }}>
            SUBASTAS
          </Typography>
        </Divider>
        <KeyboardArrowDownIcon sx={{
          position: 'absolute',
          bottom: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'primary.main'
        }} />
      </Box>

      {view === "catalog" && (<Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
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
              onChange={(e) => filters.setAuctionsStateFilter(e.target.value || null)}
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
              onChange={(e) => filters.setBidTypeFilter(e.target.value || null)}
              startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
            >
              <MenuItem value="">Todos</MenuItem>
              {filterData.bidTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {isAdmin && (
            <Button variant="contained" sx={{ minWidth: 150 }} onClick={auctionForm.handleOpen}>
              Publicar Subasta
            </Button>
          )}
        </Stack>
      </Paper>)}

      <Grid container spacing={2}>
        {(view === "catalog" ? data.filteredCatalog : data.auctionsHistory).map((auction) => (
          <Grid key={auction.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <AuctionItem
              image={auction.product.image}
              title={auction.product.name}
              auctionState={auction.state}
              bidType={auction.bidType}
              timeLeft={new Date(auction.endDate)}
              onPinClick={() => pinActions(auction)}
              onClick={() => navAuction(auction.id)}
              category={auction.product.mainCategory}
              visibility={isAdmin}
              onEditClick={() => auctionForm.handleEdit(auction)}
              onClose={() => { closeAuction(auction.id) }}
              onDeleteClick={() => { deleteAuction(auction.id) }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
