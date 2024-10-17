import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import 'server-only';
export async function getMessages() {   
    const cookieStore = cookies();
    const token = cookieStore.get('sessionToken');
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/message/me`, {
			method: 'GET',
            headers: {
                'Authorization': `Bearer ${token?.value}`,
            },
			credentials: 'include',
			cache: 'no-store',
		});

		//console.log('Response status:', res.status);

		if (!res.ok) {
			throw new Error('Failed to fetch messages');
		}

		return res.json();
	} catch (error) {
		console.error('Error fetching messages:', error);
		return;
	}
}




export async function getConversation(senderId: string, receiveId: string) {
    try {
        const res = await fetch(`${process.env.NEST_SERVER_API_URL}/api/message/conversation?sender_id=${senderId}&receive_id=${receiveId}`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch conversation');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching conversation:', error);
        return;
    }
}