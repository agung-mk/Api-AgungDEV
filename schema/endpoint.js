const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const theme = new SwaggerTheme();
const inUrl = "Please input URL!";
const inQuery = "Please input Query!";

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
  customCss: `
    ${theme.getBuffer(SwaggerThemeNameEnum.DARK)}
    .topbar { display: none; }
    .swagger-ui .info { font-size: 0.8rem; } /* Mengubah ukuran teks info */
    .swagger-ui .opblock-summary-description { font-size: 0.75rem; } /* Mengubah ukuran deskripsi endpoint */
    .swagger-ui .opblock-summary-path { font-size: 0.75rem; } /* Mengubah ukuran path endpoint */
    .swagger-ui .opblock-summary-method { font-size: 0.75rem; } /* Mengubah ukuran button method */
  `,
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
      description: "",
    },
  ],
  paths: {
    "/api/ai/gpt": {
      get: {
        tags: ["AI"],
        summary: "Chat with GPT-4 AI using Itzpire",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: "Please input your query",
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
        },
      },
    },
  },
  "x-request-time": new Date().toISOString(),
};

module.exports = { swaggerDocument, options };