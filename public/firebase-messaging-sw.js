//public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAQoBXJLWLtt-IrmLEx7UZE7zpXnmEc5pY",
  authDomain: "distance-f328d.firebaseapp.com",
  projectId: "distance-f328d",
  storageBucket: "distance-f328d.appspot.com",
  messagingSenderId: "460756816017",
  appId: "1:460756816017:web:ce857120897defd934af30",
  measurementId: "G-D5KLVYC8XW"
}
// Initialize Firebase
const FBapp = firebase.initializeApp(firebaseConfig);
const messaging = FBapp.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = "백그라운드 메세지 제목입니다";
  const notificationOptions = {
    body: payload.notification.body, // 'payload'의 'notification.body'를 사용
    icon: "/firebase-logo.png"
  };

  // 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});
