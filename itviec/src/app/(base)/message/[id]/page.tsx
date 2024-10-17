import { getMessages } from '@/api/fetching/messageApi';
import Conversation from '@/components/client/Messages/Conversation';
import Rightbar from '@/components/client/Messages/Rightbar';
import Sidebar from '@/components/client/Messages/Sidebar';


interface Params {
    params: {
        id: string;
    };
}

export default async function MessagePageId(
	{ params } : Params
) {
	const usersChat = await getMessages();
	//console.log('usersChat',usersChat);
	//console.log(params);
	return (
		<div className="flex h-screen">
			<Sidebar users={usersChat} />
			<Conversation id={params.id}/>
			<Rightbar />
		</div>
	);
}
