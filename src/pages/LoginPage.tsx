import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, Apple, Facebook } from "@mui/icons-material";
import illustration from "../assets/illustration.svg";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!username) {
      setUsernameError("Email is required");
      return false;
    }
    if (!emailRegex.test(username)) {
      setUsernameError("Enter a valid email address");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form is valid — no backend login implemented per requirements.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      navigate("/home", { state: { token } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      }}
    >
      {}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6 },
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: "#0b5392" }}>
            Welcome back!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            The easiest tasks or goals to finish first 
            with{" "}
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              Rayan's App
            </Box>
            
          </Typography>

          <TextField
            fullWidth
            placeholder="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
          />

          <TextField
            fullWidth
            placeholder="Password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              },
            }}
          />

          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Link href="#" underline="hover" variant="body2" color="text.secondary">
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              bgcolor: "#187cd3",
              "&:hover": { bgcolor: "#0B2033" },
            }}
          >
            Login
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
              or continue with
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton
              onClick={handleGoogleLogin}
              sx={{ bgcolor: "#187cd3", color: "#fff", "&:hover": { bgcolor: "#0B2033" } }}
            >
              <Google />
            </IconButton>
            <IconButton sx={{ bgcolor: "#187cd3", color: "#fff", "&:hover": { bgcolor: "#0B2033" } }}>
              <Apple />
            </IconButton>
            <IconButton sx={{ bgcolor: "#187cd3", color: "#fff", "&:hover": { bgcolor: "#0B2033" } }}>
              <Facebook />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            Not a member?{" "}
            <Link href="#" underline="hover" sx={{ color: "#3B82F6", fontWeight: 600 }}>
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>

      {}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "90%",
            bgcolor: "#EAF2FF",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            px: 4,
          }}
        >
          <Box
            component="img"
            src={illustration}
            alt="Productivity illustration"
            sx={{ maxWidth: "70%", height: "auto", mb: 3 }}
          />

          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center", mt: 3 }}>
            Make your work easier and organized
            <br />
            with <Box component="span" color="#3B82F6">Rayan's App</Box>
          </Typography>

          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 2.5,
              p: 2,
              mt: 2,
              boxShadow: "0 12px 30px rgba(18, 48, 74, 0.14)",
              width: 178,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#12304A" }}>
                Canva Design
              </Typography>
              <Typography variant="caption" sx={{ color: "#3B82F6", fontWeight: 700 }}>
                70%
              </Typography>
            </Box>
            <Box
              sx={{
                height: 6,
                bgcolor: "#E3EDFA",
                borderRadius: 3,
                overflow: "hidden",
                mt: 1.25,
              }}
            >
              <Box sx={{ width: "70%", height: "100%", bgcolor: "#3B82F6", borderRadius: 3 }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1.25 }}>
              <Typography variant="caption" color="text.secondary">
                10 Tasks
              </Typography>
              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: "#EAF2FF",
                  borderRadius: 5,
                  px: 1.5,
                  py: 0.35,
                  color: "#2563EB",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                Design
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}