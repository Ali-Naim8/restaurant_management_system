const express = require("express");
const router = express.Router();

// import modal
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments');

// middleware
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin');

// get all order stats
router.get('/', async(req, res) => {
    try {
        const result = await Payment.aggregate([
            {
                $unwind: '$menuItems'
                // unwind operator to deconstruct the menuItems array.
            },
            {
                $lookup: {
                    from:'menus',
                    localField: 'menuItems',
                    foreignField: "_id",
                    as: 'menuItemDetails',
                },
                // lookup operator to perform a left outer join with the menus collection to get details of menu items.
            },
                {
                    $unwind: '$menuItemDetails'
                },
                {
                    $group: {
                        _id: '$menuItemDetails.category',
                        quantity: {$sum: '$quantity'},
                        revenue: {$sum: '$price'}
                    }
                    // group operator to group the data by category and calculate the total quantity and revenue for each category.
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        quantity: '$quantity',
                        revenue: '$revenue'
                    }
                    // project operator to reshape the output by excluding the _id field and renaming fields for clarity.
                }
        ]);
        res.json(result);
        
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error.message)
    }
})

module.exports = router;
