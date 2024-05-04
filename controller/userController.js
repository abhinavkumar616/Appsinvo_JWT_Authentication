const userModel=require("../model/userModel")

const jwt=require("jsonwebtoken")

const userController=async(req,res)=>{

        try {
            const { name, email, password, address, latitude, longitude,status } = req.body;

            if(await userModel.findOne({email})){
                return res.status(400).send({
                    status_code: 400,
                    error: "Email already exists"
                });
            }

            const newUser = await userModel.create({ 
                name, email, password, address, latitude, longitude,
                ...(status ? { status } : {})
            });
            await newUser.save();

            let token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data:newUser
            },process.env.JWT_SECRET)
            
            console.log("jwt--------",token);

            res.status(201).send({
                status_code: 201,
                message: 'User created successfully',
                data: {
                    name,
                    email,
                    address,
                    latitude,
                    longitude,
                    status: newUser.status,
                    register_at: newUser.register_at,
                    token
                }
              
            });
        } catch (error) {
            res.status(500).send({ 
                status_code: 500, 
                message:"Internal Server Error",
                error:error.message
             });
        }
}
module.exports=userController