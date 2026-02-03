/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconApp } from "../icon/IconApp";
import { TextApp } from "../text/TextApp";
import { ButtonApp } from "../buttons/ButtonApp";
import { BoxApp } from "../box/BoxApp";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

let close: () => void;
let show: (args?: IModalShow) => void;
let action: (() => void) | undefined;
let actionPromise: (() => Promise<any>) | undefined;
let actionClose: (() => void) | undefined;

interface IModalShow {
  mensagem?: string | string[];
  textoButton?: string;
  confirmed?: () => void;
  confirmarPromise?: () => Promise<any>;
  closeConfirmed?: () => void;
}

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Modal() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [textoButton, setTextoButton] = useState<string>("Sim");
  const [mensagem, setMensagem] = useState<string | string[]>(
    "Deseja realmente inativar o registro?",
  );

  show = async (args?: IModalShow) => {
    setOpen(true);
    actionPromise = args?.confirmarPromise as any;
    action = args?.confirmed as any;
    if (args?.mensagem) {
      setMensagem(args.mensagem);
    }

    if (args?.closeConfirmed) {
      actionClose = args.closeConfirmed;
    }

    if (args?.textoButton) {
      setTextoButton(args.textoButton);
    }
  };

  const cleanup = () => {
    actionClose = undefined;
    action = undefined;
    actionPromise = undefined;
    setMensagem("Deseja realmente inativar o registro?");
    setTextoButton("Sim");
    setLoading(false);
  };

  close = () => {
    if (actionClose) {
      actionClose();
    }
    setOpen(false);
    cleanup();
  };

  async function click() {
    if (action) {
      action();
    }
    if (actionPromise) {
      setLoading(true);
      await actionPromise();
      setLoading(false);
    }
    setOpen(false);
    cleanup();
  }

  if (!open) {
    return null;
  }

  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Atenção
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <IconApp icon="mdi:close" />
      </IconButton>
      <DialogContent dividers>
        {Array.isArray(mensagem) ? (
          <>
            {mensagem.map((x, index) => (
              <BoxApp key={index}>
                <TextApp titulo={x} />
              </BoxApp>
            ))}
          </>
        ) : (
          <Typography gutterBottom>{mensagem}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {actionClose !== undefined && (
          <ButtonApp variant="outlined" onClick={close} title={"Não"} />
        )}
        <ButtonApp
          loading={loading}
          variant="contained"
          autoFocus
          onClick={click}
          title={textoButton}
        />
      </DialogActions>
    </BootstrapDialog>
  );
}

export function useModal() {
  return {
    Component: Modal,
    show,
    close,
  };
}
