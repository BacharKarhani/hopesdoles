const BASE_URL = "https://api.hopesdolls.com/api";

const URLs = {
  LOGIN: `${BASE_URL}/admins/login`,
  UserLogin: `${BASE_URL}/users/login`,
  UserSignup: `${BASE_URL}/users/signup`,
  CATEGORIES: `${BASE_URL}/categories`,
  ABOUTS: `${BASE_URL}/abouts`,
  ADMINSIGNUP: `${BASE_URL}/admins/signup`,
  ADMIN: `${BASE_URL}/admins`,
  DELETE_ADMIN: (id) => `${BASE_URL}/admins/${id}`,
  DELETE_CATEGORY: (id) => `${BASE_URL}/categories/${id}`,
  GET_CATEGORY: (id) => `${BASE_URL}/categories/${id}`,
  UPDATE_CATEGORY: (id) => `${BASE_URL}/categories/${id}`,
  COLLECTIONS: `${BASE_URL}/collections`,
  ADD_COLLECTION: `${BASE_URL}/collections`,
  DELETE_COLLECTION: (id) => `${BASE_URL}/collections/${id}`,
  GET_COLLECTION: (id) => `${BASE_URL}/collections/${id}`,
  UPDATE_COLLECTION: (id) => `${BASE_URL}/collections/${id}`,
  COUPONS: `${BASE_URL}/coupon`,
  GET_COUPON: (id) => `${BASE_URL}/coupon/${id}`,
  DELETE_COUPON: (id) => `${BASE_URL}/coupon/delete/${id}`,
  CREATE_COUPON: `${BASE_URL}/coupon/create`,
  EDIT_COUPON: (id) => `${BASE_URL}/coupon/edit/${id}`,
  GET_EMAILS: `${BASE_URL}/emails`,
  GET_ORDER: (id) => `${BASE_URL}/orders/${id}`,
  UPDATE_ORDER_STATUS: (id) => `${BASE_URL}/orders/${id}`,
  GET_ORDER_STATUSES: `${BASE_URL}/orderStatuses`,
  GET_PENDING_ORDERS: `${BASE_URL}/orders/stts/67ae2d6c96e55b1038217622`,
  GET_REJECTED_ORDERS: `${BASE_URL}/orders/stts/67ae2c7496e55b10382175fd`,
  DELETE_ORDER: (id) => `${BASE_URL}/orders/${id}`,
  GET_ALL_ORDERS: `${BASE_URL}/orders/all`,
  GET_ACCEPTED_ORDERS: `${BASE_URL}/orders/stts/67ae2d5e96e55b103821761a`,
  REJECT_ORDER: (id) => `${BASE_URL}/orders/${id}`,
  ADD_PRODUCT: `${BASE_URL}/products`,
  GET_PRODUCT_BY_ID: (id) => `${BASE_URL}/products/${id}`,
  GET_COLLECTION_BY_ID: (id) => `${BASE_URL}/collections/some/${id}`,
  UPDATE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
  GET_PRODUCTS: (id, page = 1) => `${BASE_URL}/products/some/${id}?page=${page}`,
  DELETE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,

  
  ADD_VIDEO: `${BASE_URL}/api/video`,
  GET_VIDEO_BY_ID: (id) => `${BASE_URL}/video/by/${id}`,
  UPDATE_VIDEO: (id) => `${BASE_URL}/video/${id}`,
  GET_ALL_VIDEOS: `${BASE_URL}/video`,
  DELETE_VIDEO: (id) => `${BASE_URL}/video/${id}`,
  EDIT_VIDEO: (id) => `/dashboard/editvideo/${id}`,

  getVideo: (name) => `${BASE_URL}/video/${name}`,
  getLastVideo: (name) => `${BASE_URL}/video/last/${name}`,
  getDollDetails: (id) => `${BASE_URL}/doll/details/${id}`,

  SUBSCRIBE_EMAIL: `${BASE_URL}emails`,

  UPDATE_CART_ITEM: (id) => `${BASE_URL}/cart/update/${id}`, 
  SUBMIT_ORDER: () => `${BASE_URL}/orders`,  
  CHANGE_PASSWORD: (id) => `${BASE_URL}/users/password/${id}`,


};

export default URLs;
