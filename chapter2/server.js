//at this local host (every url is mapped to a IP address)
// URL:- http://localhost:3000
// IP:- 127.0.0.1:3000
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


console.log('Starting server...');
let data = [
    {
        name: 'John Doe',
        age: 30
    }
];

//middleware to parse incoming JSON requests
app.use(express.json());

//1)the method informs the natrure of the request and the type of response that is expected by the client
//and the route is a further subdirectory of the URL that is being requested by the client
// 2) "/" is the root route of the URL (endpoint) and the callback function is executed
//  when the request is made to the root route

//Type 1 website endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>HOMEPAGE</h1>
        <script>console.log('Homepage requested');</script>
        <p>${JSON.stringify(data)}</p>
        <a href="/about">About</a>

    `);
});

app.get('/about',(req, res) => {
    res.status(499).send(`
        <h1>ABOUT PAGE</h1>
        <p>This is the about page</p>
        <a href="/">Home</a>
    `);
});
//Type 2 api endpoint
app.get('/api/data',(req, res) => {
    console.log('API endpoint called');
    res.status(200).send(data);
});

//crud methods-> create-post, read-get, update-put, delete-delete
app.post('/api/data',(req, res) => {
    const newData = req.body;
    console.log(newData);
    data.push(newData);
    res.status(201).send(); // Created
});

app.delete('/api/data', (req, res) => {
    data.pop();
    console.log('Data deleted');
    res.sendStatus(203); // OK
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
