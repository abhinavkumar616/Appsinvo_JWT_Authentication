const haversine = require('haversine-distance');

const metersToKilometers = (meters) => Math.round(meters / 1000);

const getDistance = async (req, res) => {
    try {
        const data = req.user.data;
        console.log("dataFromToken-----", data);

        const { latitude: userLatitude, longitude: userLongitude } = data;
        console.log("userLatitude---", userLatitude, userLongitude);

        const { Destination_Latitude, Destination_Longitude } = req.query;
        console.log("req.query data---", Destination_Latitude, Destination_Longitude);


        const distanceInMeters = haversine(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: Destination_Latitude, longitude: Destination_Longitude }
        );
        console.log("distanceInMeters", distanceInMeters); 

   
        const distanceInKilometers = metersToKilometers(distanceInMeters);
        console.log("distanceInKilometers", distanceInKilometers); 

       
        res.status(200).send({
            status_code: 200,
            message: "Distance calculated successfully",
            distance: `${distanceInKilometers}km`
        });

    } catch (error) {
        res.status(500).send({
            status_code: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = getDistance;
