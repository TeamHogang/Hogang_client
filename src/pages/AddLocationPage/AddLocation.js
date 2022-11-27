import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import DetailModal from "../../components/DetailModal";

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AreaSelectButton = styled.button`
  position: absolute;
  bottom: 30px;
  background-color: #ffffff;
  color: #000000;
  width: 130px;
  height: 50px;
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

function AddLocation() {
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 37.5590083,
      lng: 126.99869,
    },
    errMsg: null,
    isLoading: true,
  });

  const [position, setPosition] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
        setIsOpen(true);
    }
    
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

  return (
    <div>
      <MapContainer>
        <Map // 지도를 표시할 컨테이너
          center={myLocation.center}
          style={{
            //지도의 크기
            width: "100vw",
            height: "100vh",
          }}
          level={3} //지도의 확대 레벨
          onClick={(_t, MouseEvent) =>
            setPosition({
              lat: MouseEvent.latLng.getLat(),
              lng: MouseEvent.latLng.getLng(),
            })
          }
        >
          {position && <MapMarker position={position} />}
        </Map>
        <AreaSelectButton onClick={onClickButton}>선택 완료</AreaSelectButton>
        {isOpen && (
          <DetailModal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default AddLocation;
