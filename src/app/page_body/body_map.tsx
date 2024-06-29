/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import "./body.css";

export function BodyMap(props: {
  viewCity: string;
  setViewCity: Dispatch<SetStateAction<string>>;
}) {
  const mapRef = useRef < HTMLDivElement > (null);
  // const [amapLoaded, setAmapLoaded] = useState(props.viewCity);
  const setViewCity = props.setViewCity;

  useEffect(() => {

    if (typeof window !== 'undefined') {
      import('@amap/amap-jsapi-loader').then(AMapLoader => {
        AMapLoader.load({
          key: '5bf7b88f5ceddec48a03f050b32ef242',
          version: '2.0',
          Loca: { // 是否加载 Loca， 缺省不加载
            version: '2.0.0' // Loca 版本，缺省 1.3.2
          },
        }).then((AMap) => {
          // setAmapLoaded(true);
          let SOC = 'CHN';
          const colors = {
            nationStroke: 'rgb(225, 103, 255)',
            provinceStroke: 'rgb(103, 194, 255)',
            cityStroke: 'rgba(103, 255, 111, 1)',
            fill: 'rgb(251, 255, 9)',
          }

          const distMap: any = {
            CHN: new AMap.DistrictLayer.Country({
              SOC: 'CHN',
              depth: 2,
              zIndex: 10,
              styles: {
                // 颜色格式: #RRGGBB、rgba()、rgb()、[r, g, b, a]
                // 国境线
                'nation-stroke': colors.nationStroke,
                'province-stroke': colors.provinceStroke,
                'city-stroke': colors.cityStroke,
              }
            }),
            MNG: new AMap.DistrictLayer.Country({
              SOC: 'MNG',
              depth: 1,
              zIndex: 10,
              styles: {
                // 国境线
                'nation-stroke': colors.nationStroke,
                'province-stroke': colors.provinceStroke,
                'city-stroke': colors.cityStroke,
              }
            }),
            RUS: new AMap.DistrictLayer.Country({
              SOC: 'RUS',
              depth: 1,
              zIndex: 10,
              styles: {
                // 国境线
                'nation-stroke': colors.nationStroke,
                'province-stroke': colors.provinceStroke,
                'city-stroke': colors.cityStroke,
              }
            }),
          }

          // 绘制世界地图国家轮廓
          const distWorld = new AMap.DistrictLayer.World({
            zIndex: 10,
            styles: {
              'nation-stroke': colors.nationStroke,
              'province-stroke': colors.provinceStroke,
              'city-stroke': colors.cityStroke,
            }
          });


          const map = new AMap.Map(mapRef.current, {
            zooms: [2, 4],
            center: [110, 30],
            showIndoorMap: false,
            zoom: 3,
            isHotspot: false,
            defaultCursor: 'pointer',
            touchZoomCenter: 1,
            pitch: 0,
            layers: [
              distWorld,
              distMap.CHN,
              distMap.MNG,
              distMap.RUS,
            ],
            viewMode: '3D',
          });

          map.on('click', function (ev: any) {
            var px = ev.pixel;
            // 拾取所在位置的行政区
            var props = distWorld.getDistrictByContainerPos(px);
            if (props && Object.keys(distMap).includes(props.SOC)) {
              SOC = props.SOC;
              props = distMap[SOC].getDistrictByContainerPos(px);
            }

            if (props) {
              
              setViewCity(props.NAME_CHN);
              var adcode = (props.SOC == 'CHN' ? props.adcode : props.NR_C_ID);
              var SOC2 = props.SOC;
              if (adcode) {
                // 重置行政区样式
                distMap[SOC].setStyles({
                  // 国境线
                  //nation-stroke': nationStroke,
                  'nation-stroke': colors.nationStroke,
                  'province-stroke': colors.provinceStroke,
                  'city-stroke': colors.cityStroke,
                  // 海岸线
                  //'coastline-stroke': '',
                  'fill': function (props2: any) {
                    if (props2.SOC == 'CHN') {
                      return props2.adcode == adcode ? colors.fill : 'white';
                    } else {
                      return props2.NR_C_ID == adcode ? colors.fill : 'white';
                    }
                  }
                });
              } else if (SOC2) {
                // 重置行政区样式
                distWorld.setStyles({
                  // 国境线
                  'nation-stroke': colors.nationStroke,
                  'province-stroke': colors.provinceStroke,
                  'city-stroke': colors.cityStroke,
                  'fill': function (props2: any) {
                    return props2.SOC == SOC2 ? colors.fill : 'white';
                  }
                });
              }
            }
          });
        });
      })
    }
  }, []);
  return ( 
    <div className = "map_body" >
      <div ref = {mapRef} id = "container" > </div>
    </div>
  );
}