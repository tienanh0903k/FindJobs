export default function NotFound() {
	return (
		// flex min-h-screen flex-col items-center justify-center bg-gray-100
		<div
			style={{
				background: 'linear-gradient(to left, #076585, #fff)',
				height: '100vh',
				textAlign: 'center',
				padding: '2rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{' '}
			<h1 className="font-bold text-9xl text-gray-900">404</h1>
			<p className="text-2xl font-bold text-gray-900 mb-8">Ôi! Không tìm thấy trang</p>
			<p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
			<a href="/" style={{ color: 'blue', textDecoration: 'none' }}>
				Quay về trang chủ
			</a>
		</div>
	);
}
