import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const supabase = supabaseServer();

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { items, total, customerInfo } = await req.json();

    if (!items || !customerInfo) {
      return NextResponse.json(
        { error: 'Items and customer info are required' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_email: customerInfo.email,
        customer_name: customerInfo.fullName,
        address: customerInfo.address,
        city: customerInfo.city,
        total: total + 5, // Add shipping fee
        status: 'pending',
        created_at: new Date().toISOString(),
      }])
      .select('*')
      .single();

    if (orderError) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Add order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      book_id: item.id,
      quantity: item.quantity,
      price: item.price,
      created_at: new Date().toISOString(),
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return NextResponse.json(
        { error: 'Failed to add order items' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Order created successfully', order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
