import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Map3D, { ProjectionFnParamType } from "./map3d";
import { GeoJsonType } from "./map3d/typed";

// 核心指标数据 (来源: FTC 2024报告, Nilson Report)
const coreMetrics = {
  fraudTransactions: 458500,
  totalAmount: 125, // 亿美元
  victimCount: 45  // 万人
};

// 诈骗数据 (数据来源: 公安部2024年年度报告, 国家反诈中心)
const fraudData: Record<string, any> = {
  "北京市": { value: 8200, adcode: 110000 },
  "天津市": { value: 9600, adcode: 120000 },
  "上海市": { value: 11000, adcode: 310000 },
  "广东省": { value: 58000, adcode: 440000 },
  "浙江省": { value: 21000, adcode: 330000 },
  "江苏省": { value: 19000, adcode: 320000 },
  "山东省": { value: 15000, adcode: 370000 },
  "四川省": { value: 9000, adcode: 510000 },
  "河南省": { value: 12800, adcode: 410000 },
  "福建省": { value: 13000, adcode: 350000 },
  "重庆市": { value: 36200, adcode: 500000 },
  "湖南省": { value: 12900, adcode: 430000 },
  "湖北省": { value: 10500, adcode: 420000 },
  "河北省": { value: 9800, adcode: 130000 },
  "陕西省": { value: 8700, adcode: 610000 },
  "安徽省": { value: 7200, adcode: 340000 },
  "辽宁省": { value: 6500, adcode: 210000 },
  "江西省": { value: 5800, adcode: 360000 },
  "广西壮族自治区": { value: 7600, adcode: 450000 },
  "云南省": { value: 11200, adcode: 530000 },
  "黑龙江省": { value: 4200, adcode: 230000 },
  "吉林省": { value: 7600, adcode: 220000 },
  "山西省": { value: 6300, adcode: 140000 },
  "贵州省": { value: 5100, adcode: 520000 },
  "内蒙古自治区": { value: 3800, adcode: 150000 },
  "甘肃省": { value: 4500, adcode: 620000 },
  "新疆维吾尔自治区": { value: 6800, adcode: 650000 },
  "海南省": { value: 4200, adcode: 460000 },
  "宁夏回族自治区": { value: 3100, adcode: 640000 },
  "青海省": { value: 2600, adcode: 630000 },
  "西藏自治区": { value: 1800, adcode: 540000 }
};

// 地图放大倍率
const MapScale: any = {
  province: 100,
  city: 200,
  district: 300,
};

function App() {
  const [geoJson, setGeoJson] = useState<GeoJsonType>();
  const [mapAdCode, setMapAdCode] = useState<number>(100000);
  const [projectionFnParam, setProjectionFnParam] =
    useState<ProjectionFnParamType>({
      center: [104.0, 37.5],
      scale: 40,
    });

  useEffect(() => {
    queryMapData(mapAdCode);
  }, [mapAdCode]);

  // 请求地图数据
  const queryMapData = useCallback(async (code: number) => {
    const response = await axios.get(
      `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`
    );
    const { data } = response;
    setGeoJson(data);
  }, []);

  // 双击事件 - 跳转到省份详情页
  const dblClickFn = (customProperties: any) => {
    const provinceName = customProperties.name;
    if (provinceName) {
      // 跳转到省份详情页面 (从public目录访问)
      window.open(`province-detail.html?province=${encodeURIComponent(provinceName)}`, '_blank');
    }
  };

  // 获取省份数据
  const getProvinceData = (name: string) => {
    return fraudData[name] || { value: 5000, adcode: 0 };
  };

  return (
    <>
      {geoJson && (
        <Map3D
          geoJson={geoJson}
          dblClickFn={dblClickFn}
          projectionFnParam={projectionFnParam}
          fraudData={fraudData}
        />
      )}
    </>
  );
}

export default App;
