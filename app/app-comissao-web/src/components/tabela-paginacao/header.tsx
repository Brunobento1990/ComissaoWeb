import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigateApp } from "../../hooks/UseNavigateApp";
import { BoxApp } from "../box/BoxApp";
import { InputApp } from "../input/InputApp";

interface propsHeaderTable {
  urlAdd?: string;
  notBtnAdd?: boolean;
  pesquisar: (search?: string) => void;
}

export function HeaderTable(props: propsHeaderTable) {
  const { navigate } = useNavigateApp();
  const [search, setSearch] = useState("");
  function handleBtnAdicionar() {
    if (props.notBtnAdd || !props.urlAdd) {
      return <></>;
    }

    return (
      <Button onClick={() => navigate(props.urlAdd)} variant="contained">
        Adicionar
      </Button>
    );
  }

  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="20px"
      width="100%"
      height="45px"
      marginBottom="15px"
    >
      {handleBtnAdicionar()}
      <form
        style={{
          width: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (props.pesquisar) {
            props.pesquisar(search?.length === 0 ? undefined : search);
          }
        }}
      >
        <InputApp
          label="Pesquisar"
          name="pesquisar"
          id="pesquisar"
          value={search}
          onChange={(_, e) => {
            setSearch(e);
            if (e?.length === 0) {
              props.pesquisar(undefined);
            }
          }}
          fullWidth
        />
      </form>
    </BoxApp>
  );
}
