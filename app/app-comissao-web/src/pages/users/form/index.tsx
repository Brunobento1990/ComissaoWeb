import { useEffect } from "react";
import { useFormikAdapter } from "../../../adapters/FormikAdapter";
import { YupAdapter } from "../../../adapters/YupAdapter";
import { useUsuarioApi } from "../../../api/UseUsuarioApi";
import { FormRoot } from "../../../components/form/FormRoot";
import { InputApp } from "../../../components/input/InputApp";
import { useNavigateApp } from "../../../hooks/UseNavigateApp";
import { IFormTypes } from "../../../types/Form";
import { IUsuarioCreate } from "../../../types/Usuario";
import { BoxApp } from "../../../components/box/BoxApp";
import { ChipApp } from "../../../components/divider/DividerApp";

const urlVoltar = "/users";

export function UserForm(props: IFormTypes) {
  const { criar, atualizar, obterPorId } = useUsuarioApi();
  const { navigate, params } = useNavigateApp();

  const form = useFormikAdapter<IUsuarioCreate>({
    initialValues: {
      senha: "",
      nome: "",
      email: "",
      ativo: true,
    },
    validationSchema: new YupAdapter()
      .email("email")
      .string("senha")
      .string("nome")
      .build(),
    onSubmit: submit,
  });

  async function submit() {
    const response =
      props.action === "create"
        ? await criar.fetch(form.values)
        : await atualizar.fetch(form.values as any);
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

  const loading = criar.loading || atualizar.loading || obterPorId.loading;
  const readonly = props.action === "view";

  return (
    <FormRoot.Form
      loading={loading}
      readonly={readonly}
      urlVoltar={urlVoltar}
      submit={form.onSubmit}
      footer={
        props.action === "create"
          ? undefined
          : {
              children: (
                <BoxApp
                  display="flex"
                  alignItems="center"
                  justifyContent="end"
                  width="100%"
                  padding="1rem"
                >
                  <ChipApp
                    titulo={form.values.ativo ? "Ativo" : "Inativo"}
                    cor={form.values.ativo ? "success" : "error"}
                  />
                </BoxApp>
              ),
            }
      }
    >
      <FormRoot.FormRow>
        <FormRoot.FormItemRow sm={6}>
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
        <FormRoot.FormItemRow sm={6}>
          <InputApp
            required
            label="Email"
            maxLength={255}
            fullWidth
            id="email"
            type="email"
            value={form.values.email}
            onChange={form.onChange}
            error={!!form.error("email")}
            helperText={form.helperText("email")}
            onBlur={form.onBlur}
            readonly={readonly}
          />
        </FormRoot.FormItemRow>
        {props.action !== "view" && (
          <FormRoot.FormItemRow sm={6}>
            <InputApp
              required
              label="Senha"
              maxLength={255}
              fullWidth
              id="senha"
              type="password"
              value={form.values.senha}
              onChange={form.onChange}
              error={!!form.error("senha")}
              helperText={form.helperText("senha")}
              onBlur={form.onBlur}
              readonly={readonly}
            />
          </FormRoot.FormItemRow>
        )}
      </FormRoot.FormRow>
    </FormRoot.Form>
  );
}
