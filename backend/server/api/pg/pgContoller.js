const PG = require("./pgModel")


// create pg
const createPg = async (req, res) => {
    try {
        const validation = []
        const { title, address, city, rent,ownername } = req.body
        const image = req.file?.filename

        // Parse rent to number
        const parsedRent = parseFloat(rent)

        if (!title || typeof title !== "string") {
            validation.push("title is required and type must be string")
        }
        if (!address || typeof address !== "string") {
            validation.push("address is required and type must be string")
        }
        if (!city || typeof city !== "string") {
            validation.push("city is required and type must be string")
        }
        if (!rent || isNaN(parsedRent)) {
            validation.push("rent is required and must be a valid number")
        }
        if (!ownername || typeof ownername !=="string"){
            validation.push("Ownername is required")
        }

        if (!image) {
            validation.push("image is required")
        }

        if (validation.length > 0) {
            return res.status(400).json({
                success: false,
                message: "validation error",
                error: validation
            })
        }

        const newPg = new PG({
            title,
            address,
            city,
            rent: parsedRent,
            image,
            ownername
        })

        await newPg.save()

        res.status(201).json({
            success: true,
            message: "pg is created successfully",
            data: newPg
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: err.message
        })
    }
}


// get all pg available in the database

const getAllPg = async (req, res) => {
    try {
        const allPgs = await PG.find();
        res.json({
            status: 200,
            success: true,
            message: "All PGs fetched successfully",
            data: allPgs
        });
    }
    catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// get og by id 

const getPgById = async(req,res) =>{
    try{
        const {id} = req.body 
        if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required",

            })
        }

        const ids = await PG.findById(id)

        if(!ids){
            return res.json({
                status:404,
                success:false,
                message:"id is not found in the database"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"pg is find sucecssfully",
            data:ids
        })

    }catch(err){
       res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
       })
    }
}


const updatePgById = async (req, res) => {
  try {
    const { id, title, address, city, rent, ownername, status } = req.body;

    if (!id) {
      return res.json({
        status: 400,
        success: false,
        message: "id is required",
      });
    }

    const existingPg = await PG.findById(id);
    if (!existingPg) {
      return res.json({
        status: 404,
        success: false,
        message: "PG not found in the database",
      });
    }

    // Build update object dynamically
    const updateFields = {};
    if (title) updateFields.title = title;
    if (address) updateFields.address = address;
    if (city) updateFields.city = city;
    if (rent) updateFields.rent = rent;
    if (ownername) updateFields.ownername = ownername;
    if (status) updateFields.status = status;  // ✅ Include status update

    const updatedPg = await PG.findByIdAndUpdate(id, updateFields, { new: true });

    return res.json({
      status: 200,
      success: true,
      message: "PG updated successfully",
      data: updatedPg,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};






// delete pg on the based object id
const deletePgById  = async(req,res) =>{
    try{

        const {id} = req.body 
         if(!id){
            return res.json({
                status:400,
                success:false,
                message:"id is required"
            })
         }

         const ids = await PG.findById(id)
         if(!ids){
            return res.json({
                status:404,
                success:false,
                message:"id is not found in the database"
            })
         }

         const deletePg = await PG.findByIdAndDelete(id)
         if(!deletePg){
            return res.json({
                status:404,
                success:false,
                message:"pg is not delete"
            })
         }

         res.json({
            status:200,
            success:false,
            message:"pg is deleted successfully",
            data:deletePg
         })
    }catch(err){
      res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
      })
    }
}



module.exports = { createPg, getAllPg, getPgById, updatePgById, deletePgById}