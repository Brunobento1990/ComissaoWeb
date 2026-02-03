import { CircularProgress, TextField } from "@mui/material";
import { Fragment, useDeferredValue, useEffect, useState } from "react";
import { TypeMethod, useApi } from "../../hooks/UseApi";
import Autocomplete from "@mui/material/Autocomplete";

interface propsDropDown {
  value?: any;
  onChange?: (id: string, newValue?: any) => void;
  onBlur?: (e: any) => void;
  label: string;
  keyLabel: string | string[];
  url: string;
  size?: "small" | "medium";
  id: string;
  required?: boolean;
  helperText?: any;
  error?: boolean;
  method?: TypeMethod;
  readonly?: boolean;
  orderBy?: string;
  autoFocus?: boolean;
  renderOption?: (props: any, value: any) => React.ReactNode;
  asc?: boolean;
  textoBotaoNovoRegistro?: string;
  onClickBotaoNovoRegistro?: (search?: string) => void;
  textoNaoEncontrado?: string;
  startAdornment?: React.ReactNode;
  body?: any;
  utilizarURLSearch?: boolean;
  tooltipBotaoNovoRegistro?: string;
}

export function DropDownAutoFetchApp(props: propsDropDown) {
  const { action, statusRequisicao } = useApi({
    method: props.method ?? "GET",
    url: props.url,
    naoRenderizarResposta: true,
  });
  const [valuesOriginais, setValuesOriginais] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const defer = useDeferredValue(search);
  const textoNaoEncontrado = props.textoNaoEncontrado ?? "S/R";
  const loading = statusRequisicao === "loading";
  const labelValueSelecionado = getLabel(props?.value);

  function getLabel(value: any) {
    if (!value) return "";

    const labels = Array.isArray(props.keyLabel)
      ? props.keyLabel
      : [props.keyLabel];

    return labels
      .map((key) => {
        if (key?.includes(".")) {
          const keys = key.split(".");
          let valorFinal = value;
          for (let i = 0; i < keys.length; i++) {
            valorFinal = valorFinal?.[keys[i]];
            if (valorFinal == null) break;
          }
          return valorFinal;
        }

        return value[key];
      })
      .filter(Boolean)
      .join(" - ");
  }

  async function init() {
    if (props.readonly || !open) {
      return;
    }

    const response = await action<any>({
      urlParams: `?skip=0&take=50&orderBy=id&asc=true&search=${search || ""}`,
    });

    if (Array.isArray(response?.values)) {
      setValuesOriginais(response?.values ?? []);
    } else if (Array.isArray(response)) {
      setValuesOriginais(response ?? []);
    }
  }

  function renderOptions(params: any, value: any) {
    if (props.renderOption) {
      return props.renderOption(
        params,
        valuesOriginais.find((x) => x.id === value.id),
      );
    }

    return null;
  }

  const value =
    typeof props.value === "string" && props.value.length === 0
      ? null
      : props.value === undefined
        ? null
        : {
            id: props?.value?.id,
            label: labelValueSelecionado
              ? labelValueSelecionado
              : props?.value?.id
                ? textoNaoEncontrado
                : "",
          };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defer, open]);

  return (
    <Autocomplete
      noOptionsText={"Não há registros"}
      id={props.id}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      loading={loading}
      loadingText="Carregando..."
      getOptionLabel={(opt) => `${opt?.label || ""}`}
      onChange={(_, newValue: any, reason) => {
        const newV = reason !== "clear" ? newValue : undefined;
        if (props.onChange) {
          props.onChange(
            props.id,
            valuesOriginais.find((x) => x?.id === newV?.id),
          );
        }
      }}
      onBlur={props.onBlur}
      renderOption={props.renderOption ? renderOptions : undefined}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      readOnly={props.readonly}
      fullWidth
      options={valuesOriginais.map((value: any) => {
        const newLabel = getLabel(value);
        return {
          id: value?.id,
          label: newLabel ? newLabel : textoNaoEncontrado,
        };
      })}
      size={props.size ?? "small"}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          autoFocus={props.autoFocus}
          value={search}
          required={props.required}
          helperText={props.helperText}
          error={props.error}
          disabled={props.readonly}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: props.startAdornment,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
