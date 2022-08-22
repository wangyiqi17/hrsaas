import router, { constantRoutes,asyncRoutes } from "@/router"

export default {
    namespaced: true,
    state:{
        routes:[],
    },
    mutations: {
        setRoutes(state,routes) {
            state.routes = [...constantRoutes, ...routes]
        },
        setPoints(store,payload) {
            store.points = payload
        }
    },
    actions:{
        filterRoutes(context,roles) {
            const routes = asyncRoutes.filter((item) => {
            return roles.menus.includes(item.meta.id)
            })
            context.commit('setRoutes', routes)
            router.addRoutes([...routes,
            { path: '*', redirect: '/404', hidden: true }
            ])
        },
        setPointsAction(context,points) {
            context.commit('setPoints', points)
        }
    }
}