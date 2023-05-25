const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
  definition: { 
    openapi: '3.0.0',
    info: {
      title: 'Warmuptime API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Warmuptime project',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
      {
        url: 'http://10.46.221.77:8000',
        description: 'warmuptimer server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files with Swagger annotations
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  // Serve Swagger specification file
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
