import { PropsWithChildren } from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import "./app.less";

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("App launched.");
    Taro.navigateTo({
      url: "/pages/index/index",
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
