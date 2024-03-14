import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState: UserState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Logout user
export const logout = createAsyncThunk(
	"auth/logout",
	async (user, thunkAPI) => {
		await authService.logout();
	}
);

// Send email
export const sendEmail = createAsyncThunk(
	"auth/sendEmail",
	async (user, thunkAPI) => {
		try {
			return await authService.sendEmail(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Verify email
export const verifyEmail = createAsyncThunk(
	"auth/verifyEmail",
	async (user, thunkAPI) => {
		try {
			return await authService.verifyEmail(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder // REGISTER
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			}) // LOGIN
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			}) // LOGOUT
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			}) // SEND EMAIL (VERIFICATION)
			.addCase(sendEmail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(sendEmail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(sendEmail.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// VERIFY EMAIL
			.addCase(verifyEmail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(verifyEmail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
