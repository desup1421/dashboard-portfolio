import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getHero: builder.query({
      query: () => `hero`,
      providesTags: ["Hero"],
      keepUnusedDataFor: 300,
    }),
    createHero: builder.mutation({
      query: (data) => ({
        url: "hero",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
    updateHero: builder.mutation({
      query: (data) => ({
        url: `hero/${data.get("_id")}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `hero/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
});

export const {
  useGetHeroQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useUpdateHeroMutation,
} = heroApi;
