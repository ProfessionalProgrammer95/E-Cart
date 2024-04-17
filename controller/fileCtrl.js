const {StatusCodes} = require('http-status-codes')
const Product = require('../model/product')
const fs =require('fs')
const path = require("path")

//remove temp files
const removeTemp = (filePath) => {
    fs.unlinkSync(filePath)
}

//upload product image
const uploadImage = async (req,res) => {
    try{
        //to recieve file data
        let {thumbnail} = req.files
        let {product} = req.query //product id

        let extPro = await Product.findById({_id: product})
          if(!extPro)
            res.status(StatusCodes.NOT_FOUND).json({status:false, msg:`Requested product id not found`})
        
        //create weather upload folder exist or not
        let outPath =path.join(__dirname, "../client/public/uploads")
            if(!fs.existsSync(outPath)) {
                // if folder is not present create a new folder
                fs.mkdirSync(outPath,{recursive:true})
            }

        //rename the file
        let ext = path.extname(thumbnail.name)
        let newFile = `${extPro.title}${ext}` //producttitle.jpg


        //file already exists in the location or not
        let filePath = path.join(__dirname, "../client/public/uploads", `${newFile}`)
        if(fs.existsSync(filePath)) {
            removeTemp(thumbnail.tempFilePath)
            return res.status(StatusCodes.CONFLICT).json({status:false, msg:`File already exists.`})
        }

    //validate file type upload the file
        if(thumbnail.mimetype === 'image/png' || 
           thumbnail.mimetype === 'image/jpeg'|| 
           thumbnail.mimetype === 'image/jpg' ||
           thumbnail.mimetype || "image/webp" ) {

        await thumbnail.mv(filePath, async (err) => {
            if(err) {
                removeTemp(thumbnail.tempFilePath)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg:err})
            }

        if(req.query.product) {
            //update the product collection
            await Product.findByIdAndUpdate({_id:product},{image: newFile})

        }        

        return res.status(StatusCodes.CREATED).json({status:true, msg:"Files upload successfully", file:thumbnail})
        })
    } else {
        return res.status(StatusCodes.CONFLICT).json({status:false, msg:`file type is not matched.. allows only .png.. jpeg and .webp`})
    }

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg:err.message})
    }
}

//delete products image
const deleteImage =async (req,res) => {
    try{
        let {product} = req.query //product id

        let extPro = await Product.findById({_id: product})
          if(!extPro)
            res.status(StatusCodes.NOT_FOUND).json({status:false, msg:`Requested product id not found`})

        //file already exists in the location or not
        let filePath = path.join(__dirname, "../client/public/uploads", `${extPro.image.name}`)
        if(!fs.existsSync(filePath)) {
            return res.status(StatusCodes.NOT_FOUND).json({status:false, msg:`File not exists.`})
        }
    
       await fs.unlink(filePath, async (err) => {
        if(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, msg:err})

        //update the product collection
        await Product.findByIdAndUpdate({ _id: product }, {image:  "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"})

        return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: `File deleted successfully`})

       }) 

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg:err.message})
    }
}

module.exports = {uploadImage,deleteImage}