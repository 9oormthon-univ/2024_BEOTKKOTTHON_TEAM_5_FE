//public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const FBapp = firebase.initializeApp(firebaseConfig);
const messaging = FBapp.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // const notificationTitle = "백그라운드 메세지 제목입니다";
  // const notificationOptions = {
  //   body: payload.notification.body, // 'payload'의 'notification.body'를 사용
  //   icon: "/firebase-logo.png"
  // };
  // //알림 표시
  // self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  // 알림 창 닫기
  event.notification.close();

  // '/chat' 라우트로 사용자를 이동시킵니다.
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // 이미 '/chat' 페이지가 열려있는 탭이 있는지 확인합니다.
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // 여기서는 단순화를 위해 모든 경로를 검사하지 않습니다.
        // 실제로는 client.url을 검사하여 적절히 처리할 필요가 있을 수 있습니다.
        if (client.url.includes("/chat") && "focus" in client) {
          return client.focus();
        }
      }
      // '/chat' 페이지가 열려있는 탭이 없으면 새 탭에서 엽니다.
      if (clients.openWindow) {
        return clients.openWindow("/chat");
      }
    })
  );
});
