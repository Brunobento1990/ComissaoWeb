import { useEffect } from "react";
import { useFormikAdapter } from "../../../adapters/FormikAdapter";
import { YupAdapter } from "../../../adapters/YupAdapter";
import { useVendaApi } from "../../../api/UseVendaApi";
import { DropDownAutoFetchApp } from "../../../components/dropdown/DropDownAutoFetch";
import { FormRoot } from "../../../components/form/FormRoot";
import { InputApp, MaskType } from "../../../components/input/InputApp";
import { useNavigateApp } from "../../../hooks/UseNavigateApp";
import { IFormTypes } from "../../../types/Form";
import { IVenda } from "../../../types/Venda";
import { cleanFormatMoney } from "../../../utils/Mascaras";

const urlVoltar = "/vendas";

export function VendaForm(props: IFormTypes) {
  const { criar, obterPorId } = useVendaApi();
  const { navigate, params } = useNavigateApp();

  const form = useFormikAdapter<IVenda>({
    initialValues: {
      valor: 0,
      valorComissao: 0,
      vendedorId: 0,
    },
    validationSchema: new YupAdapter()
      .number("valor")
      .number("vendedorId")
      .build(),
    onSubmit: submit,
  });

  async function init() {
    if (props.action === "create" || !params.id) {
      return;
    }

    const response = await obterPorId.fetch(params.id);
    if (response) {
      form.setValue(response);
    }
  }

  async function submit() {
    const response = await criar.fetch({
      ...form.values,
      vendedor: undefined,
    });

    if (response) {
      navigate(urlVoltar);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readonly = props.action === "view";

  return (
    <FormRoot.Form
      urlVoltar={urlVoltar}
      readonly={readonly}
      submit={form.onSubmit}
    >
      <FormRoot.FormRow>
        <FormRoot.FormItemRow>
          <DropDownAutoFetchApp
            id="vendedorId"
            keyLabel={"nome"}
            readonly={readonly}
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
        <FormRoot.FormItemRow>
          <InputApp
            label="Valor"
            error={form.error("valor")}
            helperText={form.helperText("valor")}
            value={form.values.valor}
            required
            fullWidth
            readonly={readonly}
            onChange={(_, value) => {
              form.setValue({
                valor: cleanFormatMoney(value),
              });
            }}
            mask={MaskType.MONEY}
          />
        </FormRoot.FormItemRow>
      </FormRoot.FormRow>
      {props.action === "view" && (
        <FormRoot.FormRow>
          <FormRoot.FormItemRow>
            <InputApp
              label="Valor comissão"
              value={form.values.valorComissao}
              readonly
              fullWidth
              mask={MaskType.MONEY}
            />
          </FormRoot.FormItemRow>
        </FormRoot.FormRow>
      )}
    </FormRoot.Form>
  );
}
