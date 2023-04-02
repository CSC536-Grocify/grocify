import { apiSlice } from "../../app/api/apiSlice";

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation({
            query: (recipeInfo) => ({
                url: "/recipes/create",
                method: "POST",
                body: { ...recipeInfo }
            })
        }),
    })
});

export const {
    useCreateRecipeMutation
} = recipesApiSlice;
