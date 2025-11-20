const ENV = {
  dev: {
    apiUrl: 'http://192.168.0.37:8888',
    defaultWebApp: 'https://fastrack-portal.vercel.app/',
  },
  prod: {
    apiUrl: 'https://fast-track-api.up.railway.app',
    defaultWebApp: 'https://fastrack-portal.vercel.app/',
  },
};

const getEnvVars = () => {
  const environment = __DEV__ ? 'dev' : 'prod';
  return ENV[environment as keyof typeof ENV];
};

export default getEnvVars();

