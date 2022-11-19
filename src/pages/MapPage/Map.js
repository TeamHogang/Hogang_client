import React, { useEffect, useRef } from 'react';
import { markerdata } from "../../data/markerData";
import "./customOverlay.css"

const { kakao } = window;

const Map = () => {
  const mapContainer = useRef(null);
  const { kakao } = window;
  const position = new kakao.maps.LatLng(37.558287, 127.000167);
  const mapOptions = {
    center: position, // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
  };

  var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지 -> 나중에 담배사진으로 바꿀 예정
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current, mapOptions);
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 반복문을 이용하여 마커를 생성
    markerdata.forEach((el) => {
      var markerPosition = new kakao.maps.LatLng(el.lat, el.lng);
      // 마커 생성
      var marker = new kakao.maps.Marker({
        //마커가 표시될 지도
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
        image: markerImage,
      });

      // 커스텀 오버레이에 표출될 내용
      var content = document.createElement("div");
      content.className = "wrap";
      
      var info = document.createElement("div");
      info.className = "info";
      content.appendChild(info);

      var title = document.createElement("div");
      title.className = "title";
      title.innerHTML = `${el.title}`;
      info.appendChild(title);

      var close = document.createElement("div");
      close.className = "close";
      close.title = "닫기";
      close.onclick = function () {
        overlay.setMap(null);
      };
      title.appendChild(close);

      var body = document.createElement("div");
      body.className = "body";
      info.appendChild(body);

      var img = document.createElement("div");
      img.className = "img"
      img.innerHTML = '<img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">'
      body.appendChild(img);

      var desc = document.createElement("div");
      desc.className = "desc";
      desc.innerHTML = `${el.content}`
      body.appendChild(desc);

      // 커스텀 오버레이 생성
      var overlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });
    });
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};;

export default Map;
