const User = require("../api/user/userModel")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const seedAdmin = async(req,res) =>{
    try{
        const admin = await User.findOne({email:"admin@gmail.com"})
        if(!admin){

            const hashedPassword = await bcrypt.hash("123456",10)
          const newAdmin = new User({
            name:"admin",
            email:"admin@gmail.com",
            password:hashedPassword,
            address:"india",
            phone:"456464655",
            userType:"admin"
          })
          await newAdmin.save()
          console.log("admin is crated")

        }
        console.log("admin is already exist")

    }catch(err){
        console.log("admin is not created due to error:",err)

    }
}


const loginAdmin = async (req, res) => {
    const { email, password, userType } = req.body
    try {
        // 1. check if user is exist 
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                status: 404,
                success: false,
                message: "user not found",

            })
        }

        // check user type
        if (user.userType !== userType) {
            return res.json({
                status: 401,
                success: false,
                message: "user type mismatch",

            })
        }

        // compare password 

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                status: 401,
                success: false,
                message: "invalid credential"
            })
        }

        // Generate JWT 
        
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }

        )

        res.json({
            status: 200,
            success: true,
            message: "login successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                userType: user.userType
            }

        })

    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "internal server error",
            error: err.message
        })
    }
}


module.exports = {seedAdmin ,loginAdmin}