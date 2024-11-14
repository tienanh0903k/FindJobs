<li className="relative group">
							{/* Container for user info and dropdown */}
							<div className="flex items-center gap-1 cursor-pointer">
								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
										<div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
									</div>
								) : currentUser ? (
									<>
										<Image
											className="rounded-full"
											src={AVT}
											alt="User Avatar"
											width={25}
											height={25}
										/>
										<p className="text-white text-sm">Xin chào, {currentUser.user?.name}</p>
										{/* Dropdown menu */}
										<div className="absolute right-[-20px] top-full mt-2 w-40 bg-white shadow-lg opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
											<Link
												href="/profile"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Thông tin cá nhân
											</Link>
											{(currentUser?.user?.role === 'ADMIN' ||
												currentUser?.user?.role === 'HR') && (
												<Link
													href="/admin/dashboard"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												>
													Trang quản trị
												</Link>
											)}
											<button
												type="button"
												className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
												onClick={(e) => {
													e.preventDefault();
													handleLogout();
												}}
											>
												Đăng xuất
											</button>
										</div>
									</>
								) : (
									// Nếu chưa có currentUser (chưa đăng nhập)
									<Link href="/login" className="text-white">
										Đăng nhập
									</Link>
								)}
							</div>
						</li>