import {
  Box, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  MenuItem, TextField, Typography
} from "@mui/material";
import type { FormikProps } from "formik";
import { type ChangeEvent, useState } from "react";

interface BidFormProps {
  formik: FormikProps<{ bid: number }>;
  maxBid: number;
  bidType: string;
  open: boolean;
  handleClose: () => void;
}

export const BidForm = ({
  formik,
  maxBid,
  bidType,
  open,
  handleClose
}: BidFormProps) => {
  const [percentage, setPercentage] = useState<number | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPercentage(value);

    if (value >= 10 && value <= 100) {
      const newBid = maxBid + (maxBid * (value / 100));
      formik.setFieldValue("bid", Math.round(newBid));
    }
  };

  const handleProxyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMultiplier(value);

    const newBid = Math.round(maxBid * value);
    formik.setFieldValue("bid", newBid);
  };

  const renderBidInput = () => {
    switch (bidType) {
      case "fixed increment":
        return (
          <TextField
            type="number"
            fullWidth
            label="Puja fija"
            name="bid"
            value={formik.values.bid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bid && Boolean(formik.errors.bid)}
            helperText={formik.touched.bid && formik.errors.bid}
          />
        );

      case "percentage increment":
        return (
          <>
            <TextField
              type="number"
              fullWidth
              label="% de incremento"
              inputProps={{ min: 10, max: 100 }}
              value={percentage ?? ""}
              onChange={handlePercentageChange}
              error={formik.touched.bid && Boolean(formik.errors.bid)}
              helperText={formik.touched.bid && formik.errors.bid}
            />
            {percentage && percentage >= 10 && percentage <= 100 && (
              <Typography mt={1}>
                Oferta calculada: <strong>${formik.values.bid}</strong>
              </Typography>
            )}
          </>
        );

      case "automatic proxy": {
        const options = [1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
        return (
          <>
            <TextField
              select
              fullWidth
              label="Multiplicador"
              value={multiplier ?? ""}
              onChange={handleProxyChange}
            >
              {options.map((mult) => (
                <MenuItem key={mult} value={mult}>
                  {`${mult}x → $${Math.round(maxBid * mult)}`}
                </MenuItem>
              ))}
            </TextField>
            {multiplier && (
              <Typography mt={1}>
                Oferta calculada: <strong>${formik.values.bid}</strong>
              </Typography>
            )}
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Realizar una puja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa tu oferta según el tipo de puja seleccionado.
          </DialogContentText>
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            {renderBidInput()}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Pujar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
