import {
  Box,
  Card,
  CardContent,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import useSignIn from "../../hooks/useSignIn";

export default function SignInPage() {
  const { isLoading, formik, showPassword, handleClickShowPassword, navigate } = useSignIn();

  return (
    <Container maxWidth="xs">
      <Box>
        <Card
          sx={{
            marginTop: 20,
            padding: 4,
            textAlign: "center",
            boxShadow: 3,
            paddingBottom: 8,
            borderRadius: 5
          }}
        >
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="input-user-textfield"
                label="Email or Nickname"
                placeholder="Igrese su email o nickname"
                variant="filled"
                name="user"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user}
                helperText={formik.touched.user && formik.errors.user}
                error={formik.touched.user && Boolean(formik.errors.user)}
                sx={{ marginBottom: 3, borderRadius: 10 }}
                disabled={isLoading}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ marginBottom: 1, borderRadius: 10 }}
                error={formik.touched.password && Boolean(formik.errors.password)}
              >
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  name="password"
                  placeholder="Igrese su Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isLoading}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={handleClickShowPassword}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography
                    variant="caption"
                    sx={{ textAlign: "left", marginLeft: "1em" }}
                    color="error"
                  >
                    {formik.errors.password}
                  </Typography>
                )}
              </FormControl>

              <Box sx={{ marginTop: 2 }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: "75%",
                    height: "3rem",
                    fontSize: "1rem",
                    borderRadius: 20,
                    backgroundColor: "#1E8BC3",
                    color: "#fff",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {isLoading ? "Iniciando..." : "Iniciar Sesión"}
                </button>
              </Box>
            </form>

            <Typography sx={{ marginTop: 3, fontSize: '0.9rem' }}>
              ¿No tienes una cuenta?{" "}
              <Typography
                component="span"
                sx={{
                  color: "#1E8BC3",
                  fontWeight: 500,
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
                onClick={() => navigate("/signUp")}
              >
                Crea una
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
