const bookingsCollection = require("../models/booking.model");
const usersCollection = require("../models/user.model");
const serviceCollection = require("../models/service.model");

exports.getAdminOverview = async (req, res) => {
    const { email } = req.params;
    const query = { email: email };
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    const existUser = await usersCollection.findOne(query);
    if (!existUser || existUser.role !== "admin") {
        return res.status(403).send({ message: "Forbidden Access" });
    }

    try {
        const totalUsers = await usersCollection.countDocuments();


        const totalBookings = await bookingsCollection.countDocuments();

        const totalServices = await serviceCollection.countDocuments();


        const cashflowAgg = await bookingsCollection.aggregate([
            { $match: { status: "Accepted" } },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $toDouble: "$servicePrice" } }
                }
            }
        ]).toArray();

        const totalCashflow = cashflowAgg[0]?.total || 0;


        const pending = await bookingsCollection.countDocuments({ status: "Pending" });
        const accepted = await bookingsCollection.countDocuments({ status: "Accepted" });
        const rejected = await bookingsCollection.countDocuments({ status: "Rejected" });


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaysBookings = await bookingsCollection.countDocuments({
            createdAt: { $gte: today }
        });


        const last7Days = await bookingsCollection.aggregate([
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
            totalUsers,
            totalBookings,
            totalCashflow,
            pending,
            accepted,
            rejected,
            todaysBookings,
            last7Days,
            totalServices
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Server Error",
            error: error.message
        });
    }
};
