const SubResume = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center py-10">
        <div className="w-full max-w-4xl bg-white p-10 shadow-lg">
          {/* Thông tin cá nhân */}
          <div className="flex mb-6">
            <div className="w-3/4">
              <h1 className="text-3xl font-bold">Nguyễn Thị Mai</h1>
              <p className="text-lg text-gray-600">Nhân Viên Kinh Doanh</p>
              <div className="mt-4">
                <p><strong>Ngày sinh:</strong> 01-01-1992</p>
                <p><strong>Giới tính:</strong> Nữ</p>
                <p><strong>Điện thoại:</strong> 0111111111</p>
                <p><strong>Email:</strong> nguyenthimai@gmail.com</p>
                <p><strong>Địa chỉ:</strong> Quận 1, TPHCM</p>
              </div>
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div> {/* Placeholder for Profile Image */}
            </div>
          </div>
  
          {/* Mục tiêu nghề nghiệp */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Mục tiêu nghề nghiệp</h2>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Mong muốn học hỏi kinh nghiệm ở môi trường làm việc chuyên nghiệp, năng động.</li>
              <li>Có cơ hội thăng tiến cao, thành công trong công việc.</li>
            </ul>
          </div>
  
          {/* Học vấn */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Học vấn</h2>
            <div>
              <p><strong>2013-01 - 2016-01</strong></p>
              <p><strong>Đại Học Kinh Tế</strong></p>
              <p>Chuyên ngành: Quản trị kinh doanh</p>
              <p>Bằng cấp: Cử nhân đại học</p>
              <p>Tốt nghiệp loại: Khá</p>
            </div>
          </div>
  
          {/* Kinh nghiệm làm việc */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Kinh nghiệm làm việc</h2>
            <div>
              <p><strong>2018-01 - 2018-12</strong></p>
              <p><strong>Siêu Việt Group</strong> | Chuyên Viên Kinh Doanh</p>
              <ul className="list-disc ml-6 text-gray-700">
                <li>Liên hệ với khách hàng để tư vấn và tìm hiểu nhu cầu khách hàng.</li>
                <li>Thuyết phục khách hàng, chốt các gói hợp đồng phù hợp với từng khách hàng.</li>
                <li>Làm hợp đồng và xử lý thanh toán.</li>
                <li>Chăm sóc khách hàng sau khi thanh toán.</li>
                <li><strong>Thành tích đạt được:</strong> Hoàn thành nhiệm vụ được giao.</li>
              </ul>
            </div>
          </div>
  
          {/* Sở thích */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sở thích</h2>
            <p>Du lịch, nghe nhạc, thể thao, đọc sách.</p>
          </div>
  
          {/* Ngoại ngữ */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Ngoại ngữ</h2>
            <p>Tiếng Anh - Nói: Trung Bình, Đọc: Trung Bình, Viết: Trung Bình</p>
          </div>
  
          {/* Người liên hệ */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Người liên hệ</h2>
            <div className="mb-4">
              <p><strong>Công ty:</strong> Siêu Việt Group</p>
              <p><strong>Họ và tên:</strong> Nguyễn Văn A</p>
              <p><strong>Số điện thoại:</strong> 0222222222</p>
              <p><strong>Chức vụ:</strong> Trưởng phòng</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SubResume;