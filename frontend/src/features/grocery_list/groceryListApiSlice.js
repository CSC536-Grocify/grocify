import { apiSlice } from "../../app/api/apiSlice";

export const groceryListApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        makeGroceryList: builder.mutation({
            query: (tagsInfo) => ({
                url: "/grocery-lists/make/",
                method: "POST",
                body: { ...tagsInfo }
            })
        }),
        getGroceryList: builder.query({
            query: () => "/grocery-lists/",
        }),
        deleteGroceryItem: builder.mutation({
            query: (itemInfo) => ({
                url: "/grocery-lists/delete/",
                method: "DELETE",
                body: { ...itemInfo }
            })
        }),
    })
});

export const {
    useMakeGroceryListMutation,
    useGetGroceryListQuery,
    useDeleteGroceryItemMutation,
} = groceryListApiSlice;
