import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import { Order } from '../../../../models/Orders';

// GET single order by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const order = await Order.findById(params.id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch order',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// UPDATE order status
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { status } = await request.json();

    // Validate the status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'shipped'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid status value',
          message: `Status must be one of: ${validStatuses.join(', ')}`
        },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully'
    });
  
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update order',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}