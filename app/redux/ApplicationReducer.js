import {DARK_MODE, FETCH_FAILURE, FETCH_SUCCESS, LOADING, MODAL, NO_FETCH} from "./Actions";

const initialState = {
    noFetch : true,
    journalsList: [],
    pageData: null, // Added Because Task Wanted Us To Set JournalsList To Redux So We Needed Another State for pages
    error: null,
    isLoading: false,
    query : null,
    modal : null,
    darkMode: localStorage.getItem('dark') == true.toString()
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                journalsList: action.payload.results,
                pageData: {
                    page : action.payload.page,
                    pageSize : action.payload.pageSize,
                    total : action.payload.total
                },
                error: null,
            };


        case FETCH_FAILURE:
            return {
                ...state,
                error: action.payload,
                modal: {
                    view : true ,
                    message : "Encountered Error, Try Again"
                }
            };
        case LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case NO_FETCH:
            return {
                ...state,
                noFetch: action.payload
            };
        case "QUERY":
            return {
                ...state,
                query: action.payload
            };
        case MODAL:
            return {
                ...state,
                modal: action.payload
            };
        case DARK_MODE:
            localStorage?.setItem('dark', action.payload)
            return {
                ...state,
                darkMode: action.payload
            };
        default:
            return state;
    }
};

export default applicationReducer;
