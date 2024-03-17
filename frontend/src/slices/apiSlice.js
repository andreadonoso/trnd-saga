import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseURL: "" });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User"], // add products or blogs as tag types
	endpoints: (builder) => ({}),
});
