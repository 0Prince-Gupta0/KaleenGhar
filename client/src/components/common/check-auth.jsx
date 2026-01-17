import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage =
    path.includes("/auth/login") || path.includes("/auth/register");

  const isAdminRoute = path.startsWith("/admin");
  const isShopRoute = path.startsWith("/shop");

  /* ================= ROOT ================= */
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }

  /* ================= NOT AUTHENTICATED ================= */
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" replace />;
  }

  /* ================= AUTHENTICATED BUT VISITING AUTH PAGES ================= */
  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }

  /* ================= ROLE GUARDS ================= */
  if (isAuthenticated && user?.role !== "admin" && isAdminRoute) {
    return <Navigate to="/unauth-page" replace />;
  }

  if (isAuthenticated && user?.role === "admin" && isShopRoute) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  /* ================= ALLOW ================= */
  return <>{children}</>;
}

export default CheckAuth;
