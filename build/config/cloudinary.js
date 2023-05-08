// const cloudinary = require('cloudinary').v2;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _cloudinary = require("cloudinary");
// Configuration
_cloudinary.v2.config({
    cloud_name: "etmedia",
    api_key: "198951455822186",
    api_secret: "TUy45D_ShhXCYZL7bzDIu0P4WdE"
});
const uploadImageToCloudinary = async (imagePath)=>{
    try {
        // Upload the image
        const result = await _cloudinary.v2.uploader.upload(imagePath);
        return result.url;
    } catch (error) {
        console.error(error);
    }
};
const _default = uploadImageToCloudinary;
