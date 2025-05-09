import { getAccessToken, getRefreshToken, handleLogin } from '@/app/lib/actions';

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log('get', url);

    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json', // i want json type
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      console.log('Response:', json);
      return json;
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
  },

  getWithCredentials: async function (url: string): Promise<any> {
    console.log('getWithCredentials', url);

    const accessToken = await getAccessToken();
    console.log('accessToken', accessToken);

    if (accessToken === null) {
      return null;
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
    )
    .then(json => {
      console.log('Response:', json);
      return json;
    })
    .catch(error => {
      console.log("Error:", error);
      throw error;
    })
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log('post', url);

    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      console.log("Error:", error);
      throw error;
    })
  },

  postWithCredentials: async function (url: string, data: any = null): Promise<any> {
    console.log('postWithCredentials', url);

    const accessToken = await getAccessToken();
    console.log('accessToken', accessToken);
    if (accessToken === null) {
      return null;
    }

    const isFormData = data instanceof FormData;

    const requestConfig: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        'Authorization': `Bearer ${accessToken}`,
      },
      // Only set the body if data exists
      body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    };

    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, requestConfig)
      .then(response => response.json())
      .then(json => json)
      .catch(error => {
        console.log("Error:", error);
        throw error;
      });
  },


}

export default apiService;


