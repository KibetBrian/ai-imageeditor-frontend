"use client";
import { createTheme } from "@mui/material/styles";

import typography from "./typography";

const theme = createTheme({
  //@ts-ignore
  typography: typography,
});

export default theme;
