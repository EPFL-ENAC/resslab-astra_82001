# Installation Guide

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Git](https://git-scm.com/) (optional, for cloning)

## Installation Steps

### 1. Clone the Repository (or download the source code)

```sh
git clone https://github.com/EPFL-ENAC/resslab-astra_82001.git
cd resslab-astra_82001
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Development Server

```sh
npm run dev
```

### 4. Build the Project

```sh
npm run build
```

### 5. Run Tests

```sh
npm run test
```

### 6. Lint and Format Code

```sh
npm run lint
npm run format
```

### 7. Docker Setup (Optional)

#### Build Docker Image

```sh
docker build -t nginx-vue-app .
```

#### Run Docker Container

```sh
docker run -p 8080:80 nginx-vue-app
```
