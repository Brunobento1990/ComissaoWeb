import { RelatorioComissao } from "../pages/relatorios/comissao";
import { IRoutes } from "../types/IRoutes";

export const RelatorioComissaoRoutes: IRoutes = {
  caminho: "/relatorio-comissao",
  children: <RelatorioComissao />,
  titulo: "Relatório Comissão",
};
