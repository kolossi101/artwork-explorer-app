import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function authorizedFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  } catch (err) {
    console.error('Request failed:', err);
    return [];
  }
}

export async function addToFavourites(id) {
  return await authorizedFetch(`${API_URL}/favourites/${id}`, {
    method: 'PUT',
  });
}

export async function removeFromFavourites(id) {
  return await authorizedFetch(`${API_URL}/favourites/${id}`, {
    method: 'DELETE',
  });
}

export async function getFavourites() {
  return await authorizedFetch(`${API_URL}/favourites`, {
    method: 'GET',
  });
}

export async function addToHistory(id) {
  return await authorizedFetch(`${API_URL}/history/${id}`, {
    method: 'PUT',
  });
}

export async function removeFromHistory(id) {
  return await authorizedFetch(`${API_URL}/history/${id}`, {
    method: 'DELETE',
  });
}

export async function getHistory() {
  return await authorizedFetch(`${API_URL}/history`, {
    method: 'GET',
  });
}
