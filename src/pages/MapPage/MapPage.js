import React, { useEffect, useRef, useState } from 'react';
import { markerdata } from "../../data/markerData";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {Map, MapMarker} from "react-kakao-maps-sdk;"
import "./customOverlay.css";

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkerDetailContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: roboto-mono;
  line-height: 1.5;
`;
const DetailTitle = styled.div`
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
`;

const DetailClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
  &:hover{ cusor:pointer; }
`;

const DetailBody = styled.div`
  position: relative:
  overflow: hidden;
`

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

const DetailInfo = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function MapPage


export default MapPage;
