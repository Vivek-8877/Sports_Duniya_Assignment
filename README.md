
# Vendor Management System

The Vendor Management System is a backend API built using Node.js, Express.js, and MongoDB. It manages vendor profiles, tracks purchase orders, and calculates key performance metrics for vendors, such as on-time delivery rates, quality rating averages, average response times, and fulfillment rates.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Development](#development)
- [License](#license)

## Features

- **Vendor Profile Management**: Create, read, update, and delete vendor profiles.
- **Purchase Order Tracking**: Create, read, update, and delete purchase orders linked to vendors.
- **Performance Metrics**: Automatically calculate and update vendor performance metrics.

## Requirements

- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)
- npm (v6.x or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/vendor-management-system.git
   cd vendor-management-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/vendorManagement
   PORT=5000
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

## Usage

The API can be accessed using tools like Postman, curl, or any other HTTP client.

## API Endpoints

### Vendor Management

- **Create a Vendor**
  - `POST /api/vendors`
  - Request Body:
    ```json
    {
      "name": "Vendor Name",
      "contactDetails": "vendor@example.com",
      "address": "123 Vendor Street",
      "vendorCode": "V001"
    }
    ```
  - Response: Vendor object

- **Get All Vendors**
  - `GET /api/vendors`
  - Response: Array of Vendor objects

- **Get a Vendor by ID**
  - `GET /api/vendors/:id`
  - Response: Vendor object

- **Update a Vendor**
  - `PUT /api/vendors/:id`
  - Request Body: Partial or complete Vendor object
  - Response: Updated Vendor object

- **Delete a Vendor**
  - `DELETE /api/vendors/:id`
  - Response: Status message

### Purchase Order Management

- **Create a Purchase Order**
  - `POST /api/purchase-orders`
  - Request Body:
    ```json
    {
      "poNumber": "PO123456",
      "vendor": "<vendor_id>",
      "orderDate": "2024-08-22",
      "deliveryDate": "2024-09-01",
      "items": [
        { "name": "Item 1", "quantity": 10 },
        { "name": "Item 2", "quantity": 20 }
      ],
      "quantity": 30,
      "status": "pending",
      "issueDate": "2024-08-22"
    }
    ```
  - Response: Purchase Order object

- **Get All Purchase Orders**
  - `GET /api/purchase-orders`
  - Response: Array of Purchase Order objects

- **Get a Purchase Order by ID**
  - `GET /api/purchase-orders/:id`
  - Response: Purchase Order object

- **Update a Purchase Order**
  - `PUT /api/purchase-orders/:id`
  - Request Body: Partial or complete Purchase Order object
  - Response: Updated Purchase Order object

- **Delete a Purchase Order**
  - `DELETE /api/purchase-orders/:id`
  - Response: Status message

## Testing

To test the API, you can use Postman or curl:

1. **Create a Vendor**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/vendors`
   - Body (JSON):
     ```json
     {
       "name": "Vendor Test",
       "contactDetails": "test@example.com",
       "address": "456 Test Street",
       "vendorCode": "V002"
     }
     ```

2. **Create a Purchase Order**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/purchase-orders`
   - Body (JSON):
     ```json
     {
       "poNumber": "PO654321",
       "vendor": "<vendor_id>",
       "orderDate": "2024-08-22",
       "deliveryDate": "2024-09-01",
       "items": [
         { "name": "Test Item 1", "quantity": 5 },
         { "name": "Test Item 2", "quantity": 15 }
       ],
       "quantity": 20,
       "status": "pending",
       "issueDate": "2024-08-22"
     }
     ```

3. **Acknowledge and Complete the Purchase Order**:
   - Method: `PUT`
   - URL: `http://localhost:5000/api/purchase-orders/<purchase_order_id>`
   - Body (JSON):
     ```json
     {
       "status": "completed",
       "qualityRating": 4,
       "acknowledgmentDate": "2024-08-23T00:00:00.000Z"
     }
     ```

4. **Check the Vendor's Metrics**:
   - Method: `GET`
   - URL: `http://localhost:5000/api/vendors/<vendor_id>`
   - Check the updated metrics: `onTimeDeliveryRate`, `qualityRatingAvg`, `averageResponseTime`, `fulfillmentRate`.

## Development

1. **Run the server in development mode**:

   ```bash
   npm run dev
   ```

2. **Lint the code**:

   ```bash
   npm run lint
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
