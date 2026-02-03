import { useApi } from "../hooks/UseApi";
import { IVenda } from "../types/Venda";

export function useVendaApi() {
  const apiCreate = useApi({
    method: "POST",
    url: "/vendas/create",
  });

  const apiObterPorId = useApi({
    method: "GET",
    url: "/vendas/obter-por-id",
  });

  async function criar(body: Partial<IVenda>): Promise<IVenda | undefined> {
    return await apiCreate.action({ body });
  }

  async function obterPorId(id: string): Promise<IVenda | undefined> {
    return await apiObterPorId.action({ urlParams: `?id=${id || ""}` });
  }

  return {
    criar: {
      fetch: criar,
      loading: apiCreate.statusRequisicao === "loading",
    },
    obterPorId: {
      fetch: obterPorId,
      loading: apiObterPorId.statusRequisicao === "loading",
    },
  };
}
