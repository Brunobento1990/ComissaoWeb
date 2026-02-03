import axios, { GenericAbortSignal } from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocalStorageApp } from "./UseLocalStorageApp";
import { useSnackbarApp } from "../components/alerts/UseSnackBar";
import { KeysLocalStorage } from "../configs/KeysLocalStorage";
import { useAuth } from "./UseAuth";

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
export type StatusRequisicao = "loading" | "erro" | "sucesso";

export interface propsUseApi {
  method: TypeMethod;
  url: string;
  naoRenderizarErro?: boolean;
  naoRenderizarResposta?: boolean;
  header?: any;
  statusInicial?: StatusRequisicao;
}

export interface propsFecth {
  body?: any;
  urlParams?: string;
  message?: string;
  signal?: GenericAbortSignal;
  desativarSignal?: boolean;
}

const URL_API = process.env.REACT_APP_API_URL;

function getMessage(method: TypeMethod): string {
  switch (method) {
    case "DELETE":
      return "Registro excluido com sucesso!";
    case "PUT":
      return "Registro editado com sucesso!";
    default:
      return "Registro criado com sucesso!";
  }
}

export function useApi(props: propsUseApi) {
  const [error, setError] = useState<any>();
  const [statusRequisicao, setStatusRequisicao] = useState<
    StatusRequisicao | undefined
  >(props.statusInicial);
  const { show: showSnack } = useSnackbarApp();
  const abortControllerRef = useRef<any>(null);
  const { logout } = useAuth();
  const { getItem } = useLocalStorageApp();

  const api = axios.create({
    baseURL: URL_API,
  });

  useEffect(() => {
    return () => {
      setStatusRequisicao(undefined);
      setError(undefined);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  function erro(error: any) {
    if (error?.code === "ERR_NETWORK") {
      showSnack(
        `Erro de conexão com nossos servidores, tente novamente, ou entre em contato com o suporte.`,
        "error",
      );
      return;
    }
    // eslint-disable-next-line prefer-const
    let errors = error?.response?.data?.erros ?? error?.response?.data?.Erros;
    if (!errors) {
      errors = error?.response?.data;
    }
    if (error?.response?.status === 401) {
      if (Array.isArray(errors)) {
        const erro = errors[0];
        if (erro) {
          showSnack(`${erro || "Sessão expirada!"}`, "error");
          logout();
          return;
        }
      }
    }

    if (Array.isArray(errors)) {
      let message = "";
      for (const err of errors) {
        message = `${message}\n${err || ""}`;
        showSnack(message, "error");
        return;
      }
    }

    showSnack("Ocorreu um erro interno, tente novamente mais tarde!", "error");
  }

  async function action<T = unknown>(
    propsFecth?: propsFecth,
  ): Promise<T | undefined> {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (!statusRequisicao || statusRequisicao !== "loading") {
        setStatusRequisicao("loading");
      }
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const jwt = getItem(KeysLocalStorage.jwt);
      const headers = {
        Authorization: `Bearer ${jwt ?? ""}`,
        ...(props.header ?? {}),
      };
      const response = await api.request({
        url: propsFecth?.urlParams
          ? `${props.url}${propsFecth?.urlParams}`
          : props.url,
        data: propsFecth?.body,
        method: props.method,
        headers,
        signal: !propsFecth?.desativarSignal ? signal : undefined,
      });
      const message = propsFecth?.message ?? getMessage(props.method);
      if (message && !props.naoRenderizarResposta && props.method !== "GET") {
        showSnack(message, "success");
      }
      setStatusRequisicao("sucesso");
      return response?.data as T;
    } catch (err: any) {
      setStatusRequisicao("erro");
      if (err?.code === "ERR_CANCELED") {
        return undefined;
      }
      if (!props.naoRenderizarErro) {
        erro(err);
      }
      setError(err);
      return undefined;
    }
  }

  return {
    action,
    statusRequisicao,
    error,
  };
}
