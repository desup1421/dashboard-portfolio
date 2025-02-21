import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEducation: builder.query({
      query: () => "/education",
      providesTags : ["Educations"]
    }),
    addEducation: builder.mutation({
      query: (newEducation) => ({
        url: "/education",
        method: "POST",
        body: newEducation,
        headers : { "Content-Type" : "application/json" }
      } ),
      invalidatesTags : ["Educations"]
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/education/${id}`,
        method: "PUT",
        body: updateData,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEducationQuery,
  useAddEducationMutation,
  useDeleteEducationMutation,
  useUpdateEducationMutation,
} = educationApi;
