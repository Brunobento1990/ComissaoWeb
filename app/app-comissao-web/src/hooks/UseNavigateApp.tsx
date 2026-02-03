import { useNavigate, useParams, useLocation } from "react-router-dom";

export function useNavigateApp() {
  const usenavigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  function navigate(url?: string, replace?: boolean) {
    if (url) usenavigate(url, { replace });
  }

  return {
    navigate,
    params,
    path: location.pathname,
    search: location.search,
  };
}
