const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define valid usernames and passwords for gerobaks
const gerobaks = {
    gerobak1: { username: 'admin1', password: 'password1' },
    gerobak2: { username: 'admin2', password: 'password2' },
    gerobak3: { username: 'admin3', password: 'password3' }
};

// Login route
app.post('/login', (req, res) => {
    const { gerobak, username, password } = req.body;

    // Check if the gerobak exists in our predefined gerobaks
    if (!gerobaks.hasOwnProperty(gerobak)) {
        return res.status(401).send('Invalid gerobak');
    }

    // Check username and password against the specified gerobak
    if (username === gerobaks[gerobak].username && password === gerobaks[gerobak].password) {
        // Authentication successful, redirect or respond accordingly
        res.send(`Login successful for gerobak ${gerobak}!`);
    } else {
        // Authentication failed, redirect or respond with an error
        res.status(401).send('Invalid username or password');
    }
});

// Socket.io connection handling (example setup, adjust as needed)
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    socket.on('locationUpdate', (data) => {
        io.emit('locationUpdate', { id: socket.id, latlng: data.latlng });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    