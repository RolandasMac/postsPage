import { create } from 'zustand'

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
    pages:[],
    setPages:(data) => set((state) => ({ pages: data})),
    favorites:localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):[],
    setFavorites:(data) => set((state) => ({ favorites: data})),
    localPosts:[],
    setLocalPosts:(data) => set((state) => ({ localPosts: data})),
    filteredPostsCount:0,
    setFilteredPostsCount:(data) => set((state) => ({ filteredPostsCount: data})),
}))

export default useStore;