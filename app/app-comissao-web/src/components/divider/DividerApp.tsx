import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { ReactNode } from "react";

export type tipoCursor =
  | "auto"
  | "default"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "e-resize"
  | "n-resize"
  | "ne-resize"
  | "nw-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "w-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "col-resize"
  | "row-resize"
  | "all-scroll"
  | "zoom-in"
  | "zoom-out"
  | "grab"
  | "grabbing";

interface propsDividerApp {
  chip?: string;
  marginTop?: string;
  heigth?: string;
  width?: string;
  marginBotton?: string;
  cor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  variantChip?: "filled" | "outlined";
  children?: ReactNode;
  icon?: string;
  cursorChip?: tipoCursor;
}

interface propsChipApp {
  titulo: string;
  cor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  variantChip?: "filled" | "outlined";
  delete?: () => void;
  deleteIcon?: React.ReactElement;
}

export function ChipApp(props: propsChipApp) {
  return (
    <Chip
      color={props.cor}
      variant={props.variantChip}
      label={props.titulo}
      size="small"
      onDelete={props.delete}
      deleteIcon={props.deleteIcon}
    />
  );
}

export function DividerApp(props: propsDividerApp) {
  const sx = {
    marginTop: props.marginTop,
    height: props.heigth,
    width: props.width,
    marginBottom: props.marginBotton,
  };

  if (!props.chip) return <Divider sx={sx} />;

  return (
    <Divider sx={sx}>
      <Chip
        color={props.cor ?? "primary"}
        variant={props.variantChip}
        label={props.chip}
        size="small"
        sx={{
          "&:hover": {
            cursor: props.cursorChip,
          },
        }}
      />
      {props.children}
    </Divider>
  );
}
