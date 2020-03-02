import React from 'react';
import { ToastAndroid } from 'react-native';

const initialState = {
  categories: [],
  items: [],
  params: {},
  isLoading: false
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_SET_ITEMS':
      return {
        ...state,
        items: action.items
      };
    case 'PRODUCT_SAVE_PARAMS':
      return {
        ...state,
        params: action.params
      };
    case 'PRODUCT_RELOAD_FULFILLED':
      return {
        ...state,
        ...action.payload.data.data
      };
    case 'PRODUCT_RELOAD_REJECTED':
      ToastAndroid.show('Error reloading product', ToastAndroid.SHORT);
      return state;
    case 'PRODUCT_LOAD_MORE_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'PRODUCT_LOAD_MORE_FULFILLED':
      const newState = {
        ...state,
        ...action.payload.data.data,
        isLoading: false
      };
      newState.items = [...state.items, ...newState.items];
      return newState;
    case 'PRODUCT_LOAD_MORE_REJECTED':
      ToastAndroid.show('Error reloading more product', ToastAndroid.SHORT);
      return {
        ...state,
        isLoading: false
      };
    case 'PRODUCT_RELOAD_CATEGORIES_FULFILLED':
      return {
        ...state,
        categories: action.payload.data.data.items
      };
    default:
      return state;
  }
};

export default product;
