# Sequelize TypeScript Project

This project is a TypeScript-based application using Sequelize as an ORM for managing database interactions. It follows a structured approach with models, controllers, and routes to facilitate CRUD operations on various entities.

## Project Structure

```
sequelize-ts-project
├── src
│   ├── controllers          # Contains controller files for handling business logic
│   ├── models               # Contains model files defining the database structure
│   ├── routes               # Contains route files for API endpoints
│   ├── app.ts               # Entry point of the application
│   └── types                # Contains TypeScript types and interfaces
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sequelize-ts-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your database configuration in the appropriate model files.

## Running the Application

To start the application, run:
```
npm start
```

## API Endpoints

The application exposes various API endpoints for managing the following entities:

- Carga
- Caminhoneiro
- Empresa
- Frete
- Imagem Carga
- Imagem Empresa
- Imagem Usuario
- Status
- Usuario
- Veiculo

Refer to the individual route files for specific endpoint details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.