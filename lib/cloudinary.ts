import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } = process.env;

// Validar configuração
if (!CLOUDINARY_API_KEY || CLOUDINARY_API_KEY.includes('COLE_AQUI')) {
    console.warn('⚠️  CLOUDINARY_API_KEY não configurado');
}
if (!CLOUDINARY_API_SECRET || CLOUDINARY_API_SECRET.includes('COLE_AQUI')) {
    console.warn('⚠️  CLOUDINARY_API_SECRET não configurado');
}
if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.includes('COLE_AQUI')) {
    console.warn('⚠️  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME não configurado');
}

cloudinary.config({
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
});

export { cloudinary };
