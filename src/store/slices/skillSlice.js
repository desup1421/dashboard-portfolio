import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSkill: builder.query({
      query: () => "/skill",
      providesTags : ["Skills"]
    }),
    addSkill: builder.mutation({
      query: (formData) => ({
        url: "/skill",
        method: "POST",
        body: formData,
      } ),
      invalidatesTags : ["Skills"]
    }),
    updateSkill: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/skill/${id}`,
        method: "PUT",
        body: updateData,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSkillQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} = skillApi;
