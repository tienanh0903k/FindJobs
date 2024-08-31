import authApi from '@/api/auth';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';


interface CustomResponse extends Response {
    access_token: string
}


interface AuthState {
	user: UserType | null;
	isLoggedIn: boolean;
}

interface UserType {
	id: string;
	role: string;
	email: string;
	access_token?: string;
}
  
  const initialState: AuthState = {
    // user: JSON.parse(localStorage.getItem('user') || 'null'),
    user: null,
    isLoggedIn: false,
  };
  


//Thunk Login
// createAsyncThunk<kieu ket qua tra ve, kieu truyèn vào>
export const fetchLogin = createAsyncThunk<UserType, any>('auth/login', async (data, { rejectWithValue }) => {
	try {
		const response = await authApi.login(data);
        const result = await response.json(); 

        console.log('Access Token:', result);  
        localStorage.setItem('user', JSON.stringify(result))
      

		return result;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});



const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLogin.fulfilled, (state, action) => {
			state.user = action.payload;
            state.isLoggedIn = true;
            // console.log("Result", action.payload);

		});
	},
});


export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
