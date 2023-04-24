import { apiSlice } from "../../app/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (categoryInfo) => ({
                url: "/categories/create/",
                method: "POST",
                body: { ...categoryInfo }
            })
        }),
        getCategories: builder.query({
            query: () => "/categories/",
        }),
        deleteCategory: builder.mutation({
            query: (categoryInfo) => ({
                url: "/categories/delete/",
                method: "DELETE",
                body: { ...categoryInfo }
            })
        }),
        updateCategory: builder.mutation({
            query: (categoryInfo) => ({
                url: "/categories/update/",
                method: "PUT",
                body: { ...categoryInfo }
            })
        }),
    })
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesApiSlice;
