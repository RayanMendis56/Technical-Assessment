import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button, Avatar, Divider } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function HomePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(state?.token ?? null);
  const [userInfo, setUserInfo] = useState<{
    name: string | null;
    email: string | null;
    photoURL: string | null;
  } | null>(null);

  useEffect(() => {
    // If the page is refreshed, `state` from navigate() is lost.
    // Firebase keeps the session, so we can recover the token from the current user.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        if (!token) {
          const freshToken = await user.getIdToken();
          setToken(freshToken);
        }
      } else {
        // No user logged in and no token passed in — go back to login
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate, token]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f7f8fa",
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: "100%", borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          {userInfo?.photoURL && (
            <Avatar src={userInfo.photoURL} sx={{ width: 56, height: 56 }} />
          )}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {userInfo?.name ?? "Logged in"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Access Token
        </Typography>
        <Box
          sx={{
            bgcolor: "#f1f3f5",
            borderRadius: 2,
            p: 2,
            wordBreak: "break-all",
            fontFamily: "monospace",
            fontSize: 13,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {token ?? "No token found"}
        </Box>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}