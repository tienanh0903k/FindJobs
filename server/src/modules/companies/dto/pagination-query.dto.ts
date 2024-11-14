import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()  // Chỉ định rằng trường này không bắt buộc (optional). Nếu không có trong yêu cầu, nó sẽ không bị validate lỗi.
  @IsPositive()  // Đảm bảo giá trị là số dương. Nếu giá trị nhỏ hơn hoặc bằng 0, sẽ gây lỗi validate.
  @Type(() => Number)  // Sử dụng class-transformer để ép kiểu giá trị về kiểu `Number` từ chuỗi (vì query string trả về dữ liệu dưới dạng chuỗi).
  page?: number;  // Trường này đại diện cho trang hiện tại (page).

  @IsOptional()  // Tương tự, trường này cũng không bắt buộc.
  @IsPositive()  // Đảm bảo rằng giá trị là số dương (lớn hơn 0).
  @Min(1)  // Đảm bảo giá trị tối thiểu của trường này là 1 (không thể ít hơn 1).
  @Type(() => Number)  // Chuyển đổi giá trị về kiểu `Number`.
  limit?: number;  // Trường này đại diện cho số lượng kết quả trên mỗi trang (limit).
}
