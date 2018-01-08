import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register'
import Items from '../components/Items'
import Edit from '../components/Edit'
import ChangeAvatar from '../components/ChangeAvatar'
import ChangePassword from '../components/ChangePassword'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Items
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true }
    },
    {
      path: '/my-tasks',
      name: 'items',
      component: Items
    },
    {
      path: '/edit-profile',
      name: 'edit',
      component: Edit
    },
    {
      path: '/change-avatar',
      name: 'changeAvatar',
      component: ChangeAvatar
    },
    {
      path: '/change-password',
      name: 'changePassword',
      component: ChangePassword
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (!to.meta.guest) {

    const userToken = localStorage.getItem('token');

    return userToken ? next() : next({ path: '/login' });
  } else {

    const userToken = localStorage.getItem('token');

    return userToken ? next({ path: '/my-tasks'}) : next();
  }

  return next();  

})

export default router