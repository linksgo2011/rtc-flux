import Vue from 'vue'
import Vuex from 'vuex'
import RTSFlux from '../lib/index.js'

Vue.use(Vuex)
const rTSFluxInstant = new RTSFlux();


export default new Vuex.Store({
    state: {
        text: "Hello Vue!"
    },
    mutations: {
        updateText(state, payload) {
            this.state.text = payload.text;
        }
    },
    actions: {},
    modules: {},
    plugins: [rTSFluxInstant.createVuexPlugin({})]
})
