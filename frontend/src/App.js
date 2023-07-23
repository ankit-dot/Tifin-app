import { useLoaderData } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import { useLoading } from "./Hooks/useLoading";
import { useEffect } from "react";
import setLoadingInterceptor from "./interceptors/loadingInterceptors.js";

function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return (
    <>
      <Loading />
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
