# Urbantide Technical Test - CSV to SQL API with Outlier Detection

This project provides a web API to upload a CSV file, perform outlier detection using Z-score analysis, and insert the data into a PostgreSQL database.

## Features  

-  **Outlier Detection**: Uses Z-score to identify outliers in numerical data.

## Requirements

- Docker
- Docker Compose

## Setup

### 1. Clone the repository

```bash
git clone <repository_url>

cd urbantide-technical-test
  ```

### 2. Build and run the Docker containers:

```bash
docker-compose up --build
```
## Usage

### Uploading a CSV File

-   **Endpoint**: POST `/upload`
-   **Request**: Upload a CSV file containing timestamp, value, and category columns.
-   **Response**:
    -   If outliers are detected, returns a JSON object with outlier indices and values.
    -   If no outliers are detected, stores the data in the PostgreSQL database.

### Fetch All Data from the Table

-   **Endpoint**: GET `/data`
-   **Response**:
    -   Returns a JSON object with array of object data of test_table.

### Adjusting the Threshold

-   Edit the `.env` file to modify the `threshold` parameter in the `detectOutliers` function for different sensitivity levels.

## Example

- Live Demo
```bash
curl -X POST -F "file=@data.csv" http://DEMO_URL/upload
```
- Local access (using Docker Compose)
```bash
curl -X POST -F "file=@data.csv" http://localhost:3000/upload
```
