/*eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import refreshIcon from "../../assets/img/refreshIcon.png";
import plusIcon from "../../assets/img/plusIcon.png";

const MapContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const SmokingAreaButton = styled.button`
  position: absolute;
  top: 80px;
  right: 150px;
  background-color: #ffffff;
  color: #000000;
  width: 130px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5px;
  border-color: #ffffff;
  font-weight: 700;
  z-index: 999;
  opacity: 0.8;
  /* &:active {
    backgroud-color: #000000;
  } */
`;

const NonSmokingAreaButton = styled.button`
  position: absolute;
  top: 80px;
  right: 0px;
  background-color: #ffffff;
  color: #000000;
  width: 130px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5px;
  border-color: #ffffff;
  font-weight: 700;
  z-index: 999;
  opacity: 0.8;
`;

const UpdateLocationButton = styled.button`
  position: absolute;
  background-image: url(${refreshIcon});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ffffff;
  bottom: 100px;
  right: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 800ms ease all;
  border-radius: 20px;
  border-color: #ffffff;
  z-index: 999;
  opacity: 0.8;
`;

const PlusSmokingAreaButton = styled.button`
  position: absolute;
  background-image: url(${plusIcon});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ffffff;
  bottom: 50px;
  right: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 800ms ease all;
  border-radius: 20px;
  border-color: #ffffff;
  z-index: 999;
  opacity: 0.8;
`;

const MarkerDetailContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: -35px;
  width: 288px;
  height: 132px;
  margin-left: -68px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
`;

const DetailInfo = styled.div`
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
  ::after {
    content: "";
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
  }
`;

const DetailTitle = styled.div`
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
`;

const DetailBody = styled.div`
  position: relative;
  overflow: hidden;
`;
const DetailImg = styled.div`
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
`;

const DetailContent = styled.div`
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
`;

function MapPage() {
  /*global kakao*/
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 37.5590083,
      lng: 126.99869,
    },
    errMsg: null,
    isLoading: true,
  });
  //const [markers, setMarkers] = useState([]);
  const markers = [
    //마커 확인용
    // type 0 => 흡연구역 / type => 1 금연구역
    {
      id: 1,
      type: 0,
      name: "흡연구역1",
      lat: 37.557609,
      lng: 127.0003595,
      info: "담배피기 좋은 곳1",
    },
    {
      id: 2,
      type: 1,
      name: "금연구역1",
      lat: 37.559609,
      lng: 127.0001595,
      info: "담배피기 좋은 곳2",
    },
    {
      id: 3,
      type: 0,
      name: "흡연구역2",
      lat: 37.550609,
      lng: 127.0005595,
      info: "담배피기 좋은 곳3",
    },
  ];

  const [smokingMarker, setSomkingMarker] = useState([
    {
      id: 1,
      type: 0,
      name: "흡연구역1",
      lat: 37.557609,
      lng: 127.0003595,
      info: "담배피기 좋은 곳1",
    },
    {
      id: 3,
      type: 0,
      name: "흡연구역2",
      lat: 37.550609,
      lng: 127.0005595,
      info: "담배피기 좋은 곳3",
    },
  ]);
  const [nonSmokingMarker, setNonSmokingMarker] = useState([
    {
      id: 2,
      type: 1,
      name: "금연구역1",
      lat: 37.559609,
      lng: 127.0001595,
      info: "담배피기 좋은 곳2",
    },
  ]);

  const navigate = useNavigate();
  const [smokingBtnActive, setSmokingBtnActive] = useState(false); // 흡연구역 버튼 actvie 상태
  const [nonSmokingBtnActive, setNonSmokingBtnActive] = useState(false); // 금연구역 버튼 actvie 상태
  const [isVisible, setIsVisible] = useState("2"); // 0: 흡연구역 1: 금연구역 2: 모든 구역
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용하여 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition((position) => {
        // setLocation을 이용하여 지도의 중심위치를 수정
        setMyLocation((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude, //위도
            lng: position.coords.longitude, //경도
          },
          isLoading: false,
        }));
      });
    } else {
      // GeoLocation을 정상적으로 이용할 수 없는 경우 오류 메세지 출력
      setMyLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없습니다.",
        isLoading: false,
      }));
    }
  }, []);

  // const MarkerDetail = ({id}) => {
  //   const [title, setTitle] = useState();
  //   const [content, setContent] = useState();
  //   const [imgUrl, setImgUrl] = useState();

  //   // useEffect(() => {
  //   //   GetMarkerDetail(data, id).then((res) => {
  //   //     setMarkers(res.data);
  //   //   });
  //   //   GetSmokingMarkerDetail(data, id).then((res) => {
  //   //     setSmokingMarkerDetail(res.data);
  //   //   });
  //   //   GetNonSmokingMarkerDetail(data, id).then((res) => {
  //   //     setNonSmokingMarkerDetail(res.data);
  //   //   });
  //   // }, []);

  //   return (
  //     <MarkerDetailContainer>
  //       <DetailTitle>{title}</DetailTitle>
  //       <DetailClose></DetailClose>
  //       <DetailBody>
  //         <DetailImg src={imgUrl}></DetailImg>
  //         <DetailInfo>{content}</DetailInfo>
  //       </DetailBody>
  //     </MarkerDetailContainer>
  //     );
  // };

  // for (let i = 0; i < markers.length; i++){
  //   markers[i].content = <MarkerDetail id={markers[i].id} />;
  // }
  // console.log(markers);

  //마커 테스트용
  const MarkerDetail = ({ key, data }) => {
    const [name, setName] = useState();
    const [info, setInfo] = useState();

    console.log(data);

    useEffect(() => {
      setName(data.name);
      setInfo(data.info);
    });

    // 마커 디테일창 UI
    return (
      <MarkerDetailContainer>
        <DetailInfo key={key}>
          <DetailTitle>{name}</DetailTitle>
          <DetailBody>
            <DetailImg src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png"></DetailImg>
            <DetailContent>{info}</DetailContent>
          </DetailBody>
        </DetailInfo>
      </MarkerDetailContainer>
    );
  };

  // 마커 디테일창 생성
  for (let i = 0; i < markers.length; i++) {
    markers[i].content = <MarkerDetail key={markers[i].id} data={markers[i]} />;
  }
  for (let i = 0; i < smokingMarker.length; i++) {
    smokingMarker[i].content = (
      <MarkerDetail key={smokingMarker[i].id + 10000} data={smokingMarker[i]} />
    );
  }

  for (let i = 0; i < nonSmokingMarker.length; i++) {
    nonSmokingMarker[i].content = (
      <MarkerDetail
        key={nonSmokingMarker[i].id + 10000}
        data={nonSmokingMarker[i]}
      />
    );
  }

  // 마커 클릭 이벤트
  const EventMarkerContainer = ({ position, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <MapMarker position={position} onClick={() => setIsOpen(!isOpen)}>
        {isOpen && content}
      </MapMarker>
    );
  };

  const filterSmokingArea= () => {
    let smokingBtn = !smokingBtnActive; // 업데이트가 반영이 안된 상태여서 임시변수를 이용.
    let nonSmokingBtn = nonSmokingBtnActive;

    if (nonSmokingBtnActive === true) {
      setNonSmokingBtnActive(!nonSmokingBtnActive);
      nonSmokingBtn = !nonSmokingBtn;
    }

    if (nonSmokingBtn === false && smokingBtn === false) {
      // 전체구역을 보이기 위해 isVisible 값을 0으로 변경
      setIsVisible("2");
    }
    if (nonSmokingBtn === false && smokingBtn === true) {
      // 흡연구역만 보이기 위해 isVisible 값을 0으로 변경
      setIsVisible("1");
    }
  }

  // 흡연구역 버튼 클릭 이벤트
  const addSmokingLocationHandler = () => {
    navigate("/AddLocation");
  };

  const filteringSmokingAreaHandler = () => {
    // toggle
    setSmokingBtnActive(!smokingBtnActive);
    filterSmokingArea();
  };

  //금연구역 버튼 클릭 이벤트
  const filteringNonSmokingAreaHanlder = () => {
    // toggle
    setNonSmokingBtnActive(!nonSmokingBtnActive);
    let nonSmokingBtn = !nonSmokingBtnActive; // 업데이트가 반영이 안된 상태여서 임시변수를 이용
    let smokingBtn = smokingBtnActive;

    if (smokingBtnActive === true) {
      setSmokingBtnActive(!smokingBtnActive);
      smokingBtn = !smokingBtn;
    }
    
    if (nonSmokingBtn === false && smokingBtn === false) {
      // 전체구역을 보이기 위해 isVisible 값을 0으로 변경
      setIsVisible("2");
    }
    if (nonSmokingBtn === true && smokingBtn === false) {
      // 흡연구역만 보이기 위해 isVisible 값을 1로 변경
      setIsVisible("0");
    }
  };

  const smokeFilter = () => {
    setFlag(!flag);
  };

  return (
    <div>
      <MapContainer>
        <Map
          center={myLocation.center}
          style={{
            //지도의 크기
            width: "100vw",
            height: "100vh",
          }}
          level={5} //지도의 확대 레벨
          draggable={true}
        >
          {markers.map((marker) => {
            if ((isVisible === "2" || isVisible === "1") && marker.type == 0) {
              return (
                <EventMarkerContainer
                  key={marker.id}
                  position={{
                    lat: `${marker.lat}`,
                    lng: `${marker.lng}`,
                  }} // 마커를 표시할 위치
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                    size: {
                      width: 24,
                      height: 35,
                    }, // 마커이미지의 크기입니다
                  }}
                  title={marker.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  content={marker.content}
                />
              );
            } if ((isVisible === "2" || isVisible === "0") && marker.type == 1) {
              return (
                <Circle
                  key={marker.id}
                  center={{
                    lat: marker.lat,
                    lng: marker.lng,
                  }}
                  radius={50}
                  strokeWeight={3}
                  strokeOpacity={0.1}
                  fillColor={"#800020"}
                  fillOpacity={0.5}
                />
              );
            }
          })}
          {/* {isVisible === "0" && //흡연구역만 출력
            smokingMarker.map((marker) => (
              <EventMarkerContainer
                key={marker.id}
                position={{
                  lat: `${marker.lat}`,
                  lng: `${marker.lng}`,
                }} // 마커를 표시할 위치
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
                title={marker.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                content={marker.content}
              />
            ))}
          {isVisible === "1" && //금연구역만 출력
            nonSmokingMarker.map((marker) => (
              <Circle
                key={marker.id}
                center={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
                radius={50}
                strokeWeight={3}
                strokeOpacity={0.1}
                fillColor={"#800020"}
                fillOpacity={0.5}
              />
            ))} */}
        </Map>
        <SmokingAreaButton
          id="SmokingArea"
          onClick={filteringSmokingAreaHandler}
          style={{ backgroundColor: smokingBtnActive ? "#9bb7d6" : "#ffffff" }}
        >
          흡연 구역
        </SmokingAreaButton>
        <NonSmokingAreaButton
          id="NonSmokingArea"
          onClick={filteringNonSmokingAreaHanlder}
          s
          style={{
            backgroundColor: nonSmokingBtnActive ? "#9bb7d6" : "#ffffff",
          }}
        >
          금연 구역
        </NonSmokingAreaButton>
        <UpdateLocationButton />
        <PlusSmokingAreaButton onClick={addSmokingLocationHandler} />
      </MapContainer>
    </div>
  );
}

export default MapPage;
