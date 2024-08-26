import { useEffect, useState } from 'react';

function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = decodeURIComponent(atob(base64Url).replace(/(.)/g, function (m, p) {
            return '%' + ('00' + p.charCodeAt(0).toString(16)).slice(-2);
        }));
        return JSON.parse(base64);
    } catch (e) {
        console.error("Invalid token:", e);
        return null;
    }
}

export default function useToken() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserInfo(parseJwt(token));
    }, []);

    return userInfo;
}
