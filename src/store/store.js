import { create } from 'zustand'
import {useState} from "react";

const useStore = create((set) => ({


    logged:null,
    setLogged: (user) => set((state) => ({ logged: user })),
    posts: [],
    setPosts: (data) => set((state) => ({ posts: data })),
    querryParams: {
        currentpage: "1",
        limit: "10",
        skip: "0",
        username: "",
        timestampfrom: "",
        timestampto: "",
        titlestring: ""
    },
    setQuerryParams:(data) => set((state) => ({ querryParams: data})),

    skip:0,
    setSkip:(data) => set((state) => ({ skip: data})),
    limit:10,
    setLimit:(data) => set((state) => ({ limit: data})),
    currentPage:1,
    setCurrentPage:(data) => set((state) => ({ currentPage: data})),
    pages:[],
    setPages:(data) => set((state) => ({ pages: data})),
    favorites:localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):[],
    setFavorites:(data) => set((state) => ({ favorites: data})),

}))

export default useStore;