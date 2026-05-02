import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import "antd/dist/reset.css";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path="/">
          <Route element={<h1>hi</h1>} path="/project/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
