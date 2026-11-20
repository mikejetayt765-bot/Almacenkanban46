self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", event => {
  let datos = {};

  try {
    datos = event.data ? event.data.json() : {};
  } catch (error) {
    datos = {};
  }

  const titulo = datos.titulo || "Aviso de almacén";
  const cuerpo = datos.mensaje || "";
  const destino = datos.destino || "#inicio";

  event.waitUntil(
    self.registration.showNotification(titulo, {
      body: cuerpo,
      icon: "icono.png",
      badge: "icono.png",
      tag: datos.id || "kanban",
      renotify: true,
      data: {
        destino: destino
      }
    })
  );
});

self.addEventListener("notificationclick", event => {
  const destino = event.notification.data?.destino || "#inicio";

  event.notification.close();

  event.waitUntil(
    (async () => {
      const abiertas = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true
      });

      for (const ventana of abiertas) {
        if (ventana.url.includes(self.location.origin)) {
          await ventana.focus();
          ventana.postMessage({
            tipo: "abrir-notificacion",
            destino: destino
          });
          return;
        }
      }

      const nueva = await self.clients.openWindow(
        self.registration.scope + "index.html" + destino
      );

      if (nueva) {
        await nueva.focus();
      }
    })()
  );
});