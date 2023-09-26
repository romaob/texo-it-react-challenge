//Route type
export type Route = {
  path: string;
  name: string;
};

//Routes values definition
export const ROUTES: { [key: string]: Route } = {
  DASHBOARD: {
    path: '/',
    name: 'Dashboard',
  },
  LIST: {
    path: '/list',
    name: 'List',
  },
};
