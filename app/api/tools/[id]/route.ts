// app/api/tools/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '../../../../lib/cloudinary';
import dbConnect from '../../../../lib/dbConnect';
import Tool from '../../../../models/Tools';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const { id } = await params; // Await params here
    const tool = await Tool.findById(id);
    
    if (!tool) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: tool },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const { id } = await params; // Await params here
    const formData = await request.formData();

    // Extract fields
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 1;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const color = formData.getAll('color') as string[];
    const existingImages = formData.getAll('existingImages') as string[];

    // Handle image uploads
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [...existingImages];

    for (const file of imageFiles) {
      if (file.size === 0) continue;

      const buffer = await file.arrayBuffer();
      const array = new Uint8Array(buffer);

      const imageUrl = await new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tools' },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error('Upload failed: no result'));
              return;
            }
            resolve(result.secure_url);
          }
        ).end(array);
      });

      imageUrls.push(imageUrl);
    }

    const updatedTool = await Tool.findByIdAndUpdate(
      id,
      {
        name,
        brand,
        category,
        quantity,
        description,
        price,
        color,
        image: imageUrls
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, data: updatedTool },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const { id } = await params; // Await params here
    
    const tool = await Tool.findById(id);
    if (!tool) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    try {
      for (const imageUrl of tool.image) {
        const publicId = imageUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`tools/${publicId}`);
        }
      }
    } catch (cloudinaryError) {
      console.error('Error deleting images from Cloudinary:', cloudinaryError);
    }

    await Tool.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: 'Tool deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}