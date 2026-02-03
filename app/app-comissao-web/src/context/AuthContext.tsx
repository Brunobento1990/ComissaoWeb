import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocalStorageApp } from "../hooks/UseLocalStorageApp";
import { KeysLocalStorage } from "../configs/KeysLocalStorage";
import { useNavigateApp } from "../hooks/UseNavigateApp";

interface IAuthContext {}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider(props: IAuthProvider) {
  const { getItem } = useLocalStorageApp();
  const { navigate } = useNavigateApp();

  function init() {
    const jwt = getItem<string>(KeysLocalStorage.jwt);
    if (jwt) {
      return;
    }
    navigate("/login");
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
