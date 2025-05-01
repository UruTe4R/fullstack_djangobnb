import { getAccessToken } from '@/app/lib/actions';

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

  postWithCredentials: async function (url: string, data: any): Promise<any> {
    console.log('postWithCredentials', url);

    const accessToken = await getAccessToken();
    console.log('accessToken', accessToken);

    const isFormData = data instanceof FormData;

    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(isFormData ? {} : {'Content-Type': 'application/json'}),
        'Authorization': `Bearer ${accessToken}`,
      },
      body: data,
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      console.log("Error:", error.errors);
      throw error;
    })
  },

}

export default apiService;
