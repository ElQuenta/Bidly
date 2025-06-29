import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { VisibilityOff, Visibility, Person, AdminPanelSettings } from "@mui/icons-material";
import useSignUp from "../../hooks/useSignUp";

export default function SignUpPage() {
  const { isLoading, formik, showPassword, showRepatPassword, handleClickShowPassword, handleClickShowRepeatPassword, navigate } = useSignUp();

  return (
    <Container sx={{
      minHeight: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Box
        maxWidth="60%"
      >
        <Card
          sx={{
            padding: 4,
            textAlign: "center",
            boxShadow: 3,
            paddingBottom: 4,
            borderRadius: 5
          }}
        >
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ sm: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    id="input-nickname-textfield"
                    label="Nickname"
                    placeholder="Igrese su NickName"
                    variant="filled"
                    name="nickname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nickname}
                    helperText={formik.touched.email && formik.errors.nickname}
                    error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                    sx={{ marginBottom: 1, borderRadius: 10 }}
                    disabled={isLoading}
                  />
                  <Grid container spacing={2}>
                    <Grid size={{ sm: 6, xs: 12 }}>
                      <TextField
                        fullWidth
                        id="input-name-textfield"
                        label="Nombre"
                        placeholder="Igrese su nombre"
                        variant="filled"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        helperText={formik.touched.name && formik.errors.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        sx={{ marginBottom: 1, borderRadius: 10 }}
                        disabled={isLoading}
                      />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                      <TextField
                        fullWidth
                        id="input-lastname-textfield"
                        label="Apellido"
                        placeholder="Igrese su email"
                        variant="filled"
                        name="lastname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastname}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        sx={{ marginBottom: 1, borderRadius: 10 }}
                        disabled={isLoading}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    id="input-email-textfield"
                    label="Email"
                    placeholder="Igrese su email"
                    variant="filled"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    sx={{ marginBottom: 1, borderRadius: 10 }}
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
                  <FormControl
                    fullWidth
                    variant="filled"
                    sx={{ marginBottom: 1, borderRadius: 10 }}
                    error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                  >
                    <InputLabel htmlFor="filled-adornment-repeatPassword">Password</InputLabel>
                    <FilledInput
                      id="filled-adornment-repeat-password"
                      name="repeatPassword"
                      placeholder="Igrese su Contraseña"
                      type={showRepatPassword ? "text" : "password"}
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isLoading}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showRepatPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            onClick={handleClickShowRepeatPassword}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showRepatPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                      <Typography
                        variant="caption"
                        sx={{ textAlign: "left", marginLeft: "1em" }}
                        color="error"
                      >
                        {formik.errors.repeatPassword}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={{ sm: 12, md: 6 }}>
                  <Box sx={{ textAlign: 'left', marginBottom: 2 }}>
                    <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                      Selecciona tu rol
                    </Typography>
                    <Grid container>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <ToggleButtonGroup
                          color="primary"
                          value={formik.values.role}
                          exclusive
                          onChange={(_, newValue) => {
                            formik.setFieldValue('role', newValue)
                          }}
                          aria-label="Rol"
                          fullWidth
                        >
                          <ToggleButton value="user" fullWidth>
                            <Person sx={{ marginRight: 1 }} />
                            User
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }} >
                        <ToggleButtonGroup
                          color="primary"
                          value={formik.values.role}
                          exclusive
                          onChange={(_, newValue) => {
                            formik.setFieldValue('role', newValue)
                          }}
                          aria-label="Rol"
                          fullWidth
                        >
                          <ToggleButton value="admin" fullWidth>
                            <AdminPanelSettings sx={{ marginRight: 1 }} />
                            Admin
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    </Grid>
                    {formik.touched.role && formik.errors.role && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ display: 'block', marginTop: 0.5, marginLeft: 1 }}
                      >
                        {formik.errors.role}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ mt: 2, textAlign: 'left' }}>
                    <Typography variant="subtitle2">Avatar (opcional)</Typography>
                    <Button variant="outlined" component="label" disabled={isLoading} sx={{ mt: 1 }}>
                      Subir Imagen
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        name="avatar"
                        onChange={e => {
                          const file = e.currentTarget.files?.[0] ?? null
                          formik.setFieldValue('avatar', file)
                          if (file) {
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = () => formik.setFieldValue('avatarPreview', reader.result)
                            reader.onerror = () => formik.setFieldValue('avatarPreview', '')
                          } else {
                            formik.setFieldValue('avatarPreview', '')
                          }
                        }}
                      />
                    </Button>
                    {formik.values.avatarPreview && (
                      <Box mt={1} flexDirection="column">
                        <img src={formik.values.avatarPreview!} alt="preview" style={{ maxHeight: 120, borderRadius: 8 }} />
                        <Typography variant="caption">{formik.values.avatar?.name}</Typography>
                      </Box>
                    )}
                    {formik.touched.avatar && formik.errors.avatar && (
                      <Typography variant="caption" color="error">{formik.errors.avatar}</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
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
                  {isLoading ? "Creando Cuenta..." : "Crear Cuenta"}
                </button>
              </Box>
            </form>

            <Typography sx={{ marginTop: 3, fontSize: '0.9rem' }}>
              ¿Ya tienes una cuenta?{" "}
              <Typography
                component="span"
                sx={{
                  color: "#1E8BC3",
                  fontWeight: 500,
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
                onClick={() => navigate("/signIn")}
              >
                Inicia Sesión
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
