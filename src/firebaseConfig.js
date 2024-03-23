import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

navigator.serviceWorker.register('/firebase-messaging-sw.js');

const firebaseConfig = {
  apiKey: "AIzaSyAQoBXJLWLtt-IrmLEx7UZE7zpXnmEc5pY",
  projectId: "distance-f328d",
  storageBucket: "distance-f328d.appspot.com",
  messagingSenderId: "460756816017",
  appId: "1:460756816017:web:ce857120897defd934af30",
  measurementId: "G-D5KLVYC8XW"
};

// firebase 앱 초기화
const FBapp = initializeApp(firebaseConfig);
const messaging = getMessaging(FBapp);


// client 토큰 발급 받기
export const onGetToken = () => getToken(messaging, {
  vapidKey: "BL3TJNMH7nqPV4wLrzYhZOzefyN-WlP5--CzS1RO2WWKACm5b32tv2caLiKdbahJBQDeDpsNwZbGvrZJjajR26E"
})
  .then((currentToken) => {
    if (currentToken) {
      localStorage.setItem('clientToken', currentToken);
    } else {
      console.log("토큰 발급 실패");
    }
  })
  .catch((err) => {
    console.log("토큰 발급 에러 발생 : ", err);
  });

//포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  // console.log("Message received. ", payload);\
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/default-icon.png', // 기본 아이콘 경로 설정
  };
  new Notification(notificationTitle, notificationOptions);
  // ...
});