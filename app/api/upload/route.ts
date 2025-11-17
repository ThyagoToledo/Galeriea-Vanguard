import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Arquivo inválido.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${base64}`, {
        folder: 'galeria-vanguard'
    });

    return NextResponse.json({
        url: result.secure_url,
        publicId: result.public_id
    });
}
