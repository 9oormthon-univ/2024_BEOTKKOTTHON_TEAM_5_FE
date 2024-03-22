import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TabBar from "../components/common/TabBar";
import styled from "styled-components";
import { DISTANCE } from "../constants/location";
import { calculateDistanceInMeter } from "../utils/calculateDistanceInMeter";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../store/auth";
import { authInstance } from "../api/instance";

const NavLayout = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();
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

  useEffect(() => {
    // 로그인 상태 확인
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return; // 리다이렉트 후 다음 코드는 실행되지 않도록 함수 종료
    }

    const getMemberId = async () => {
      await authInstance.get("/member/id").then((res) => {
        localStorage.setItem("memberId", res.data);
      });
    };

    const checkProfileRegistered = async () => {
      const isRegistered = await authInstance
        .get("/member/check/profile")
        .then((res) => res.data);

      if (!isRegistered) {
        alert("프로필을 등록해주세요.");
        navigate("/profile");
        return; // 프로필 미등록 시 리다이렉션 후 다음 코드는 실행되지 않도록 함수 종료
      }
    };

    // 로그인 상태가 확인된 후 실행되어야 하는 로직들
    getMemberId();
    checkProfileRegistered();

    if (!navigator.geolocation) {
      setCurLocation({
        ...curLocation,
        error: "Geolocation is not supported",
      });
    } else {
      const watcher = navigator.geolocation.watchPosition(success, error);

      return () => navigator.geolocation.clearWatch(watcher);
    }
  }, [isLoggedIn, navigate]); // navigate를 의존성 배열에 추가

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    if (memberId) {
      authInstance.post(`/gps/update`, {
        latitude: curLocation.lat,
        longitude: curLocation.lng,
      });
    }
  }, [curLocation]);

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
