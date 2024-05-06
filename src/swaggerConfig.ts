import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Restaurant Management API",
    version: "1.0.0",
    description: "This API manages chefs, dishes, and restaurants.",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Chef: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the chef",
            required: true,
            unique: true,
            trim: true,
            example: "John Doe",
          },
          image: {
            type: "string",
            description: "URL of the image of the chef",
            example: "http://example.com/chef.jpg",
          },
          description: {
            type: "string",
            description: "A brief description of the chef",
            example: "Expert in Italian cuisine",
          },
          status: {
            type: "string",
            description: "Current status of the chef",
            enum: ["active", "deprecated"],
            default: "active",
            example: "active",
          },
          restaurants: {
            type: "array",
            description: "List of restaurant IDs associated with the chef",
            items: {
              type: "string",
              format: "uuid",
            },
          },
        },
      },
      Dish: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the dish",
            required: true,
            unique: true,
            trim: true,
            example: "Spaghetti Carbonara",
          },
          ingredients: {
            type: "string",
            description: "List of ingredients for the dish",
            example: "Pasta, eggs, cheese, bacon",
          },
          price: {
            type: "number",
            format: "float",
            description: "Price of the dish",
            example: 15.0,
          },
          chef: {
            type: "object",
            format: "uuid",
            description: "ID of the chef who created the dish",
          },
        },
      },
      Restaurant: {
        type: "object",
        required: ["name", "chef"],
        properties: {
          name: {
            type: "string",
            description: "Name of the restaurant",
            trim: true,
            example: "The Gourmet Kitchen",
          },
          image: {
            type: "string",
            description: "URL of the image of the restaurant",
            example: "http://example.com/restaurant.jpg",
          },
          chef: {
            type: "string",
            description: "ID of the chef who manages the restaurant",
            format: "uuid",
            required: true,
          },
          status: {
            type: "string",
            description: "Operational status of the restaurant",
            enum: ["active", "deprecated"],
            default: "active",
            example: "active",
          },
          dishes: {
            type: "array",
            description: "List of dish IDs served at the restaurant",
            items: {
              type: "string",
              format: "uuid",
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/v1/routes/*.ts", "./models/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
