const Users=require('../models/expense')


exports.postDetails = (req, res, next) => {
    let data = req.body;
    console.log("Received data:", data); // Log received data for debugging


    Users.create({
        name: data.name,
        email: data.email,
        password: data.password
    })
    .then(result => {
        console.log("users added:", result); // Log created expense for confirmation
        res.status(201).json(result);
    })
    .catch(err => {
        console.error("Error adding user", err); // Log detailed error for troubleshooting
        res.status(500).json({ error: 'Internal error' });
    });
};

