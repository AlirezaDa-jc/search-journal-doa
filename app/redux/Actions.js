import axios from "axios";

export const NO_FETCH = 'NO_FETCH';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const LOADING = 'LOADING';
export const QUERY = 'QUERY';
export const MODAL = 'MODAL';
export const DARK_MODE = 'DARK_MODE';

export const fetchJournals = (query, page) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://doaj.org/api/v3/search/journals/${query}?pageSize=4&page=${page}`
        );
        dispatch({type: FETCH_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({type: FETCH_FAILURE, payload: error.message});
    }
};

export const setNoFetch = (payload) => {
    return {
        type: NO_FETCH,
        payload: payload,
        
    };
}

export const setLoading = (payload) => {
    return {
        type: LOADING,
        payload: payload,
        
    };
}

export const setModal = (payload) => {
    return {
        type: MODAL,
        payload: payload,
        
    };

}

export const setQuery = (payload) => {
    return {
        type: QUERY,
        payload: payload,
        
    };

}

export const setDarkMode = (payload) => {
    return {
        type: DARK_MODE,
        payload: payload,
        
    };

}

