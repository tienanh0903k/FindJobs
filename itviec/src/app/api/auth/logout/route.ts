
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const response = await NextResponse.json({message: 'Logout successful',},
			{
				status: 201,
			},
		);
        response.cookies.set('sessionToken', '', { expires: new Date(0) });     
        response.cookies.set('refreshToken', '', { expires: new Date(0) });     
        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Logout successful' });
    }
}