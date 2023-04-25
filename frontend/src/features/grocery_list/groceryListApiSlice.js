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
        addGroceryItem: builder.mutation({
            query: (itemInfo) => ({
                url: "/grocery-lists/add/",
                method: "POST",
                body: { ...itemInfo }
            })
        }),
        updateGroceryItem: builder.mutation({
            query: (itemInfo) => ({
                url: "/grocery-lists/update/",
                method: "PUT",
                body: { ...itemInfo }
            })
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
    useAddGroceryItemMutation,
    useDeleteGroceryItemMutation,
    useUpdateGroceryItemMutation,
} = groceryListApiSlice;
