import { useMemo, useState } from "react";
import { View, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import MapBg from "../../statics/imgs/olympus.png";
/*
 * 获取中点
 */
function getMidpoint(p1, p2) {
  if (!p1 || !p2) return [0, 0];
  var x = (p1.pageX + p2.pageX) / 2,
    y = (p1.pageY + p2.pageY) / 2;
  return [x, y];
}
/*
 * 两点的距离
 */
function getDistance(p1, p2) {
  if (!p1 || !p2) return 1;
  var x = p2.pageX - p1.pageX,
    y = p2.pageY - p1.pageY;
  return Math.sqrt(x * x + y * y);
}
/*
 * 两点的夹角
 */
function getAngle(p1, p2) {
  var x = p1.pageX - p2.pageX,
    y = p1.pageY - p2.pageY;
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export default function Olympus() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const [width, setWidth] = useState(1500);
  const [isTouch, setIsTouch] = useState(false);
  const [isDoubleTouch, setIsDoubleTouch] = useState(false);
  const [start, setStart] = useState([]);
  const [touchMove, setTouchMove] = useState([]);
  //获取两个触点中心坐标
  const [screenMinPoint, setMidPoint] = useState([]);
  //得到缩放比例
  const scale = useMemo(
    () =>
      getDistance(touchMove[0], touchMove[1]) / getDistance(start[0], start[1]),
    [touchMove, start]
  );
  const onTouchStart = (e) => {
    if (e.touches.length >= 2) {
      console.log(true);
      
      //判断是否有两个点在屏幕上
      // setIsDoubleTouch(true);
      // setStart(e.touches);

      // setMidPoint(getMidpoint(e.touches[0], e.touches[1]));
    }
  };
  const onTouchMove = (e) => {
    if (e.touches.length >= 2 && isDoubleTouch) {
      //手势事件
      //得到第二组两个点
      setTouchMove(e.touches);
    }
  };
  return (
    <View className='apex__olympus'>
      <Image
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        src={MapBg}
        className='apex__olympusbg'
        style={{
          width: `${width}px`,
          height: `${width}px`,
          transformOrigin: `${screenMinPoint[0]} ${screenMinPoint[1]}`,
          scale: scale,
        }}
      />
    </View>
  );
}
