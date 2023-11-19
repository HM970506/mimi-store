import React from "react";
import Main3d from "./component/main3d";
import MainList from "./component/mainList";

export default function page() {
  return (
    <div className="flex justify-center align-middle flex-col">
      <Main3d />
      <MainList />
    </div>
  );
}
