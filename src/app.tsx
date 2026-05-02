import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import { ProjectView } from "./views/projectView";
import "antd/dist/reset.css";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path="/">
          <Route element={<ProjectView />} path="/project/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
