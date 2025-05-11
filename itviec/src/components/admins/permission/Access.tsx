'use client';

import { useEffect, useState } from 'react';
import { Result } from 'antd';
import { useAppSelector } from '@/hook/useSelector';

interface IProps {
	hideChildren?: boolean;
	children: React.ReactNode;
	permission: { method: string; apiPath: string; module: string };
}

const Access = ({ permission, hideChildren = false, children }: IProps) => {
	// Set default: hideChildren = false => render children, hideChildren = true => không render children
	const [allow, setAllow] = useState<boolean>(false);

	const permissions = useAppSelector((state) => state.auth.currentUser?.permissions);
	console.log('permissions', permissions);

	useEffect(() => {
		if (permissions && permissions.length) {
			const check = permissions.find(
				(item) =>
					item.apiPath === permission.apiPath &&
					item.method === permission.method &&
					item.module === permission.module,
			);
			if (check) {
				setAllow(true);
			} else {
				setAllow(false);
			}
		}
	}, [permissions, permission]);

	return (
		<>
			{allow ? (
				<>{children}</>
			) : (
				<>
					{hideChildren ? (
						<></>
					) : (
						<Result
							status="403"
							title="Truy cập bị từ chối"
							subTitle="Xin lỗi, bạn không có quyền hạn (permission) truy cập thông tin này"
						/>
					)}
				</>
			)}
		</>
	);
};

export default Access;
