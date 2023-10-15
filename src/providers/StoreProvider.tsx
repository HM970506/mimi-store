import store from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
//리덕스를 모든 곳에 공통으로 제공하기 위한 제공자

export default function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
