import React from "react";

import { NewsContextProvider } from "./NewsCon";
import News from "./Components/News";
import "./App.css";

function App() {
  return (
    <NewsContextProvider>
      <News></News>
    </NewsContextProvider>
  );
}

export default App;