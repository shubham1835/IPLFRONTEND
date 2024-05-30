import React, { createContext, useState, useEffect } from 'react'

import { merge } from 'lodash'

import { MatxLayoutSettings } from 'app/components/MatxLayout/settings'
import { getToken } from "firebase/messaging";
import { messaging } from '../../config';
import { getMessaging, onMessage } from "firebase/messaging";
const SettingsContext = createContext({
    settings: MatxLayoutSettings,
    updateSettings: () => { },
})

export const SettingsProvider = ({ settings, children }) => {
    const fmessaging = getMessaging();
    onMessage(fmessaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
    });
    const VITE_APP_VAPID_KEY = 'BIQ_pfxscjdI7gMAovSKk88uEJoOoWyK_lZijsutlNXzg59YWRFoGnKotECF3-kukX1udV7LsnUWWbzwqF0yMzw';
    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: VITE_APP_VAPID_KEY,
            });

            //We can send token to server
            console.log("Token generated : ", token);
            window.localStorage.setItem('firebaseToken', token)
        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }

    useEffect(() => {
        requestPermission();
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
