import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { showSuccessToast } from './Toast';
import { Navigate } from 'react-router-dom';

export const useAuth = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = Cookies.get('JWT_TOKEN');
        if (token) {
            setIsLoggedIn(true);
            fetchUserInfo(token);
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/authur/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status === true) {
                setUserInfo(response.data.data);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setIsLoggedIn(false);
        }
    };
    const login = (token) => {
        Cookies.set('JWT_TOKEN', token, { expires: 7 });
        setIsLoggedIn(true);
        fetchUserInfo(token);
    };
    const logout = () => {
        Cookies.remove('JWT_TOKEN');
        setIsLoggedIn(false);
        setUserInfo(null);
        showSuccessToast('Đăng xuất thành công');
    };

    return { userInfo, isLoggedIn, login, logout };
};
