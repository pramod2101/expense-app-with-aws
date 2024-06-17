const Users=require('../models/expense')


exports.postDetails = (req, res, next) => {
    let data = req.body;
    console.log("Received data:", data); // Log received data for debugging

    if (!data || !data.expenseAmount || !data.chooseDescreption || !data.chooseCategory) {
        console.error("Invalid data received:", data);
        return res.status(400).json({ error: 'Invalid data received' });
    }

    Users.create({
        expenseAmount: data.expenseAmount,
        chooseDescreption: data.chooseDescreption,
        chooseCategory: data.chooseCategory
    })
    .then(result => {
        console.log("Expense created:", result); // Log created expense for confirmation
        res.status(201).json(result);
    })
    .catch(err => {
        console.error("Error creating expense:", err); // Log detailed error for troubleshooting
        res.status(500).json({ error: 'Internal error' });
    });
};

