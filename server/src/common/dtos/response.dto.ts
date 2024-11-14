
export class ResponseData<T> {
    statusCode: number;   // Mã trạng thái HTTP (vd: 200, 201, 404)
    message: string;      // Thông báo mô tả về phản hồi (vd: 'Thành công', 'Lỗi')
    data?: T;             // Dữ liệu trả về (có thể có hoặc không)
    error?: any;          // Thông tin về lỗi nếu có (nếu xảy ra lỗi)
  
    constructor(statusCode: number, message: string, data?: T, error?: any) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.error = error;
    }
  }
  