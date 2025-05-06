'use server';

import { cookies } from 'next/headers';
import apiService from '@/app/services/apiService';

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  // save userId
  cookieStore.set('session_userid', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  })
  // save accessToken
  cookieStore.set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hour
    path: '/'
  })
  // save refreshToken
  cookieStore.set('session_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24* 7, // 1 week
    path: '/'
  })
}

export async function resetAuthCookie() {
  const cookieStore = await cookies()

  cookieStore.delete('session_userid');
  cookieStore.delete('session_access_token');
  cookieStore.delete('session_refresh_token');
}

export async function getUserId() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('session_userid')?.value

  return userId ? userId : null
}

export async function getAccessToken() {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('session_access_token')?.value;
  if (!accessToken) {
    console.log("access token expired, trying to refresh");
    accessToken = await handleFetchAccessTokenWithRefreshToken();
  }
  
  

  return accessToken ? accessToken : null
}

export async function getRefreshToken() {
  const cookieStore = await cookies()

  const refreshToken = cookieStore.get('session_refresh_token')?.value;

  if (!refreshToken) {
    // if refresh token is not found, let user log out by resetting auth cookie
    resetAuthCookie();
    console.log('logged out by reseting auth cookie')
  }

  return refreshToken ? refreshToken : null
}


async function handleFetchAccessTokenWithRefreshToken() {
  console.log('handleFetchAccessTokenWithRefreshToken');
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    console.log('refreshing token');
    const refreshResponse = await apiService.post('/api/auth/token/refresh/', {
      refresh: refreshToken
    });

    const accessToken = refreshResponse.access;
    const userId = await getUserId();
    if (!userId) {
      console.log('user id not found');
      return null;
    }

    const cookieStore = await cookies()
    cookieStore.set('session_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/'
    })

    return accessToken;

  } catch (error) {
    console.log("Token refresh failed:", error);
    return null;
  }
}