import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import "antd/dist/reset.css";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} index />
      </Routes>
    </BrowserRouter>
  );
};
