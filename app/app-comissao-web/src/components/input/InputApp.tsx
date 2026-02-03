import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";
import { IconApp } from "../icon/IconApp";
import {
  formatMoney,
  maskCep,
  maskCNPJ,
  maskContaBancaria,
  maskCPF,
  maskCpfCnpj,
  maskTelefoneFixo,
  maskTelefoneInternacional,
  somenteNumero,
} from "../../utils/Mascaras";

export enum MaskType {
  TELEFONE = "telefone",
  TELEFONE_FIXO = "telefone_fixo",
  CNPJ = "cnpj",
  CPF = "cpf",
  MONEY = "format-money",
  CPFCNPJ = "cpfCnpj",
  CEP = "cep",
  SOMENTE_NUMERO = "somente-numero",
  CONTA_BANCARIA = "conta-bancaria",
  TELEFONE_INTERNACIONAL = "telefone-internacional",
}

export interface InputAppProps {
  fullWidth?: boolean;
  label: string;
  name?: string;
  id?: string;
  value?: any;
  onChange?: (id: string, newValue?: any, e?: any) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: any;
  error?: boolean;
  required?: boolean;
  maxLength?: number;
  type?: string;
  placeholder?: string;
  isPassword?: boolean;
  mask?: MaskType;
  startIcon?: string;
  endIcon?: string;
  size?: "small" | "medium";
  readonly?: boolean;
  ref?: any;
  refInput?: any;
  focus?: boolean;
  width?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  variant?: "filled" | "outlined" | "standard";
  display?: string;
  className?: string;
  maxWidth?: string;
  shrink?: boolean;
  corEndIcon?: string;
  step?: string;
}

export function InputApp(props: InputAppProps) {
  const [type, setType] = useState<string>(
    props.isPassword ? "password" : (props.type ?? "text"),
  );

  const handleMask = (value: any) => {
    switch (props.mask) {
      case MaskType.TELEFONE:
        return maskTelefoneFixo(value);
      case MaskType.CNPJ:
        return maskCNPJ(value);
      case MaskType.CPF:
        return maskCPF(value);
      case MaskType.MONEY:
        return formatMoney(value);
      case MaskType.CPFCNPJ:
        return maskCpfCnpj(value);
      case MaskType.CEP:
        return maskCep(value);
      case MaskType.TELEFONE_FIXO:
        return maskTelefoneFixo(value);
      case MaskType.SOMENTE_NUMERO:
        return somenteNumero(value);
      case MaskType.CONTA_BANCARIA:
        return maskContaBancaria(value);
      case MaskType.TELEFONE_INTERNACIONAL:
        return maskTelefoneInternacional(value);
      default:
        return handleNewValue(value);
    }
  };

  function handleMaxLength(): number | undefined {
    if (props.maxLength && props.maxLength > 0) {
      return props.maxLength;
    }

    if (props.mask) {
      if (
        props.mask === MaskType.TELEFONE ||
        props.mask === MaskType.TELEFONE_FIXO
      ) {
        return 15;
      }

      if (props.mask === MaskType.TELEFONE_INTERNACIONAL) {
        return 19;
      }
    }

    return undefined;
  }

  function handleNewValue(value: any) {
    if (props.type === "number" && typeof value === "string") {
      return parseFloat(value);
    }
    return value ?? "";
  }

  function handleIcon() {
    if (props.isPassword) {
      if (type === "password") {
        return <IconApp icon="mdi:eye-off-outline" />;
      }

      return <IconApp icon="iconamoon:eye" />;
    }

    if (props.endIcon) {
      return <IconApp icon={props.endIcon} color={props.corEndIcon} />;
    }
  }

  const togglePasswordVisibility = () => {
    if (props.isPassword) {
      const newType = type === "password" ? "text" : "password";
      setType(newType);
    }
  };

  function handleEndAdornment() {
    if (!props.endIcon && !props.isPassword) return undefined;
    if (props.isPassword) {
      return (
        <InputAdornment position="end" sx={{ marginRight: "1px solid black" }}>
          <IconButton
            edge="end"
            onMouseDown={(e: any) => e.preventDefault()}
            onClick={togglePasswordVisibility}
          >
            {handleIcon()}
          </IconButton>
        </InputAdornment>
      );
    }

    return (
      <InputAdornment position="end">
        <IconApp icon={props.endIcon ?? ""} color={props.corEndIcon} />
      </InputAdornment>
    );
  }

  return (
    <TextField
      className={props.className}
      variant={props.variant ?? "outlined"}
      autoFocus={props.autoFocus}
      ref={props.ref}
      inputRef={props.refInput}
      placeholder={props.placeholder}
      type={type}
      fullWidth={props.fullWidth}
      label={props.label}
      name={props.name}
      id={props.id}
      focused={props.focus}
      value={handleMask(props.value) ?? ""}
      onBlur={props.onBlur}
      onChange={(e: any) => {
        if (props.onChange) {
          props.onChange(props.id ?? "", handleMask(e.target.value), e);
        }
      }}
      autoComplete={props.autoComplete}
      sx={{
        width: props.width,
        display: props.display,
        maxWidth: props.maxWidth,
      }}
      size={props.size ?? "small"}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
      disabled={props.readonly}
      slotProps={{
        htmlInput: {
          maxLength: handleMaxLength(),
          step: props.step,
        },
        input: {
          endAdornment: handleEndAdornment(),
          startAdornment: props.startIcon ? (
            <InputAdornment position="start">
              <IconApp icon={props.startIcon} />
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
