import { useState } from "react";
import { View, Text, Button, Picker } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";
import { KINGSCANYON, OLYMPUS, WORLDSEDGE } from "../../constant";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
    
  });
  const [map, setMap] = useState<number>(0);
  const maps = [
    OLYMPUS,
    KINGSCANYON,
    WORLDSEDGE,
    // {
    //   id: 4,
    //   name: "风暴点",
    // },
  ];
  const mapChange = (val) => {
    const {
      detail: { value },
    } = val;
    setMap(value);
    Taro.navigateTo({
      url: "/pages/olympus/index",
    });
  };
  return (
    <View className='apex__wrap'>
      <Text className='apex__logo'>Apex Legends</Text>

      <Picker mode='selector' onChange={mapChange} range={maps} value={map}>
        <Button type='primary' size='mini'>
          选择地图
        </Button>
      </Picker>
    </View>
  );
}
