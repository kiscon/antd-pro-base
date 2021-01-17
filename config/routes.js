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
              // 
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
