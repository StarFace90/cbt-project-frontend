// theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f5f5f5" },
          }
        : {
            background: { default: "#121212" },
          }),
    },
  });
