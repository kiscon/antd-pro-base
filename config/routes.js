export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      // 登录
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      // app
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/dashboard/welcome',
              },
              // dashboard
              {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'home',
                routes: [
                  {
                    path: '/dashboard/welcome',
                    name: 'welcome',
                    icon: 'smile',
                    component: './Welcome',
                  },
                ]
              },
              // list
              {
                path: '/list',
                icon: 'table',
                name: 'list',
                routes: [
                  {
                    path: '/list/table-list',
                    name: 'searchtable',
                    component: './TableList',
                  }
                ],
              },
              // exception
              {
                name: 'exception',
                icon: 'warning',
                path: '/exception',
                routes: [
                  {
                    path: '/exception/403',
                    name: 'not-permission',
                    component: './Exception/403',
                  },
                  {
                    path: '/exception/404',
                    name: 'not-find',
                    component: './Exception/404',
                  },
                  {
                    path: '/exception/500',
                    name: 'server-error',
                    component: './Exception/500',
                  },
                  {
                    path: '/exception/trigger',
                    name: 'trigger',
                    hideInMenu: true,
                    component: './Exception/TriggerException',
                  },
                ],
              },
            ]
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
