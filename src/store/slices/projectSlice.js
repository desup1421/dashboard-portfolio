import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ limit, page }) => `project?limit=${limit}&page=${page}`,
      providesTags: ["Projects"],
      keepUnusedDataFor: 300,
    }),
    getProjectDetail: builder.query({
      query: (id) => `project/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `project/${data.get("_id")}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, data) => [
        "Projects",
        { type: "Project", id: data.get("_id") },
      ],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    publishProject: builder.mutation({
      query: (id) => ({
        url: `project/publish/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectDetailQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  usePublishProjectMutation,
} = projectApi;
