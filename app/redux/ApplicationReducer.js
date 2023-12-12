import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const initialState = {
    noFetch: true,
    journalsList: [],
    pageData: null, // Added Because Task Wanted Us To Set JournalsList To Redux So We Needed Another State for pages
    error: null,
    isLoading: false,
    query: null,
    modal: null,
    darkMode: localStorage?.getItem('dark') == true.toString()
};

export const fetchJournals = createAsyncThunk(
    'journals/fetchJournals',
    async ({query, page}) => {
        const response = await axios.get(
            `https://doaj.org/api/v3/search/journals/${query}?pageSize=4&page=${page}`
        )
        return response.data
    }
)



// A function that creates a slice for journals state
const applicationSlice = createSlice({
    name: 'journals',
    initialState: initialState,
    reducers: {
        // Reducers for journals state
        setNoFetch(state, action) {
            state.noFetch = action.payload
        }
        ,
        setLoading(state, action) {
            state.isLoading = action.payload
        }
        ,
        setModal(state, action) {
            state.modal = action.payload
        }
        ,
        setQuery(state, action) {
            state.query = action.payload
        }
        ,
        setDarkMode(state, action) {
            localStorage?.setItem('dark', action.payload)
            state.darkMode = action.payload
        }
        ,
    },
    extraReducers: (builder) => {
        // Use `extraReducers` to handle ApplicationReducer that were generated
        // _outside_ of the slice, such as thunks or in other slices
        builder
            .addCase(fetchJournals.pending, (state) => {
                state.isLoading = true
            })
        builder
            .addCase(fetchJournals.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.pageData = {
                    page: action.payload.page,
                    pageSize: action.payload.pageSize,
                    total: action.payload.total,
                }
                state.journalsList = action.payload.results
            })
        builder
            .addCase(fetchJournals.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
                state.modal = {
                    view: true,
                    message: 'Encountered Error, Try Again',
                }
            })
    }
})

// Export the action creators and selectors
export const {
    setNoFetch,
    setLoading,
    setModal,
    setQuery,
    setDarkMode,
} = applicationSlice.actions

// Export the reducer
export default applicationSlice.reducer
