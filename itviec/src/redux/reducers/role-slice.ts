import roleApi from "@/api/roleApi";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";


const initialState = {
    isFetching: true,
    results: [],
    currentRole: {
        _id: '',
        name: '',
        description: '',
        isActive: false,
        permissions: []
    },
}



//call api get 
export const fetchRoleId = createAsyncThunk(
	'roles/fetchRoleById',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await roleApi.getRoleById(id);
			return response.data;
		} catch (error) {
			return rejectWithValue('Failed to fetch role');
		}
	},
);



const roleSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRoleId.pending, (state, action) => {
            state.isFetching = true;
        })

        builder.addCase(fetchRoleId.fulfilled, (state, action) => {
            state.isFetching = false;
            console.log("ACTION:",action);
            state.currentRole = action.payload;
        })

        builder.addCase(fetchRoleId.rejected, (state, action) => {
            state.isFetching = false;
            console.error('Failed to fetch role:', action.payload);
        })
    }


})

export const {

} = roleSlice.actions;

export default roleSlice.reducer
