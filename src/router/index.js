import Vue from 'vue'
import Router from 'vue-router'
import LayoutPageDashboard from '@/components/layouts/LayoutPageDashboard'
import PageProject from '@/components/pages/PageProject'
import PageProjectList from '@/components/pages/PageProjectList'
import PageCloudList from '@/components/pages/PageCloudList'
import PageComponents from '@/components/pages/PageComponents'
import PageViewer from '@/components/pages/PageViewer'
import OidcCallback from '@/components/pages/PageOIDCCallback'
import store from '@/store'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: LayoutPageDashboard,
      meta: {
        isPublic: false
      },
      children: [
        {
          path: '',
          name: 'home',
          component: PageCloudList,
          meta: {
            isPublic: false,
            container: 'container p-0'
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)',
          name: 'project-list',
          component: PageProjectList,
          meta: {
            isPublic: false,
            container: 'container p-0'
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)/project/:projectId(\\d+)',
          name: 'project',
          component: PageProject,
          meta: {
            isPublic: false
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)/project/:projectId(\\d+)/viewer/:ifcId(\\d+)',
          name: 'viewer',
          component: PageViewer,
          meta: {
            isPublic: false
          }
        }
      ]
    },
    {
      path: '/components',
      name: 'components',
      component: PageComponents,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/oidc-callback', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback,
      meta: {
        isOidcCallback: true,
        isPublic: true
      }
    }
  ]
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store))

export default router
