import { useApi } from "../hooks/UseApi";
import {
  IRelatorioComissaoRequest,
  IRelatorioComissaoResponse,
} from "../types/RelatorioComissao";

export function useRelatorioComissaoApi() {
  const apiObterPorId = useApi({
    method: "GET",
    url: "/vendas/relatorio",
  });

  async function obter(
    dados: IRelatorioComissaoRequest,
  ): Promise<IRelatorioComissaoResponse | undefined> {
    return await apiObterPorId.action({
      urlParams: `?vendedorId=${dados?.vendedorId || ""}&dataInicio=${
        dados?.dataInicio || ""
      }&dataFim=${dados?.dataFim || ""}`,
    });
  }

  return {
    obter: {
      fetch: obter,
      loading: apiObterPorId.statusRequisicao === "loading",
    },
  };
}
