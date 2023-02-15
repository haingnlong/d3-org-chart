import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const OrgChartComponent = lazy(() => import("./pages/OrgChart/OrgChart"));

const App = () => {
  return (
      <Suspense fallback={<div>Loading . . .</div>}>
          <Routes>
              <Route path="/" element={<OrgChartComponent/>} />
          </Routes>
      </Suspense>
  );
};

export default App;
