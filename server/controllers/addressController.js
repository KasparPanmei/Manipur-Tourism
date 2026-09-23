import Address from "../models/Address.js";
import User from "../models/Users.js";

const normalizeAddress = (data = {}) => ({
    fullName: String(data.fullName || "").trim(),
    phone: String(data.phone || "").trim(),
    addressLine1: String(data.addressLine1 || "").trim(),
    addressLine2: String(data.addressLine2 || "").trim(),
    city: String(data.city || "").trim(),
    district: String(data.district || "").trim(),
    state: String(data.state || "").trim(),
    pincode: String(data.pincode || "").trim(),
    landmark: String(data.landmark || "").trim(),
});

const validateAddress = (address) => {
    const requiredFields = [
        "fullName",
        "phone",
        "addressLine1",
        "city",
        "district",
        "state",
        "pincode",
    ];

    for (const field of requiredFields) {
        if (!address[field]) {
            return `${field} is required.`;
        }
    }

    if (!/^\d{10}$/.test(address.phone)) {
        return "Phone number must contain exactly 10 digits.";
    }

    if (!/^\d{6}$/.test(address.pincode)) {
        return "Pincode must contain exactly 6 digits.";
    }

    return null;
};


export const getAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User account is not available.",
            });
        }

        const address = await Address.findOne({
            user: req.user.id,
        });

        return res.json({
            address: address || null,
        });

    } catch (error) {
        console.error("Get address error:", error);

        return res.status(500).json({
            message: "Unable to load address.",
        });
    }
};


export const saveAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User account is not available.",
            });
        }

        const addressData = normalizeAddress(req.body);

        const validationError = validateAddress(addressData);

        if (validationError) {
            return res.status(400).json({
                message: validationError,
            });
        }


        const address = await Address.findOneAndUpdate(
            {
                user: req.user.id,
            },
            {
                $set: addressData,
                $setOnInsert: {
                    user: req.user.id,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        return res.json({
            message: "Address saved successfully.",
            address,
        });

    } catch (error) {
        console.error("Save address error:", error);

        return res.status(500).json({
            message: "Unable to save address.",
        });
    }
};


export const deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User account is not available.",
            });
        }

        const deletedAddress = await Address.findOneAndDelete({
            _id: req.params.addressId,
            user: req.user.id,
        });

        if (!deletedAddress) {
            return res.status(404).json({
                message: "Address not found.",
            });
        }

        return res.json({
            message: "Address removed successfully.",
        });

    } catch (error) {
        console.error("Delete address error:", error);

        return res.status(500).json({
            message: "Unable to remove address.",
        });
    }
};