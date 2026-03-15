importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBy3ucvIJ9qkkFNWUbRhKMnyIDCzMW6fOg",
    authDomain: "ipl-saatta.firebaseapp.com",
    projectId: "ipl-saatta",
    storageBucket: "ipl-saatta.appspot.com",
    messagingSenderId: "296381669945",
    appId: "1:296381669945:web:cdf7c091475140463fe3e8",
    measurementId: "G-MNY9MELM1K"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const title = (payload.notification && payload.notification.title) ||
        (payload.data && payload.data.title) || '';
    const body = (payload.notification && payload.notification.body) ||
        (payload.data && payload.data.body) || '';

    const isIPL = title.toLowerCase().includes('ipl');

    const notificationOptions = {
        body: body,
        icon: '/firebase-logo.png',
        data: payload.data,
        // 'sound' is honoured on Android/mobile browsers
        ...(isIPL && { sound: '/notification.mp3' }),
    };

    self.registration.showNotification(title, notificationOptions);

    // Desktop browsers: service workers cannot use the Audio API.
    // Post a message to all open app tabs so they can play the sound.
    if (isIPL) {
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
            clients.forEach(client => client.postMessage({ type: 'PLAY_IPL_SOUND' }));
        });
    }
});
