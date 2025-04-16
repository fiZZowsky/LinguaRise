const BASE_URL = 'https://localhost:7049/api';

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

const request = async (method, endpoint, data = null, isJson = true) => {
  const config = {
    method,
    headers: getHeaders(isJson),
  };

  if (data) {
    config.body = isJson ? JSON.stringify(data) : data;
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Wystąpił błąd');
  }

  return response.status !== 204 ? await response.json() : null;
};

const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, data) => request('POST', endpoint, data),
  put: (endpoint, data) => request('PUT', endpoint, data),
  delete: (endpoint) => request('DELETE', endpoint),
};

export default api;
