import React, { useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker} from "react-kakao-maps-sdk";

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 37.5590083,
      lng: 126.99869,
    },
    errMsg: null,
    isLoading: true,
  });
  //const [markers, setMarkers] = useState([]);
  const markers = [ //마커 확인용
    {
      id: 0,
      title: "흡연구역1",
      lat: 37.557609,
      lng: 127.0003595,
      info: "담배피기 좋은 곳1",
    }
  ];
  //const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용하여 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setLocation을 이용하여 지도의 중심위치를 수정
          setMyLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,//위도
              lng: position.coords.longitude,//경도
            },
            isLoading: false,
          }));
        }
      );
    } else { // GeoLocation을 정상적으로 이용할 수 없는 경우 오류 메세지 출력 
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
  //   //     console.log(res);
  //   //     setName(res.data.name);
  //   //     setAddress(res.data.address);
  //   //     setImgUrl(res.data.imgUrl);
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
  const MarkerDetail = () => {
    return (
      <MarkerDetailContainer>
        <DetailInfo>
          <DetailTitle>
            {markers[0].title}
          </DetailTitle>
          <DetailBody>
            <DetailImg src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png"></DetailImg>
            <DetailContent>{markers[0].info}</DetailContent>
          </DetailBody>
        </DetailInfo>
      </MarkerDetailContainer>
    );
  }
  markers[0].content = <MarkerDetail/>

  const EventMarkerContainer = ({ position, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <MapMarker position={position} onClick={() => setIsOpen(!isOpen)}>
        {isOpen && content}
      </MapMarker>
    );
  };

  // const mapCloseHandler = () => {
  //   navigate("/");
  // };

  // const addSmokingLocationHandler = () => {
  //   navigate("/addSmokingLocation");
  // };
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
          {markers.map((marker) => (
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
        </Map>
      </MapContainer>
    </div>
  );
}

export default MapPage;