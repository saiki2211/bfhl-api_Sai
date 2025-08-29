# BFHL REST API

A REST API that processes input arrays and returns categorized data including numbers, alphabets, special characters, and computed values.

## Features

- **POST /bfhl**: Main endpoint that processes array data
- **GET /bfhl**: Returns operation code
- **GET /**: Health check endpoint

## API Specification

### POST /bfhl

**Request Body:**
```json
{
  "data": ["M", "1", "334", "4", "B", "Z", "a", "@", "#"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com", 
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["M", "B", "Z", "A"],
  "special_characters": ["@", "#"],
  "sum": "339",
  "concat_string": "AzBm"
}
```

### Response Fields

1. **is_success**: Boolean indicating operation status
2. **user_id**: Format `{full_name_ddmmyyyy}` in lowercase
3. **email**: User's email address
4. **roll_number**: College roll number
5. **even_numbers**: Array of even numbers from input
6. **odd_numbers**: Array of odd numbers from input
7. **alphabets**: Array of alphabetic characters (uppercase)
8. **special_characters**: Array of special characters
9. **sum**: Sum of all numbers in the input
10. **concat_string**: Concatenated alphabets in reverse order with alternating caps

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update user information:**
   Edit the `USER_INFO` object in `index.js` with your details:
   ```javascript
   const USER_INFO = {
       full_name: "your_name", // lowercase
       birth_date: "ddmmyyyy",
       email: "your@email.com",
       roll_number: "YOUR123"
   };
   ```

3. **Run locally:**
   ```bash
   npm start
   ```
   API will be available at `http://localhost:3000`

## Testing

### Local Testing
Use curl or Postman to test locally:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["M","1","334","4","B","Z","a","@","#"]}'
```

### Vercel Testing
For Vercel deployment, the endpoint will be:

```bash
curl -X POST https://your-vercel-url/api/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["M","1","334","4","B","Z","a","@","#"]}'
```

## Deployment

This API can be deployed to:
- Vercel
- Railway
- Render
- Heroku
- Any Node.js hosting platform

Make sure to set the PORT environment variable if required by your hosting platform.

## Error Handling

The API includes comprehensive error handling:
- Invalid input validation
- Graceful exception handling
- Proper HTTP status codes
- Descriptive error messages
