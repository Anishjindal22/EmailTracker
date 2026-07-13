const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const trackingRoutes = require('./routes/trackingRoutes');
const generateTrackingIdRoutes = require('./routes/generateTrackingId');
const authRoutes = require('./routes/authRoutes');
app.use(express.json()); 
const connectDb = require('./config/database');
try{
    connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}
catch (error) {
    console.error('Error starting the server:', error);
}
app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});
app.use( generateTrackingIdRoutes);
app.use(trackingRoutes);
app.use(authRoutes);
