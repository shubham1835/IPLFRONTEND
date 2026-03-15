import React, { createContext, useState, useEffect } from 'react'

import { merge } from 'lodash'
import axios from 'axios'
import useNotification from 'app/hooks/useNotification';
import { MatxLayoutSettings } from 'app/components/MatxLayout/settings'
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from '../../firebase';
import { playIPLSound } from '../utils/notificationSound';
import { SERVER_URI } from '../../config';

const SettingsContext = createContext({
    settings: MatxLayoutSettings,
    updateSettings: () => { },
})

export const SettingsProvider = ({ settings, children }) => {
    const { createNotification } = useNotification();

    const VITE_APP_VAPID_KEY = 'BIQ_pfxscjdI7gMAovSKk88uEJoOoWyK_lZijsutlNXzg59YWRFoGnKotECF3-kukX1udV7LsnUWWbzwqF0yMzw';

    // Subscribe FCM token to the IPL-NOTIFICATION topic via the backend
    // (Web clients cannot subscribe to topics directly — backend uses Admin SDK)
    async function subscribeToIPLTopic(fcmToken) {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            await axios.post(
                `${SERVER_URI}/app/v1/subscription/subscribe/subscribe-topic`,
                {
                    token: fcmToken,
                    topic: 'IPL-NOTIFICATION',
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('[FCM] Subscribed to topic: IPL-NOTIFICATION');
        } catch (err) {
            console.warn('[FCM] Topic subscription failed:', err?.response?.data || err.message);
        }
    }

    async function requestPermission() {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: VITE_APP_VAPID_KEY,
            });

            console.log("Token generated : ", token);
            window.localStorage.setItem('firebaseToken', token);

            // Subscribe this device to the IPL-NOTIFICATION topic
            await subscribeToIPLTopic(token);

        } else if (permission === "denied") {
            alert("You denied for the notification");
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        requestPermission();

        // Register foreground message handler only once
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Foreground message received: ', payload);

            const title = payload?.notification?.title || payload?.data?.title || '';
            if (title.toLowerCase().includes('ipl')) {
                playIPLSound();
            }

            createNotification(payload);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    const [currentSettings, setCurrentSettings] = useState(
        settings || MatxLayoutSettings
    )

    const handleUpdateSettings = (update = {}) => {
        const marged = merge({}, currentSettings, update)
        setCurrentSettings(marged)
    }

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                updateSettings: handleUpdateSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext
