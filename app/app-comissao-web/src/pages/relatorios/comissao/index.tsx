import { Collapse } from "@mui/material";
import { useFormikAdapter } from "../../../adapters/FormikAdapter";
import { YupAdapter } from "../../../adapters/YupAdapter";
import { BoxApp } from "../../../components/box/BoxApp";
import { FormRoot } from "../../../components/form/FormRoot";
import { useTab } from "../../../hooks/UseTab";
import {
  IItemRelatorioComissaoResponse,
  IRelatorioComissaoRequest,
  IRelatorioComissaoResponse,
} from "../../../types/RelatorioComissao";
import { DropDownAutoFetchApp } from "../../../components/dropdown/DropDownAutoFetch";
import { InputApp } from "../../../components/input/InputApp";
import { useRelatorioComissaoApi } from "../../../api/UseRelatorioComissaoApi";
import { useState } from "react";
import { TabelaComDrag } from "../../../components/tabela-paginacao/tabela";
import { formatMoney } from "../../../utils/Mascaras";
import { formatDate } from "../../../utils/FormatDate";
import { TextApp } from "../../../components/text/TextApp";

export function RelatorioComissao() {
  const [dados, setDados] = useState<IRelatorioComissaoResponse>();
  const { obter } = useRelatorioComissaoApi();
  const Tab = useTab();
  const form = useFormikAdapter<IRelatorioComissaoRequest>({
    initialValues: {
      vendedorId: 0,
      dataInicio: "",
      dataFim: "",
    },
    validationSchema: new YupAdapter()
      .string("dataInicio")
      .string("dataFim")
      .number("vendedorId")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await obter.fetch(form.values);
    if (response) {
      setDados(response);
      Tab.setValue(1);
      return;
    }

    setDados(undefined);
  }

  return (
    <FormRoot.Form loading={obter.loading} padding="0px" submit={form.onSubmit}>
      <Tab.Component tabs={[{ titulo: "Filtros" }, { titulo: "Resultado" }]} />
      <BoxApp padding="1rem">
        <Collapse in={Tab.value === 0}>
          <FormRoot.FormRow>
            <FormRoot.FormItemRow sm={4}>
              <DropDownAutoFetchApp
                id="vendedorId"
                keyLabel={"nome"}
                label="Vendedor"
                url="/vendedores/paginacao"
                onChange={(_, value) => {
                  form.setValue({
                    vendedor: value,
                    vendedorId: value?.id,
                  });
                }}
                error={form.error("vendedorId")}
                helperText={form.helperText("vendedorId")}
                value={form.values.vendedor}
                required
              />
            </FormRoot.FormItemRow>
            <FormRoot.FormItemRow sm={4}>
              <InputApp
                label="Data início"
                fullWidth
                id="dataInicio"
                value={form.values.dataInicio}
                onChange={form.onChange}
                error={form.error("dataInicio")}
                helperText={form.helperText("dataInicio")}
                required
                type="date"
              />
            </FormRoot.FormItemRow>
            <FormRoot.FormItemRow sm={4}>
              <InputApp
                label="Data fim"
                fullWidth
                id="dataFim"
                value={form.values.dataFim}
                onChange={form.onChange}
                error={form.error("dataFim")}
                helperText={form.helperText("dataFim")}
                required
                type="date"
              />
            </FormRoot.FormItemRow>
          </FormRoot.FormRow>
        </Collapse>
        <Collapse in={Tab.value === 1}>
          <BoxApp height="100%">
            {dados && (
              <>
                <TabelaComDrag
                  height={500}
                  columns={[
                    {
                      field: "id",
                      headerName: "Nº",
                    },
                    {
                      field: "valor",
                      headerName: "Valor",
                      cellRenderer: (params: {
                        data: IItemRelatorioComissaoResponse;
                      }) => formatMoney(params.data.valor),
                    },
                    {
                      field: "valorComissao",
                      headerName: "Valor Comissão",
                      cellRenderer: (params: {
                        data: IItemRelatorioComissaoResponse;
                      }) => formatMoney(params.data.valorComissao),
                    },
                    {
                      field: "dataVenda",
                      headerName: "Data Venda",
                      cellRenderer: (params: {
                        data: IItemRelatorioComissaoResponse;
                      }) => formatDate(params.data.dataVenda),
                    },
                  ]}
                  rows={dados.vendas.map((x) => {
                    return {
                      ...x,
                      id: x.vendaId,
                    };
                  })}
                />
                <BoxApp>
                  <BoxApp display="flex" alignItems="center" gap="0.5rem">
                    <TextApp
                      fontSize="14px"
                      titulo="Vendedor:"
                      fontWeight={600}
                    />
                    <TextApp titulo={dados.vendedor.nome} />
                  </BoxApp>
                  <BoxApp display="flex" alignItems="center" gap="0.5rem">
                    <TextApp
                      fontSize="14px"
                      titulo="Total de vendas:"
                      fontWeight={600}
                    />
                    <TextApp titulo={dados.totalVendas.toString()} />
                  </BoxApp>
                  <BoxApp display="flex" alignItems="center" gap="0.5rem">
                    <TextApp
                      fontSize="14px"
                      titulo="Total valor em vendas:"
                      fontWeight={600}
                    />
                    <TextApp
                      titulo={formatMoney(dados.valorTotalVendas) ?? ""}
                    />
                  </BoxApp>
                  <BoxApp display="flex" alignItems="center" gap="0.5rem">
                    <TextApp
                      fontSize="14px"
                      titulo="Total valor em comissão:"
                      fontWeight={600}
                    />
                    <TextApp
                      titulo={formatMoney(dados.valorTotalComissao) ?? ""}
                    />
                  </BoxApp>
                </BoxApp>
              </>
            )}
          </BoxApp>
        </Collapse>
      </BoxApp>
    </FormRoot.Form>
  );
}
