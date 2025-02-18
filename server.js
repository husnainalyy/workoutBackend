const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API documentation at http://localhost:${PORT}/api-docs`);
});