import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsFormItemRow {
  children: ReactNode;
  xs?: number;
  sm?: number;
  marginTop?: string;
}

export function FormItemRow(props: propsFormItemRow) {
  return (
    <Grid
      size={{ xs: props.xs ?? 12, sm: props.sm ?? 6 }}
      marginTop={props.marginTop}
    >
      {props.children}
    </Grid>
  );
}
