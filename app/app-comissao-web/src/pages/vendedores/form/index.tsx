import { Collapse } from "@mui/material";
import { useFormikAdapter } from "../../../adapters/FormikAdapter";
import { FormRoot } from "../../../components/form/FormRoot";
import { useTab } from "../../../hooks/UseTab";
import { IFormTypes } from "../../../types/Form";
import { IVendedor } from "../../../types/Vendedor";
import { InputApp } from "../../../components/input/InputApp";
import { BoxApp } from "../../../components/box/BoxApp";
import { YupAdapter } from "../../../adapters/YupAdapter";
import { useNavigateApp } from "../../../hooks/UseNavigateApp";
import { useVendedorApi } from "../../../api/UseVendedorApi";
import { useEffect } from "react";

const urlVoltar = "/vendedores";

export function VendedorForm(props: IFormTypes) {
  const Tab = useTab();
  const { atualizar, criar, obterPorId } = useVendedorApi();
  const { navigate, params } = useNavigateApp();

  const form = useFormikAdapter<IVendedor>({
    initialValues: {
      nome: "",
      ativo: true,
      comissao: {
        id: 0,
        valorFixo: 0,
        percentualPorVenda: 0,
      },
    },
    validationSchema: new YupAdapter().string("nome").build(),
    onSubmit: submit,
  });

  async function submit() {
    const response =
      props.action === "create"
        ? await criar.fetch(form.values)
        : await atualizar.fetch(form.values);

    if (response) {
      navigate(urlVoltar);
    }
  }

  async function init() {
    if (props.action === "create" || !params.id) {
      return;
    }
    const response = await obterPorId.fetch(params.id);
    if (response) {
      form.setValue(response);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readonly = props.action === "view";
  const loading = atualizar.loading || criar.loading || obterPorId.loading;

  return (
    <FormRoot.Form
      padding="0px"
      urlVoltar={urlVoltar}
      loading={loading}
      submit={form.onSubmit}
      readonly={readonly}
    >
      <Tab.Component tabs={[{ titulo: "Geral" }, { titulo: "Comissão" }]} />
      <BoxApp padding="1rem">
        <Collapse in={Tab.value === 0}>
          <FormRoot.FormRow>
            <FormRoot.FormItemRow>
              <InputApp
                required
                label="Nome"
                maxLength={255}
                fullWidth
                id="nome"
                value={form.values.nome}
                onChange={form.onChange}
                error={!!form.error("nome")}
                helperText={form.helperText("nome")}
                onBlur={form.onBlur}
                readonly={readonly}
              />
            </FormRoot.FormItemRow>
          </FormRoot.FormRow>
        </Collapse>
        <Collapse in={Tab.value === 1}>
          <FormRoot.FormRow>
            <FormRoot.FormItemRow>
              <InputApp
                label="Valor fixo"
                maxLength={255}
                fullWidth
                id="comissao.valorFixo"
                type="number"
                value={form.values.comissao.valorFixo}
                onChange={form.onChange}
                onBlur={form.onBlur}
                readonly={readonly}
              />
            </FormRoot.FormItemRow>
            <FormRoot.FormItemRow>
              <InputApp
                label="Percentual por venda"
                maxLength={255}
                fullWidth
                id="comissao.percentualPorVenda"
                type="number"
                value={form.values.comissao.percentualPorVenda}
                onChange={form.onChange}
                onBlur={form.onBlur}
                readonly={readonly}
              />
            </FormRoot.FormItemRow>
          </FormRoot.FormRow>
        </Collapse>
      </BoxApp>
    </FormRoot.Form>
  );
}
