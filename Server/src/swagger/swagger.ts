import {Express} from 'express';
import path from 'path';


export const addSwagger = (app: Express) => {
  const expressSwagger = require('express-swagger-generator')(app);
  let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:5000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['../endpoints/**/*.ts'] //Path to the API handle folder
  };
  console.log(path.resolve(__dirname, '../endpoints'))
  expressSwagger(options);
}