import swaggerAutogen from "swagger-autogen";

const config = {
    info: {
        version: "1.0.0",
        title: "Task Management APIs",
        description: "API for Task Management",
        contact: {
            name: "API Support",
            email: "sthasuyash11@gmail.com",
        },
    },
    host: "localhost:3000", // TODO: Change this to 'taskmanagement.com.np' in production
    // basePath: "/api/v1",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "Task Management CRUD",
            description: "Task Management related APIs",
        },
        {
            name: "Health",
            description: "Health Check",
        },
    ],
    securityDefinitions: {
        apiKey: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./src/index.js", "./src/routes/*.js", "./src/controllers/*.js"];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, config);
