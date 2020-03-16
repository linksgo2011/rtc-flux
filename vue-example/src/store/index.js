import Vue from 'vue'
import Vuex from 'vuex'
import RTSFlux from '../../../lib/src/index.js'
import {v4 as uuidv4} from 'uuid';

Vue.use(Vuex)
const rTSFluxInstant = new RTSFlux();

export default new Vuex.Store({
    state: {
        cards: []
    },
    mutations: {
        createCard(state, payload) {
            this.state.cards.push({
                content: payload.content,
                id: uuidv4()
            })
        }
    },
    actions: {},
    modules: {},
    plugins: [rTSFluxInstant.createVuexPlugin({})]
})
