// Firebase Cloud Messaging Service Worker (Background Push saat Chrome ditutup)
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBbXmHtNe9megt5QonuMdalpyO40gZLbf0",
  authDomain: "kapsul-surat-c6426.firebaseapp.com",
  databaseURL: "https://kapsul-surat-c6426-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kapsul-surat-c6426",
  storageBucket: "kapsul-surat-c6426.firebasestorage.app",
  messagingSenderId: "322713402246",
  appId: "1:322713402246:web:9a79fbc9fbaa316d008a07"
});

const messaging = firebase.messaging();

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification && event.notification.data && event.notification.data.link) || "./";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
