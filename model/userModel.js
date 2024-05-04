const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    latitude: String,
    longitude: String,
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive'] // Example of validation, you can add more as needed
    },
    register_at: {
        type: {
            day: String,
            date: Date,
        },
        default: () => ({
            day: getDayFromDate(Date.now()), // Get day from current date
            date: Date.now(),
        }),
    }
});

// Function to get day from date
const getDayFromDate = (timestamp) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp);
    return days[date.getDay()];
};

// Hash password before saving
userModelSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Password complexity validation
        if (!isValidPassword(this.password)) {
            return next(new Error("Password must contain at least 10 characters including at least one special character, one lowercase letter, one uppercase letter, and one digit."));
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

// Function to validate password complexity
function isValidPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{10,}$/;
    return passwordRegex.test(password);
}


const userModel = mongoose.model("user", userModelSchema);
module.exports = userModel;