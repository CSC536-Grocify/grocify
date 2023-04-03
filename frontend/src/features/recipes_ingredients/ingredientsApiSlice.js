import { apiSlice } from "../../app/api/apiSlice";

export const ingredientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createIngredient: builder.mutation({
            query: (recipeInfo) => ({
                url: "/ingredients/create/",
                method: "POST",
                body: { ...recipeInfo }
            })
        }),
        getIngredients: builder.query({
            query: () => "/ingredients/",
        }),
    })
});

export const {
    useCreateIngredientMutation,
    useGetIngredientsQuery,
} = ingredientsApiSlice;
