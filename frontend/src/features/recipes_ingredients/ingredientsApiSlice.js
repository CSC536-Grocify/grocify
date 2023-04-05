import { apiSlice } from "../../app/api/apiSlice";

export const ingredientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createIngredient: builder.mutation({
            query: (ingredientInfo) => ({
                url: "/ingredients/create/",
                method: "POST",
                body: { ...ingredientInfo }
            })
        }),
        getIngredients: builder.query({
            query: () => "/ingredients/",
        }),
        deleteIngredient: builder.mutation({
            query: (ingredientInfo) => ({
                url: "/ingredients/delete/",
                method: "DELETE",
                body: { ...ingredientInfo }
            })
        }),
        updateIngredient: builder.mutation({
            query: (ingredientInfo) => ({
                url: "/ingredients/update/",
                method: "PUT",
                body: { ...ingredientInfo }
            })
        }),
    })
});

export const {
    useCreateIngredientMutation,
    useGetIngredientsQuery,
    useDeleteIngredientMutation,
    useUpdateIngredientMutation,
} = ingredientsApiSlice;
