import { auth } from '@/config/firebase'

const state = {
    id: "kevin11",
    user: {
        "roles":{"isAdmin":true,"isTutor":true,"isStudent":true},
        "bio":{
            "bio":"I am a very dedicated student, ever eager to learn. I am an engineering student, trying to find the world's next best solution",
            "name":"Kevin Izuchukwu",
            "email":"kevinfizu@gmail.com"
        },
        "dates": {
            "registeredAt":{"seconds":1587769200,"nanoseconds":0}
        },
        "tutor":{
            "upgrade":{
                "1":{
                    "canRetakeAt":{"seconds":1590447600,"nanoseconds":0},
                    "passed":true
                }
            },
            "level":0,
            "qualification":"Diploma certificate",
            "ratings":[],
            "price":2500,
            "course":"Mathematics"
        },
        "account":{
            "premium":false
        },
        "status":{
            "lastSeen":{"seconds":1587769200,"nanoseconds":0},
            "online":true
        },
        "chattedWith":["frank","max"]
    }
}

const getters = {
    getUser: state => state.user,
    getId: state => state.id,
    isLoggedIn: state => state.user != null
}

const mutations = {
    setUser: (state, user) => state.user = user,
    makeTutor(state, tutor){
        state.user.bio.roles.isTutor = true
        state.user.tutor = tutor
    }
}

const actions = {
    setUser:({ commit }, user) => commit('setUser', user),
    makeTutor: ({ commit }, tutor) => commit('makeTutor', tutor),
    logout: async () => {
        await auth.signOut()
        let togglers = document.getElementsByClassName('navbar-toggler')
        let navbarOpen = document.getElementsByClassName('navbar-collapse collapse show')
        if(togglers.length > 0 && navbarOpen.length > 0){ togglers[0].click() }
    },
}

export default { state, getters, mutations, actions }
