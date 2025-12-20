export default {
  routes: [
    {
      method: 'GET',
      path: '/about-us',
      handler: 'about-us.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/about-us',
      handler: 'about-us.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
