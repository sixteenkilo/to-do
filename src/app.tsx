import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import { ProjectView } from "./views/projectView";
import "antd/dist/reset.css";
import { AllTaksView } from "./views/allTaks";
import { TomorrowTasksView } from "./views/TomorrowTasks";
import { WeekTasksView } from "./views/weekTaks";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path="/">
          <Route element={<AllTaksView />} index />
          <Route element={<TomorrowTasksView />} path="tomorrow" />
          <Route element={<WeekTasksView />} path="week" />
          <Route element={<ProjectView />} path="/project/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
