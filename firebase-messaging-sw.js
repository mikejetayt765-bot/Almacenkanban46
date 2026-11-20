importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBeUYiRRJFPEUFIORh5MwLm7aFH2A6pYvY",
  authDomain: "almacen-kanban.firebaseapp.com",
  databaseURL: "https://almacen-kanban-default-rtdb.firebaseio.com",
  projectId: "almacen-kanban",
  storageBucket: "almacen-kanban.firebasestorage.app",
  messagingSenderId: "434475617870",
  appId: "1:434475617870:web:188bf5b80f00a95066fd1f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  const titulo = (payload.notification && payload.notification.title) || "Almacén Kanban";
  const cuerpo = (payload.notification && payload.notification.body) || "Tienes un nuevo aviso.";

  self.registration.showNotification(titulo, {
    body: cuerpo,
    icon: "/icono.png"
  });
});