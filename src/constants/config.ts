const ENV = {
  dev: {
    apiUrl: 'http://192.168.0.38:8888',
    defaultWebApp: 'https://fastrack.com',
  },
  prod: {
    apiUrl: 'https://fast-track-api.up.railway.app',
    defaultWebApp: 'https://fastrack.com',
  },
};

const getEnvVars = () => {
  const environment = 'dev';
  return ENV[environment as keyof typeof ENV];
};

export default getEnvVars();

