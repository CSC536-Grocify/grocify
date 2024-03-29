import { apiSlice } from "../../app/api/apiSlice";

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation({
            query: (recipeInfo) => ({
                url: "/recipes/create/",
                method: "POST",
                body: { ...recipeInfo }
            })
        }),
        getRecipes: builder.query({
            query: () => "/recipes/",
        }),
        deleteRecipe: builder.mutation({
            query: (recipeInfo) => ({
                url: "/recipes/delete/",
                method: "DELETE",
                body: { ...recipeInfo }
            })
        }),
        updateRecipe: builder.mutation({
            query: (recipeInfo) => ({
                url: "/recipes/update/",
                method: "PUT",
                body: { ...recipeInfo }
            })
        }),
    })
});

export const {
    useCreateRecipeMutation,
    useGetRecipesQuery,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation,
} = recipesApiSlice;
