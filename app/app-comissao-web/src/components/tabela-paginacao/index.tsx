import { ReactNode, useEffect, useState } from "react";
import { Card, IconButton, Tooltip, Typography } from "@mui/material";
import { TypeMethod, useApi } from "../../hooks/UseApi";
import { useNavigateApp } from "../../hooks/UseNavigateApp";
import { IconApp } from "../icon/IconApp";
import { BoxApp } from "../box/BoxApp";
import { FooterTable } from "./footer";
import { HeaderTable } from "./header";
import { ISortingTable, TabelaComDrag, TypeColumns } from "./tabela";
import { useModal } from "../modal/UseModal";
import { formatDate } from "../../utils/FormatDate";

interface tableProps {
  columns: TypeColumns[];
  url: string;
  checkboxSelection?: boolean;
  urlDelete?: string;
  urlAdd?: string;
  urlView?: string;
  urlEdit?: string;
  notShowHeader?: boolean;
  notBtnAdd?: boolean;
  initialField?: string;
  refreshPai?: any;
  filtroComplementar?: any;
  nomeColunaAcoes?: string;
  desabilitarColunaAcoes?: boolean;
  metodo?: TypeMethod;
  childrenHeader?: ReactNode;
  minWidth?: number;
  filtroChildren?: ReactNode;
  take?: number;
  nomeDaTabela?: string;
}

interface IPaginacao {
  pagina: number;
  values: any[];
  quantidadePorPagina: number;
  quantidadePagina: number;
  sorting: ISortingTable;
}

export function TableIndex(props: tableProps) {
  const apiDelete = useApi({
    method: "DELETE",
    url: props.urlDelete || "",
  });
  const { navigate } = useNavigateApp();
  const modal = useModal();

  const [paginacao, setPaginacao] = useState<IPaginacao>({
    pagina: 1,
    values: [],
    quantidadePorPagina:
      Number(localStorage.getItem("paginacao-quantidadePorPagina")) || 10,
    quantidadePagina: 0,
    sorting: {
      field: "id",
      sort: "desc",
    },
  });

  const { action, statusRequisicao } = useApi({
    method: props.metodo ?? "GET",
    url: props.url,
    naoRenderizarResposta: true,
  });

  const loading = statusRequisicao === "loading";

  async function refresh(searchP?: string) {
    const response = await action<any>({
      urlParams: `?skip=${paginacao.pagina}&take=${paginacao.quantidadePorPagina}&orderBy=${paginacao.sorting.field}&asc=${
        paginacao.sorting.sort === "asc"
      }&search=${searchP || ""}`,
    });
    if (response?.values?.length > 0) {
      setPaginacao((state) => {
        return {
          ...state,
          quantidadePagina: response.totalPaginas,
          values: response.values,
        };
      });
    } else {
      if (paginacao.values?.length > 0) {
        setPaginacao((state) => {
          return {
            ...state,
            quantidadePagina: 0,
            values: [],
          };
        });
      }
    }
  }

  function excluir(id: string) {
    try {
      modal.show({
        async confirmed() {
          modal.close();
          await apiDelete.action({ urlParams: `?id=${id}` });
          await refresh();
        },
      });
    } catch (error) {}
  }

  function optionsColumns(): TypeColumns[] {
    return [
      {
        width: 200,
        field: "createdAt",
        headerName: "Cadastro",
        cellRenderer: (params: { data: any }) =>
          formatDate(params?.data?.createdAt),
        sortable: true,
      },
      {
        width: 200,
        field: "action",
        headerName: "Ações",
        cellRenderer: (params: { data: any }) => {
          return (
            <>
              {props.urlView && (
                <Tooltip title="Visualizar" placement="top">
                  <IconButton
                    onClick={() =>
                      navigate(`${props.urlView}/${params?.data?.id}`)
                    }
                  >
                    <IconApp icon="tabler:eye" />
                  </IconButton>
                </Tooltip>
              )}
              {props.urlEdit && (
                <Tooltip title="Editar" placement="top">
                  <IconButton
                    onClick={() =>
                      navigate(`${props.urlEdit}/${params?.data?.id}`)
                    }
                  >
                    <IconApp icon="ep:edit" />
                  </IconButton>
                </Tooltip>
              )}
              {props.urlDelete && (
                <Tooltip title="Excluir" placement="top">
                  <IconButton onClick={() => excluir(params?.data?.id)}>
                    <IconApp icon="ph:trash" />
                  </IconButton>
                </Tooltip>
              )}
            </>
          );
        },
      },
    ];
  }

  function defaultColuns(): TypeColumns[] {
    let columns: TypeColumns[] = [];

    columns.push({
      field: "id",
      headerName: "N°",
      width: 80,
      cellRenderer: (params: { data: any }) => (
        <Typography variant="body2" sx={{ color: "success" }}>
          #{params.data.id}
        </Typography>
      ),
      sortable: true,
    });

    return columns;
  }

  useEffect(() => {
    refresh();
  }, [props.refreshPai, paginacao.pagina, paginacao.quantidadePorPagina]);

  return (
    <Card
      sx={{
        height: "calc(100vh - 120px)",
        padding: "10px",
        overflowY: "auto",
      }}
    >
      {props.childrenHeader && <>{props.childrenHeader}</>}
      {!props.notShowHeader && (
        <HeaderTable
          urlAdd={props.urlAdd}
          notBtnAdd={props.notBtnAdd}
          pesquisar={refresh}
        />
      )}
      <BoxApp
        maxHeight="calc(100% - 120px)"
        height="100%"
        overflowy="auto"
        width="100%"
      >
        <TabelaComDrag
          loading={loading}
          columns={[...defaultColuns(), ...props.columns, ...optionsColumns()]}
          rows={paginacao.values}
          minWidth={props.minWidth}
          nomeDaTabela={props.nomeDaTabela}
        />
      </BoxApp>
      <FooterTable
        pagina={paginacao.pagina}
        setPagina={(newPage: number) =>
          setPaginacao((state) => ({ ...state, pagina: newPage }))
        }
        quantidadePagina={paginacao.quantidadePagina}
        quantidadePorPagina={paginacao.quantidadePorPagina}
        setQuantidadePorPagina={(qtd) => {
          localStorage.setItem(
            "paginacao-quantidadePorPagina",
            qtd?.toString() || "10",
          );
          setPaginacao((state) => ({ ...state, quantidadePorPagina: qtd }));
        }}
      />
    </Card>
  );
}
