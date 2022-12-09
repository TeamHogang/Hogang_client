/*eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Circle, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import refreshIcon from "../../assets/img/refreshIcon.png";
import plusIcon from "../../assets/img/plusIcon.png";
import { GetMarkerList } from "../../api/mapApi";
import { Auth } from "../../api/userApi";
import MarkerModal from "./MarkerModal";

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
  font-family: "Do Hyeon", sans-serif;
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
  font-family: "Do Hyeon", sans-serif;
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

function MapPage() {
  /*global kakao*/
  const navigate = useNavigate();
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 37.5590083,
      lng: 126.99869,
    },
    errMsg: null,
    isLoading: true,
  });
  const [markers, setMarkers] = useState([]);
  const [smokingBtnActive, setSmokingBtnActive] = useState(false); // 흡연구역 버튼 actvie 상태
  const [nonSmokingBtnActive, setNonSmokingBtnActive] = useState(false); // 금연구역 버튼 actvie 상태
  const [isVisible, setIsVisible] = useState("2"); // 0: 흡연구역 1: 금연구역 2: 모든 구역
  const [flag, setFlag] = useState(true);
  const [level, setLevel] = useState(4);
  const [currentMarkers, setCurrentMarkers] = useState([]);

  useEffect(() => {
    // Home 페이지 들어오자마자 Admin인지 아닌지 axios를 통해 확인.
    //  if(axios~~) 해서 isAdmin true -> setIsAdmin(true);
    let data = {
      "X-AUTH-TOKEN": window.localStorage.getItem("X-AUTH-TOKEN"),
    };
    Auth(data).then((res) => {
      if (!res.isAuth) {
        alert("로그인 후 이용해주세요.");
        navigate("/login");
      }
    });
  }, []);

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

  // level 4일 때 마커 정보를 업데이트하는 함수
  useEffect(() => {
    if (level === 4) {
      markers.map((marker) => {
        var pos = new kakao.maps.LatLng(
          Number(marker.latitude),
          Number(marker.longitude)
        );
        // 현재 지도의 중심좌표
        var center = new kakao.maps.LatLng(
          myLocation.center.lat,
          myLocation.center.lng
        );
        var poly = new kakao.maps.Polyline({
          path: [center, pos],
        });
        var dist = poly.getLength();
        if (dist < 5000) {
          // 5km 이내에 있는 마커들만 출력
          currentMarkers.push(marker);
        }
      });
    }
    setCurrentMarkers(currentMarkers);
  }, [flag]);

  //서버에서 마커정보 받아오기
  useEffect(() => {
    //async function ex() {
    GetMarkerList().then((res) => {
      setFlag(true);
      setMarkers(res.data.marker);
      res.data.marker &&
        res.data.marker
          .filter((marker) => marker.type === 1)
          .map((marker) => {
            marker.content = {
              prhsmknm: marker.prhsmknm,
              content: marker.info,
              id: marker._id,
              imgurl: marker.imgurl,
            };
          });
    });
    setFlag(false);
    console.log(markers.length);
  }, []);

  // 레벨이 커지면 마커들의 정보를 추가하여 업데이트
  useEffect(() => {
    if (currentMarkers.length < markers.length) {
      if (level === 5) {
        markers.map((marker) => {
          var pos = new kakao.maps.LatLng(
            Number(marker.latitude),
            Number(marker.longitude)
          );
          // 현재 지도의 중심좌표
          var center = new kakao.maps.LatLng(
            myLocation.center.lat,
            myLocation.center.lng
          );
          var poly = new kakao.maps.Polyline({
            path: [center, pos],
          });
          //console.log(poly);
          var dist = poly.getLength();
          if (dist > 5000 && dist < 9000) {
            // 5km ~ 10km 범위에 있는 마커들도 추가
            if (currentMarkers.includes(marker) === false) {
              currentMarkers.push(marker);
            }
          }
        });
      }
      if (level === 6) {
        markers.map((marker) => {
          var pos = new kakao.maps.LatLng(
            Number(marker.latitude),
            Number(marker.longitude)
          );
          // 현재 지도의 중심좌표
          var center = new kakao.maps.LatLng(
            myLocation.center.lat,
            myLocation.center.lng
          );
          var poly = new kakao.maps.Polyline({
            path: [center, pos],
          });
          //console.log(poly);
          var dist = poly.getLength();
          if (dist > 9000) {
            // 10km 밖에 있는 마커들을 추가
            if (currentMarkers.includes(marker) === false) {
              currentMarkers.push(marker);
            }
          }
        });
      }
      setCurrentMarkers(currentMarkers);
    }
  }, [level]);

  // 마커 클릭 이벤트
  const EventMarkerContainer = ({ position, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [selected, setSelected] = useState("");

    const modalOffHandler = () => {
      setIsModal(false);
    };

    //console.log(content);

    return (
      <div>
        <MapMarker
          position={position}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsModal(!isModal);
            const selectedData = {
              prhsmknm: content.prhsmknm,
              content: content.content,
              id: content._id,
              imgurl: content.imgurl,
            };
            setSelected(selectedData);
          }}
        ></MapMarker>
        {isModal && content && (
          <MarkerModal
            selectedData={selected}
            modalOffHandler={modalOffHandler}
          />
        )}
      </div>
    );
  };

  // 리프레시
  const updateLocationHandler = () => {
    window.location.replace("/map");
  };

  // 흡연구역 버튼 클릭 이벤트
  const addSmokingLocationHandler = () => {
    navigate("/AddLocation");
  };

  const filteringSmokingAreaHandler = () => {
    // toggle
    setSmokingBtnActive(!smokingBtnActive);
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
          level={4} //지도의 확대 레벨
          onCenterChanged={(map) => {
            setLevel(map.getLevel());
          }} // 지도의 확대 레벨, 중심좌표 봔환
          draggable={true}
        >
          {currentMarkers &&
            currentMarkers.map((marker) => {
              //console.log(markers);
              if (
                (isVisible === "2" || isVisible === "0") &&
                marker.type === 0
              ) {
                return (
                  <Circle
                    key={marker._id}
                    center={{
                      lat: marker.latitude,
                      lng: marker.longitude,
                    }}
                    radius={marker.prhsmkar} // 흡연구역 범위
                    strokeWeight={3}
                    strokeOpacity={0.1}
                    fillColor={"#800020"}
                    fillOpacity={0.5}
                  />
                );
              }
              if (
                (isVisible === "2" || isVisible === "1") &&
                marker.type === 1
              ) {
                return (
                  <EventMarkerContainer
                    key={marker._id}
                    position={{
                      lat: `${marker.latitude}`,
                      lng: `${marker.longitude}`,
                    }} // 마커를 표시할 위치
                    image={{
                      src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                      size: {
                        width: 24,
                        height: 35,
                      }, // 마커이미지의 크기입니다
                    }}
                    // title={marker.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    content={marker.content}
                  />
                );
              }
            })}
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
        <UpdateLocationButton onClick={updateLocationHandler} />
        <PlusSmokingAreaButton onClick={addSmokingLocationHandler} />
      </MapContainer>
    </div>
  );
}

export default React.memo(MapPage);
