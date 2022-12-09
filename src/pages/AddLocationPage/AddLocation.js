import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import DetailModal from "../../components/DetailModal";
import { Auth } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Do Hyeon", sans-serif;
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
  z-index: 998;
  opacity: 0.8;
  font-family: "Do Hyeon", sans-serif;
`;

function AddLocation() {
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
  const [position, setPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    if (position !== 0) {
      getAddr(position);
      setIsOpen(true);
    } else {
      alert("지역을 선택해주세요.");
    }
  };

  const [locationDetail, setLocationDetail] = useState("");

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

  function getAddr(position) {
    let geocoder = new kakao.maps.services.Geocoder();
    let callback = async (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setLocationDetail(result[0].address.address_name);
        console.log(locationDetail);
      }
    };
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(position.lng, position.lat, callback);
  }

  useEffect(() => {
    if (position.length > 0) {
      getAddr(position.lat, position.lng);
    }
  });

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
    <MapContainer>
      <Map // 지도를 표시할 컨테이너
        center={myLocation.center}
        style={{
          //지도의 크기
          width: "100vw",
          height: "100vh",
        }}
        level={3} //지도의 확대 레벨
        onClick={(_t, MouseEvent) => {
          setPosition({
            lat: MouseEvent.latLng.getLat(),
            lng: MouseEvent.latLng.getLng(),
          });
        }}
      >
        {position ? <MapMarker position={position} /> : <></>}
      </Map>
      <AreaSelectButton onClick={onClickButton}>선택 완료</AreaSelectButton>
      {isOpen && (
        <DetailModal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          locationDetail={locationDetail}
          position={position}
        />
      )}
    </MapContainer>
  );
}

export default AddLocation;
