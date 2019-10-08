import { registerRootComponent } from "expo";
import React from "react";
import App from "./src/App";

export default function Main() {
  return <App />;
}

registerRootComponent(Main);
