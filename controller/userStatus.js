const userModel=require("../model/userModel")

const userStatus=async(req,res)=>{

    try{
        let users = await userModel.find();
        users.forEach(async (user) => {
            user.status = user.status === 'active' ? 'inactive' : 'active';
            await user.save();
        });

        res.status(200).send({
            status_code: 200,
            message: "All users status updated successfully"
        });

    }
    catch(error){
        res.status(500).send({ 
            status_code: 500, 
            message:"Internal Server Error",
            error:error.message
         });
    }
}

module.exports=userStatus