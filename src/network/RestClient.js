import {
  GET_COMPLETE_DELIVER_URL,
  GET_DETAIL_DELIVER_URL,
  GET_NEW_DELIVER_URL,
  GET_PROFILE_URL,
  LOGIN_URL,
  POST_UPDATE_STATUS_URL,
} from '../constants/matcher';

export const RestClientApi = {
  login: async function (email, password) {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return response.json();
  },
  getProfileDetails: async function (token) {
    const response = await fetch(GET_PROFILE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
  getNewDelivers: async function (token) {
    const response = await fetch(GET_NEW_DELIVER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
  getCompletedDelivers: async function (token) {
    const response = await fetch(GET_COMPLETE_DELIVER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
  getOrderDetails: async function (token, id) {
    const response = await fetch(GET_DETAIL_DELIVER_URL + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
  postOrderStatus: async function (id, status, token) {
    const response = await fetch(POST_UPDATE_STATUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        status: status,
      }),
    });
    return response.json();
  },
};
