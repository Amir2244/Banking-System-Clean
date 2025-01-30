# Banking System

A modern banking system built with .NET 9.0 following clean architecture principles.

## Project Structure

### BankingSystem.Domain
Core business logic and domain entities, containing:
- Business rules
- Domain models

### BankingSystem.Application
Application services and business logic implementation:
- CQRS with MediatR
- DTOs and mappings
- Validation rules
- Business operations

### BankingSystem.Infrastructure
Data persistence and external services:
- Entity Framework Core
- SQL Server integration
- Identity management
- External service implementations

### BankingSystemWeb
Web API presentation layer:
- REST API endpoints
- JWT authentication
- Swagger documentation
- Docker containerization

## Technology Stack
- .NET 9.0
- Entity Framework Core
- SQL Server
- MediatR
- AutoMapper
- FluentValidation
- JWT Authentication
- Swagger/OpenAPI


## Features
- Clean Architecture
- CQRS Pattern
- Secure Authentication
- API Documentation
- Dependency Injection
- Docker Support

## Getting Started
1. Clone the repository
2. Ensure .NET 9.0 SDK is installed
3. Update database connection strings
4. Run database migrations
5. Launch the application

API documentation available at `/swagger` endpoint.

## License
MIT
