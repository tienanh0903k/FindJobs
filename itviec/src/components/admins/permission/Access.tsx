'use client';

import { useEffect, useState } from 'react';
import { Result } from 'antd';
import { useAppSelector } from '@/hook/useSelector';

interface IProps {
	hideChildren?: boolean;
	children: React.ReactNode;
	permissionProps: { method: string; apiPath: string; module: string };
}

const Access = ({ permissionProps, hideChildren = false, children }: IProps) => {
	// Set default: hideChildren = false => render children, hideChildren = true => không render children
	const [allow, setAllow] = useState<boolean>(false);

	const permissions = useAppSelector((state) => state.auth.currentUser?.permissions);
	// console.log('permissions', permissions);
	useEffect(() => {
		console.log('[Access] permissions', permissions);
	}, [permissions]); 

	useEffect(() => {
		if (permissions && permissions.length) {
			const check = permissions.find(
				(item) =>
					item.apiPath === permissionProps.apiPath &&
					item.method === permissionProps.method &&
					item.module === permissionProps.module,
			);
			if (check) {
				setAllow(true);
			} else {
				setAllow(false);
			}
		}
	}, [permissions, permissionProps]);

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
