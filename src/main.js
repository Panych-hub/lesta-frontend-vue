import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSortUp, faSortDown, faSort)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
