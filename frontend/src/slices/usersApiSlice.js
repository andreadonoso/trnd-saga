import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/register`,
				method: "POST",
				body: data,
			}),
		}),
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
			}),
		}),
		sendEmail: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/sendEmail`,
				method: "POST",
				body: data,
			}),
		}),
		verifyEmail: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/verifyEmail`,
				method: "POST",
				body: data,
			}),
		}),
		resetPassword: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/reset`,
				method: "PATCH",
				body: data,
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useSendEmailMutation,
	useVerifyEmailMutation,
	useResetPasswordMutation,
} = usersApiSlice;
