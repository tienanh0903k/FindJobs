import authApi from '@/api/authApi';
import { AuthState, UserType } from '@/app/types/interface';
import { decodeToken } from '@/lib/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';


// interface CustomResponse extends Response {
//     access_token: string
// }
  const initialState: AuthState = {
    // user: JSON.parse(localStorage.getItem('user') || 'null'),
    currentUser: null,
    isLoggedIn: false,
  };
  


//Thunk Login
// createAsyncThunk<kieu ket qua tra ve, kieu truyèn vào>
// export const fetchLogin = createAsyncThunk<UserType, any>('auth/login', async (data, { rejectWithValue }) => {
// 	try {
// 		const response = await authApi.login(data);
//         const result = await response.json(); 

//         //console.log('Access Token:', result); 
// 		await authApi.setCookie(result.access_token)
//         localStorage.setItem('user', JSON.stringify(result))
      

// 		return result;
// 	} catch (error: any) {
// 		return rejectWithValue(error.response.data);
// 	}
// });

export const fetchLogin = createAsyncThunk<UserType, { username: string; password: string }>(
	'auth/login',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<UserType> = await authApi.loginClient(username, password);
			const { data } = response;
			//console.log('data', data);
			//set localstorege
			const token = data.access_token || '';
			if (!token) {
				throw new Error('Token không hợp lệ hoặc không có thời gian hết hạn.');
			}
			const payload = await decodeToken(token);

			const expirationTime = payload?.exp ? payload.exp * 1000 : null;
			if (expirationTime) {
				localStorage.setItem('TokenExpiresAt', expirationTime.toString());
			} else {
				throw new Error('Token không hợp lệ hoặc không có thời gian hết hạn.');
			}
			localStorage.setItem('user', JSON.stringify(data));

			return data;
		} catch (error: any) {
			console.log('>>>>>error', error);
			// if (error.response) {
			// 	return rejectWithValue({
			// 		message: error.response.data?.message || 'Login failed',
			// 		status: error.response.status,
			// 	});
			// }
			// Lỗi khác
			return rejectWithValue({
				message: error.message || 'Login failed',
				status: 500,
			});
		}
	},
);


const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoggedIn = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLogin.fulfilled, (state, action) => {
			state.currentUser = action.payload;
            state.isLoggedIn = true;
            // console.log("Result", action.payload);

		});
	},
});


export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
