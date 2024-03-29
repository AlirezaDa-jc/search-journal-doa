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
    async ({query, page, sort}) => {
        const url = sort == null ? `https://doaj.org/api/v3/search/journals/${query}?pageSize=4&page=${page}` :
            `https://doaj.org/api/v3/search/journals/${query}?pageSize=4&page=${page}&sort=created_date:${sort}`
        const response = await axios.get(url)
        return response.data
    }
)


const applicationSlice = createSlice({
    name: 'journals',
    initialState: initialState,
    reducers: {
        setNoFetch(state, action) {
            state.noFetch = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setModal(state, action) {
            state.modal = action.payload
        },
        setQuery(state, action) {
            state.query = action.payload
        },
        setDarkMode(state, action) {
            localStorage?.setItem('dark', action.payload)
            state.darkMode = action.payload
        },
        removeData(state) {
            state.noFetch = true
            state.pageData = []
            state.journalsList = []
            state.query = null
        }

    },
    extraReducers: (builder) => {
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
                state.error = action.payload.error.message
                state.modal = {
                    view: true,
                    message: 'Encountered Error, Try Again',
                }
            })
    }
})

export const {
    setNoFetch,
    setLoading,
    setModal,
    setQuery,
    setDarkMode,
    removeData
} = applicationSlice.actions

export default applicationSlice.reducer
