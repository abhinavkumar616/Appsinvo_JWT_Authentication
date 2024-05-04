const userModel = require('../model/userModel');

const getDataByDay = async (req, res) => {
    try {
        
        const dayNumbers = req.query.week_number.split(',').map(Number); 

        const week_number = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const data = {};

        for (const dayNumber of dayNumbers) {

            if (dayNumber >= 0 && dayNumber < week_number.length) {
                const dayName = week_number[dayNumber];

                const users = await userModel.find({ "register_at.day": dayName }).select('name email');

                data[dayName.toLowerCase()] = users;
            } else {
                data[`out_of_range_${dayNumber}`] = "Day number is out of range";
            }
        }

        res.status(200).json({
            status_code: 200,
            message: "Data for the specified week_number",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status_code: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = getDataByDay;
