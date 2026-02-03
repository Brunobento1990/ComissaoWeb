import { Typography } from "@mui/material";
import { useThemeApp } from "../../hooks/UseThemeApp";

interface propsText {
  titulo: string;
  height?: string;
  marginTop?: string;
  fontSize?: string;
  fontWeight?: number;
  color?:
    | "success"
    | "info"
    | "warning"
    | "error"
    | "primary"
    | "secondary"
    | "textDisabled"
    | "textPrimary"
    | "textSecondary"
    | string;
  width?: string;
  textAlign?: string;
  marginBotton?: string;
  marginLeft?: string;
  borderBottom?: string;
  padding?: string;
  overflow?: string;
  textOverflow?: string;
  hover?: any;
  verticalAlign?: string;
  maxWidth?: string;
  whiteSpace?: string;
  textDecoration?: string;
  minWidth?: string;
}

export function TextApp(props: propsText) {
  const { cores } = useThemeApp();
  return (
    <Typography
      variant="body2"
      fontSize={props.fontSize}
      height={props.height}
      marginTop={props.marginTop}
      fontWeight={props.fontWeight}
      color={props.color ?? cores.text.primary}
      width={props.width}
      textAlign={props.textAlign as any}
      marginBottom={props.marginBotton}
      marginLeft={props.marginLeft}
      borderBottom={props.borderBottom}
      padding={props.padding}
      overflow={props.overflow}
      textOverflow={props.textOverflow}
      sx={{
        ":hover": props.hover,
        verticalAlign: props.verticalAlign,
        whiteSpace: props.whiteSpace,
        textDecoration: props.textDecoration,
      }}
      maxWidth={props.maxWidth}
      minWidth={props.minWidth}
    >
      {props.titulo}
    </Typography>
  );
}
