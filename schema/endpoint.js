const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const theme = new SwaggerTheme();

const options = {
  customSiteTitle: config.options.webName,
  customfavIcon: config.options.favicon,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
  ],
  customCssUrl: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
  ],
  customCss: `${theme.getBuffer(SwaggerThemeNameEnum.DARK)}.topbar { display: none; }`,
  swaggerOptions: {
    displayRequestDuration: true,
  },
};

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: config.options.name,
    description: config.options.description,
    version: "1.0.0",
    "x-logo": {
      url: config.options.favicon,
      altText: config.options.name,
    },
  },
  servers: [
    {
      url: config.host.BASE_URL,
      description: "AgungDEV server",
    },
  ],
  tags: [
    {
      name: "AI",
      description: "Endpoints related to AI models",
    },
  ],
  paths: {
    "/api/ai/gpt": {
      get: {
        tags: ["AI"],
        summary: "Chat with GPT AI (choose GPT model)",
        parameters: [
          {
            in: "query",
            name: "model",
            description: "Select GPT model (gpt-3 or gpt-4)", // Deskripsi untuk parameter model
            required: true,
            schema: {
              type: "string",
              enum: ["gpt-4", "gpt-3"],  // Pilihan model GPT
            },
          },
          {
            in: "query",
            name: "query",
            description: "Please input your query or question", // Deskripsi untuk parameter query
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Result successfully returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Hello! How can I assist you today?",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Model not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Model not found. Please select 'gpt-3' or 'gpt-4'.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    // Tambahkan endpoint lain jika ada
  },
  "x-request-time": new Date().toISOString(),
};

module.exports = { swaggerDocument, options };