import { apiSlice } from "../../app/api/apiSlice";

export const tagsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTag: builder.mutation({
            query: (tagInfo) => ({
                url: "/tags/create/",
                method: "POST",
                body: { ...tagInfo }
            })
        }),
        getTags: builder.query({
            query: () => "/tags/",
        }),
        deleteTag: builder.mutation({
            query: (tagInfo) => ({
                url: "/tags/delete/",
                method: "DELETE",
                body: { ...tagInfo }
            })
        }),
        updateTag: builder.mutation({
            query: (tagInfo) => ({
                url: "/tags/update/",
                method: "PUT",
                body: { ...tagInfo }
            })
        }),
    })
});

export const {
    useCreateTagMutation,
    useGetTagsQuery,
    useDeleteTagMutation,
    useUpdateTagMutation,
} = tagsApiSlice;
