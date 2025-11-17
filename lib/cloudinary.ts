import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } = process.env;

cloudinary.config({
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
});

export { cloudinary };
