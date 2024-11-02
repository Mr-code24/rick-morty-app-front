const environments = {
    development: {
        apiUrl: 'http://localhost:5000/api',
    },
    production: {
       
    }
};

const environment = process.env.NODE_ENV || 'development';

export const config = environments[environment];
