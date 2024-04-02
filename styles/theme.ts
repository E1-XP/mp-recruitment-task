"use client";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig, { Colors, DefaultColors } from "../tailwind.config";
import { createTheme } from "@mui/material";

const tw = resolveConfig(tailwindConfig);

export const { theme } = tw as unknown as {
  theme: (typeof tw)["theme"] & { colors: DefaultColors & Colors };
};

export const MUITheme = createTheme({
  palette: {
    primary: { main: theme.colors.primary },
    secondary: { main: theme.colors.secondary },
  },
});
