const bookingsCollection = require("../models/booking.model");
const usersCollection = require("../models/user.model");

// Get user role
exports.getUserRole = async (req, res) => {
    const { email } = req.params;
    
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {
        const user = await usersCollection.findOne({ email: email });
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.send({ role: user.role || "user" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get user dashboard overview
exports.getUserOverview = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {
        const user = await usersCollection.findOne({ email: email });
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Get user's bookings
        const totalBookings = await bookingsCollection.countDocuments({ email: email });
        
        const pendingBookings = await bookingsCollection.countDocuments({ 
            email: email, 
            status: "Pending" 
        });
        
        const acceptedBookings = await bookingsCollection.countDocuments({ 
            email: email, 
            status: "Accepted" 
        });
        
        const rejectedBookings = await bookingsCollection.countDocuments({ 
            email: email, 
            status: "Rejected" 
        });

        // Calculate total spent (only accepted bookings)
        const totalSpentAgg = await bookingsCollection.aggregate([
            { 
                $match: { 
                    email: email, 
                    status: "Accepted" 
                } 
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $toDouble: "$servicePrice" } }
                }
            }
        ]).toArray();

        const totalSpent = totalSpentAgg[0]?.total || 0;

        // Get recent bookings (last 5)
        const recentBookings = await bookingsCollection
            .find({ email: email })
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        // Get booking trend for last 7 days
        const last7Days = await bookingsCollection.aggregate([
            { $match: { email: email } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    total: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } },
            { $limit: 7 },
            { $sort: { _id: 1 } }
        ]).toArray();

        return res.send({
            userName: user.name,
            userEmail: user.email,
            totalBookings,
            pendingBookings,
            acceptedBookings,
            rejectedBookings,
            totalSpent,
            recentBookings,
            last7Days
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Server Error",
            error: error.message
        });
    }
};