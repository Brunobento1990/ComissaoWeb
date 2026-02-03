import { Alert, Stack } from "@mui/material";
import { BoxApp } from "../../components/box/BoxApp";
import { DividerApp } from "../../components/divider/DividerApp";
import { TextApp } from "../../components/text/TextApp";
import { useThemeApp } from "../../hooks/UseThemeApp";
import { InputApp } from "../../components/input/InputApp";
import { ButtonApp } from "../../components/buttons/ButtonApp";
import { useFormikAdapter } from "../../adapters/FormikAdapter";
import { ILoginRequest } from "../../types/Login";
import { YupAdapter } from "../../adapters/YupAdapter";
import { useLoginApi } from "../../api/UseLoginApi";
import { useAuth } from "../../hooks/UseAuth";

export function Login() {
  const { shadow, borderRadius } = useThemeApp();
  const { login } = useLoginApi();
  const { login: authLogin } = useAuth();

  const form = useFormikAdapter<ILoginRequest>({
    initialValues: {
      email: "",
      senha: "",
    },
    onSubmit: submit,
    validationSchema: new YupAdapter().email("email").string("senha").build(),
  });

  async function submit() {
    const response = await login.fetch(form.values);
    if (!response) {
      return;
    }
    authLogin(response);
  }

  return (
    <BoxApp
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="1rem"
      maxHeight="750px"
    >
      <form
        onSubmit={form.onSubmit}
        style={{
          width: "100%",
          borderRadius: borderRadius,
          boxShadow: shadow,
          maxWidth: "500px",
          height: "100%",
          padding: "1rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <BoxApp textAlign="center">
          <TextApp titulo="Login" fontSize="26px" fontWeight={600} />
        </BoxApp>
        <DividerApp width="100%" />
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">
            Usuário padrão: admin@webcomissao.com, senha: admin123
          </Alert>
        </Stack>
        <BoxApp display="flex" gap="1rem" flexDirection="column">
          <InputApp
            label="E-mail"
            required
            type="email"
            error={form.error("email")}
            helperText={form.helperText("email")}
            value={form.values.email}
            onChange={form.onChange}
            onBlur={form.onBlur}
            fullWidth
            id="email"
          />
          <InputApp
            label="Senha"
            required
            type="password"
            error={form.error("senha")}
            helperText={form.helperText("senha")}
            value={form.values.senha}
            onChange={form.onChange}
            onBlur={form.onBlur}
            fullWidth
            id="senha"
          />
          <ButtonApp
            title="LOGIN"
            loading={login.loading}
            variant="contained"
            type="submit"
            onClick={form.onSubmit}
          />
        </BoxApp>
        <BoxApp display="flex" gap="1rem" flexDirection="column">
          <ButtonApp title="Cadastre-se" variant="outlined" />
        </BoxApp>
        <BoxApp
          display="flex"
          gap="1rem"
          justifyContent="center"
          alignItems="center"
        >
          <TextApp titulo="Esqueceu sua senha?" />
          <ButtonApp title="Clique aqui!" />
        </BoxApp>
      </form>
    </BoxApp>
  );
}
