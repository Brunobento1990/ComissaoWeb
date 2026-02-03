import { BoxApp } from "../components/box/BoxApp";
import { ButtonApp } from "../components/buttons/ButtonApp";
import { TextApp } from "../components/text/TextApp";
import { useNavigateApp } from "../hooks/UseNavigateApp";

export function Page404() {
  const { navigate } = useNavigateApp();
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      gap="1rem"
      flexDirection="column"
    >
      <TextApp
        titulo="Página não encontrada"
        fontSize="26px"
        fontWeight={600}
      />
      <ButtonApp
        variant="outlined"
        title="Voltar para home"
        onClick={() => navigate("/")}
      />
    </BoxApp>
  );
}
