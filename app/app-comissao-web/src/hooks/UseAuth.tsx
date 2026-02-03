import { KeysLocalStorage } from "../configs/KeysLocalStorage";
import { ILoginResponse } from "../types/Login";
import { useLocalStorageApp } from "./UseLocalStorageApp";
import { useNavigateApp } from "./UseNavigateApp";

export function useAuth() {
  const { navigate } = useNavigateApp();
  const { setItem } = useLocalStorageApp();

  function login(response: ILoginResponse) {
    setItem(KeysLocalStorage.jwt, response.token);
    setItem(KeysLocalStorage.user, response.user, true);
    navigate("/");
  }

  function logout() {
    navigate("/login");
    localStorage.clear();
  }

  return { logout, login };
}
