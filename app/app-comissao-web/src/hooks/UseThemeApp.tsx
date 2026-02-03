import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function useThemeApp() {
  const theme = useTheme();
  const celular = !useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const tablet = !useMediaQuery("(min-width:1300px)");
  return {
    borderRadius: `${theme.shape.borderRadius}px`,
    backgroundColor: {
      default: theme.palette.background.default,
      card: theme.palette.background.paper,
    },
    shadow: theme.shadows[2],
    cores: {
      divider: theme.palette.divider,
      primary: {
        ...theme.palette.primary,
      },
      text: {
        ...theme.palette.text,
      },
      warning: theme.palette.warning.light,
      error: theme.palette.error.main,
      success: theme.palette.success.main,
      info: theme.palette.info.main,
    },
    isCelular: celular,
    isTablet: tablet,
  };
}
