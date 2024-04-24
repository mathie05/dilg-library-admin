import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import PNF from "./components/layout/PNF";
import Users from "./pages/Users";
import KP from "./pages/KP";
import Upload from "./pages/Upload";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<KP />} />
      <Route path="userDownloads" element={<Users />} />
      <Route path="upload" element={<Upload />} />
      <Route path="edit" element={<Edit />} />
      <Route path="delete" element={<Delete />} />
      <Route path="*" element={<PNF />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
