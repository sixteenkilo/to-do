import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<h1>hi</h1>} index />
      </Routes>
    </BrowserRouter>
  );
};
