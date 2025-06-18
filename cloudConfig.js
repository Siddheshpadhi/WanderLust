const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'WanderLust_DEV',
    // format: async (req, file) => {
    // const ext = path.extname(file.originalname).slice(1).toLowerCase(); // e.g. 'jpg'
    // const allowedFormats = ['jpg', 'jpeg', 'png', 'webp']; // supports promises as well
    // return allowedFormats.includes(ext) ? ext : 'png';
    // },
    allowedFormats : ['jpg', 'jpeg', 'png', 'webp'], // supports promises as well
    },
});
    
module.exports = {
    cloudinary,
    storage
}
