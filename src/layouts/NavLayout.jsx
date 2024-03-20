import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import TabBar from "../components/common/TabBar";
import styled from "styled-components";
import { DISTANCE } from "../constants/location";
import { calculateDistanceInMeter } from "../utils/calculateDistanceInMeter";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../store/auth";
import { authInstance } from "../api/instance";

const NavLayout = () => {
  const [curLocation, setCurLocation] = useState({
    lat: 0,
    lng: 0,
    error: null,
  });

  const success = (position) => {
    const { latitude, longitude } = position.coords;

    if (
      calculateDistanceInMeter(
        curLocation.lat,
        curLocation.lng,
        latitude,
        longitude
      ) > DISTANCE
    ) {
      setCurLocation({
        lat: latitude,
        lng: longitude,
        error: null,
      });
    }
  };

  const error = () => {
    setCurLocation({
      ...curLocation,
      error: "Unable to retrieve your location",
    });
  };

  const getMemberId = async () => {
    await authInstance.get("/member/id").then((res) => {
      localStorage.setItem("memberId", res.data);
    });
  };

  useEffect(() => {
    getMemberId();
    if (!navigator.geolocation) {
      setCurLocation({
        ...curLocation,
        error: "Geolocation is not supported",
      });
    } else {
      const watcher = navigator.geolocation.watchPosition(success, error);

      return () => navigator.geolocation.clearWatch(watcher);
    }
  }, []);

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    authInstance.post(`/gps/update/${memberId}`, {
      latitude: curLocation.lat,
      longitude: curLocation.lng,
    });
  }, [curLocation]);

  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (!isLoggedIn) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Padding>
        <Outlet />
      </Padding>
      <TabBar />
    </>
  );
};

const Padding = styled.div`
  padding-bottom: 96px;
`;

export default NavLayout;
