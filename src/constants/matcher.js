//base url
let baseUrl = 'https://warehouse.zippdeliveries.com/api';

//response error status code
export const ERROR_STATUS_CODE = '503';

//api end point
export const LOGIN_URL = baseUrl + '/login';
export const GET_NEW_DELIVER_URL = baseUrl + '/new-deliveries';
export const GET_COMPLETE_DELIVER_URL = baseUrl + '/complete-deliveries';
export const GET_PROFILE_URL = baseUrl + '/profile';
export const POST_FIREBASE_TOKEN_URL = baseUrl + '/firebase-auth';
export const GET_DETAIL_DELIVER_URL = baseUrl + '/detail-deliveries/';
export const POST_UPDATE_STATUS_URL = baseUrl + '/update-status';

//redux actions type
export const AUTHENTICATE = 'Authenticate';
export const PROFILE_RESPONSE_DATA = 'Profile Response Data';
export const NEW_DELIVER_RESPONSE_DATA = 'New Deliver Response Data';
export const COMPLETED_DELIVER_RESPONSE_DATA =
  'Completed Deliver Response Data';
export const DELIVER_DETAIL_RESPONSE_DATA = 'Deliver Details Response Data';
export const NOTIFICATION_RECEIVED = 'NotificationReceived';

//action status
export const STATUS_ACCEPTED = 'Accepted';
export const STATUS_DISPATCHED = 'Dispatched';
export const STATUS_COMPLETED = 'Delivered';

//async storage key
export const KEY_FCM_TOKEN = 'Firebase token';
export const KEY_AUTH_TOKEN = 'Authentication token';
