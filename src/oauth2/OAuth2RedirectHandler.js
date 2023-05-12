import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ACCESS_TOKEN = 'accessToken';

function getUrlParameter(name, search) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function OAuth2RedirectHandler() {
    const location = useLocation();

    useEffect(() => {
        const token = getUrlParameter('token', location.search);

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
        }
    }, [location.search]);

    const token = getUrlParameter('token', location.search);
    const error = getUrlParameter('error', location.search);

    if(token) {
        return <Navigate to={{
            pathname: "/profile",
            state: { from: location }
        }} replace />; 
    } else {
        return <Navigate to={{
            pathname: "/login",
            state: { 
                from: location,
                error: error 
            }
        }} replace />; 
    }
}

export default OAuth2RedirectHandler;