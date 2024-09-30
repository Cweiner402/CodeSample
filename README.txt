
# Project Title test

## Introduction
This app is for a coding CHALLENGE!! the technical pieces aside below this can be run via the docker yml file

Please update the connection string within that file and the password to insure it connects as expected. 

Also if you prefer below gives the stand alone instructions to run both the front end and the back end at the same time insure the ports are correct as listed. Update the appsetting file to your db via appsettings in the .net api and off you go!!!!

## Prerequisites
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An IDE or code editor of your choice (e.g., [Visual Studio](https://visualstudio.microsoft.com/), [VS Code](https://code.visualstudio.com/))

## Setting Up the Development Environment
1. **Clone the repository:** 
   ```
   git clone [repository URL]
   ```
2. **Navigate to the project directory:**
   ```
   cd [project directory]
   ```

## Backend (.NET 6 Minimal API) Setup
1. **Navigate to the .NET project directory:**
   ```
   cd [path to .NET project]
   ```
2. **Restore dependencies:**
   ```
   dotnet restore
   ```
3. **Build the project:**
   ```
   dotnet build
   ```
4. **Run the project:**
   ```
   dotnet run
   ```
   Ensure the API is running on `http://localhost:5055/`.

## Frontend (Vite React App) Setup
1. **Navigate to the React project directory:**
   ```
   cd [path to React project]
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Run the development server:**
   ```
   npm run dev
   ```
   Make sure that the React client is accessible on `http://localhost:5173`.

## CORS Configuration
Ensure that the .NET API is configured to allow the React client:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173"));
});
```

## Building and Deploying
### Backend
1. **Build for production:**
   ```
   dotnet publish -c Release
   ```
2. **Deploy as per your hosting environment guidelines.**

### Frontend
1. **Build for production:**
   ```
   npm run build
   ```
2. **Deploy the `dist` folder contents to your hosting service.**



## Contact Information
- **Name:** Chris Weiner
- **Email:** Cweiner402@gmail.com
- **Phone:** 402-432-2923

## License
under main folder
Apache 2.0
