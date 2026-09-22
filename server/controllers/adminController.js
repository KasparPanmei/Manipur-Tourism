import EILPBooking from "../models/EILPBooking.js";

const EMPTY_COUNTS = {
    eilp: 0,
    product: 0,
    guide: 0,
    transportation: 0,
    homestay: 0,
    rental: 0,
};


const sanitizeEILPBooking = (booking) => ({
    _id: booking._id,

    fullName: booking.applicant?.fullName || "",
    idNumber: booking.applicant?.idNumber || "",
    mobileNo: booking.applicant?.mobileNo || "",
    homeState: booking.applicant?.homeState || "",

    reference: booking.reference || "",
    category: booking.category || "",
    permitFee: booking.permitFee || 0,

    entryPoint: booking.travel?.entryPoint || "",
    arrivalDate: booking.travel?.arrivalDate || "",
    travelPurpose: booking.travel?.travelPurpose || "",
    stayLocation: booking.travel?.stayLocation || "",

    emergencyName: booking.emergency?.name || "",
    emergencyPhone: booking.emergency?.phone || "",

    paymentMethod: booking.paymentMethod || "",
    paymentStatus: booking.paymentStatus || "",
    status: booking.status || "",

    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
});

export const getAdminDashboard = async (req, res) => {
    try {

        const eilp =
            await EILPBooking.countDocuments();

        return res.json({
            counts: {
                ...EMPTY_COUNTS,
                eilp,
            },

            configuredCollections: [
                "eilp",
            ],

            pendingCollections: [
                "product",
                "guide",
                "transportation",
                "homestay",
                "rental",
            ],
        });

    } catch (error) {

        console.error(
            "Admin dashboard error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to load dashboard totals.",
        });
    }
};

export const getAdminEILPBookings = async (req, res) => {

    try {

        const requestedPage =
            Number.parseInt(
                req.query.page,
                10
            ) || 1;

        const requestedLimit =
            Number.parseInt(
                req.query.limit,
                10
            ) || 5;

        const page =
            Math.max(
                requestedPage,
                1
            );

        const limit =
            Math.min(
                Math.max(
                    requestedLimit,
                    1
                ),
                50
            );

        const search =
            String(
                req.query.search || ""
            ).trim();

        const filter = {};

        if (search) {

            filter.$or = [

                {
                    reference: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    "applicant.fullName": {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    "applicant.idNumber": {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    "applicant.mobileNo": {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    "applicant.homeState": {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    "travel.travelPurpose": {
                        $regex: search,
                        $options: "i",
                    },
                },

            ];
        }

        const [
            total,
            records,
        ] = await Promise.all([

            EILPBooking.countDocuments(
                filter
            ),

            EILPBooking.find(filter)

                .sort({
                    createdAt: -1,
                })

                .skip(
                    (page - 1) * limit
                )

                .limit(limit)

                .select([
                    "_id",

                    "reference",
                    "category",
                    "permitFee",

                    "paymentMethod",
                    "paymentStatus",
                    "status",

                    "applicant",

                    "travel",

                    "emergency",

                    "createdAt",
                    "updatedAt",

                ].join(" "))

                .lean(),
        ]);

        const sanitizedRecords =
            records.map(
                sanitizeEILPBooking
            );


        return res.json({

            records:
                sanitizedRecords,

            pagination: {

                page,

                limit,

                total,

                pages:
                    Math.ceil(
                        total / limit
                    ),

            },

        });

    } catch (error) {

        console.error(
            "Admin e-ILP booking fetch error:",
            error
        );

        return res.status(500).json({

            message:
                "Unable to load e-ILP booking records.",

        });
    }
};