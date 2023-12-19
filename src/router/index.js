import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import erro500 from '../views/errors/erro500.vue'
import erroToken from '../views/errors/erroToken.vue'
// import Reset from '../views/Reset.vue'
import Login from '../views/Login.vue'
import store from '@/store'
import Historico from '../views/Historico'
Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      logado: true
    }
  },
  {
    path: '/historico',
    name: 'historico',
    component: Historico,
    meta: {
      logado: true
    }
  },
  {
    path: '',
    name: 'index',
    component: Index,
    meta: {
      publica: true
    }
  },
  {
    path: '/erro500',
    name: 'erro500',
    component: erro500,
    meta: {
      logado: true
    }
  },
  {
    path: '/erroToken',
    name: 'erroToken',
    component: erroToken,
    meta: {
      logado: true
    }
  },
  {
    path: '*',
    component: Index
  },
  {
    path: '/reset',
    name: 'reset',
    meta: {
      logado: true
    },
    // component: Reset
    component: () => import(/* webpackChunkName: "Reset" */ '../views/Reset.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      publica: true
    }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !store.state.token) {
    return next({path: '/'})
  }

  if (routeTo.meta.logado && Object.values(store.state.usuarioLogado).length === 0) {
    return next({path: '/'})
  }

  next()
})
export default router
