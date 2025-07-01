import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Autocomplete,
  Grid
} from "@mui/material";
import type { FormikProps } from "formik";
import type {
  Auction,
  AuctionFormValues,
  BidType,
  Category
} from "../interfaces/auctionInterface";

interface AuctionFormProps {
  formik: FormikProps<AuctionFormValues>;
  auction: Auction | null;
  open: boolean;
  bidTypes: BidType[];
  categories: Category[];
  handleClose: () => void;
}

export const AuctionForm = ({
  auction,
  formik,
  handleClose,
  open,
  bidTypes,
  categories,
}: AuctionFormProps) => {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {auction ? `Editar ${auction.product.name}` : "Publicación de Subasta"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Ingresa los datos necesarios para publicar tu subasta.
          </DialogContentText>
          <Grid container spacing={2}  >
            <Grid size={6} mt={2} display="flex" gap={2} flexDirection="column">

              <TextField
                name="product.name"
                label="Nombre del producto"
                value={formik.values.product.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.product?.name && Boolean(formik.errors.product?.name)}
                helperText={formik.touched.product?.name && formik.errors.product?.name}
                fullWidth
              />

              <TextField
                name="product.description"
                label="Descripción"
                value={formik.values.product.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                rows={4}
                error={
                  formik.touched.product?.description &&
                  Boolean(formik.errors.product?.description)
                }
                helperText={
                  formik.touched.product?.description &&
                  formik.errors.product?.description
                }
                fullWidth
              />
              <TextField
                select
                name="bidType"
                label="Tipo de puja"
                value={formik.values.bidType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bidType && Boolean(formik.errors.bidType)}
                helperText={formik.touched.bidType && formik.errors.bidType}
                fullWidth
              >
                {bidTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                name="price"
                label="Precio base"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                fullWidth
              />

              <TextField
                name="endDate"
                label="Fecha de cierre"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                fullWidth
              />

            </Grid>
            <Grid size={6}  mt={2} display="flex" gap={2} flexDirection="column">
              <Box>
                <Typography variant="subtitle2">Imagen del producto</Typography>
                <Button variant="outlined" component="label">
                  Subir Imagen
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      formik.setFieldValue("image", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => formik.setFieldValue("imagePreview", reader.result);
                        reader.onerror = () => formik.setFieldValue("imagePreview", "");
                      } else {
                        formik.setFieldValue("imagePreview", "");
                      }
                    }}
                  />
                </Button>

                {formik.values.imagePreview && (
                  <Box mt={1}>
                    <img
                      src={formik.values.imagePreview}
                      alt="preview"
                      style={{ maxHeight: 120, borderRadius: 8 }}
                    />
                    <Typography variant="caption">
                      {formik.values.image?.name}
                    </Typography>
                  </Box>
                )}

                {formik.touched.image && formik.errors.image && (
                  <Typography variant="caption" color="error">
                    {formik.errors.image as string}
                  </Typography>
                )}
              </Box>

              <TextField
                select
                name="product.mainCategory"
                label="Categoría Principal"
                value={formik.values.product.mainCategory}
                onChange={(e) => {
                  const newMain = e.target.value;
                  const prevMain = formik.values.product.mainCategory;
                  const currentCats = formik.values.product.categories;

                  const updatedCats = currentCats
                    .filter((cat) => cat !== prevMain)
                    .concat(!currentCats.includes(newMain) ? [newMain] : []);

                  formik.setFieldValue("product.mainCategory", newMain);
                  formik.setFieldValue("product.categories", updatedCats);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.product?.mainCategory &&
                  Boolean(formik.errors.product?.mainCategory)
                }
                helperText={
                  formik.touched.product?.mainCategory &&
                  formik.errors.product?.mainCategory
                }
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>

              <Autocomplete
                multiple
                options={categories.map((cat) => cat.name)}
                value={formik.values.product.categories}
                onChange={(_e, value) => {
                  // No permitir eliminar la categoría principal
                  const filtered = value.includes(formik.values.product.mainCategory)
                    ? value
                    : [...value, formik.values.product.mainCategory];
                  formik.setFieldValue("product.categories", filtered);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const isMain = option === formik.values.product.mainCategory;
                    return (
                      <Box
                        key={option}
                        component="span"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: isMain ? "primary.light" : "#e0e0e0",
                          borderRadiuss: 1,
                          px: 1.5,
                          py: 0.5,
                          mr: 0.5
                        }}
                      >
                        <Typography variant="body2">{option}</Typography>
                        {!isMain && (
                          <Box
                            {...getTagProps({ index })}
                            key={option}
                            component="span"
                            sx={{ cursor: "pointer", ml: 1 }}
                          >
                            X
                          </Box>
                        )}
                      </Box>
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categorías secundarias"
                    error={
                      formik.touched.product?.categories &&
                      Boolean(formik.errors.product?.categories)
                    }
                    helperText={
                      formik.touched.product?.categories &&
                      (formik.errors.product?.categories as string)
                    }
                  />
                )}
              />

            </Grid>
          </Grid>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {auction ? "Publicar Cambios" : "Publicar Subasta"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
