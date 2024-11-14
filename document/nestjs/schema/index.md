
# Các Decorators Thường Dùng Trong Schema của NestJS

Trong NestJS, decorators được sử dụng để mô tả cấu trúc dữ liệu và thực hiện các xác thực (validation) cho schema. Dưới đây là danh sách các decorators phổ biến và giải thích về chúng.

## Decorators Định Nghĩa Loại Dữ Liệu

1. `@IsString()`
   - **Mô tả**: Đảm bảo giá trị là một chuỗi (string).
   - **Ví dụ**: 
   ```typescript
   @IsString()
   name: string;
   ```

2. `@IsInt()`
   - **Mô tả**: Đảm bảo giá trị là một số nguyên.
   - **Ví dụ**: 
   ```typescript
   @IsInt()
   age: number;
   ```

3. `@IsBoolean()`
   - **Mô tả**: Đảm bảo giá trị là boolean (đúng hoặc sai).
   - **Ví dụ**: 
   ```typescript
   @IsBoolean()
   isActive: boolean;
   ```

4. `@IsDate()`
   - **Mô tả**: Đảm bảo giá trị là một đối tượng `Date`.
   - **Ví dụ**: 
   ```typescript
   @IsDate()
   birthDate: Date;
   ```

## Decorators Ràng Buộc Giá Trị

5. `@IsNotEmpty()`
   - **Mô tả**: Đảm bảo giá trị không được để trống.
   - **Ví dụ**: 
   ```typescript
   @IsNotEmpty()
   name: string;
   ```

6. `@MinLength(n)`
   - **Mô tả**: Đảm bảo chuỗi có độ dài ít nhất là `n` ký tự.
   - **Ví dụ**: 
   ```typescript
   @MinLength(5)
   password: string;
   ```

7. `@MaxLength(n)`
   - **Mô tả**: Đảm bảo chuỗi không vượt quá `n` ký tự.
   - **Ví dụ**: 
   ```typescript
   @MaxLength(20)
   username: string;
   ```

8. `@Min()`
   - **Mô tả**: Đảm bảo giá trị số ít nhất là `n`.
   - **Ví dụ**: 
   ```typescript
   @Min(18)
   age: number;
   ```

9. `@Max()`
   - **Mô tả**: Đảm bảo giá trị số không vượt quá `n`.
   - **Ví dụ**: 
   ```typescript
   @Max(100)
   rating: number;
   ```

10. `@IsEmail()`
   - **Mô tả**: Đảm bảo giá trị là email hợp lệ.
   - **Ví dụ**: 
   ```typescript
   @IsEmail()
   email: string;
   ```

11. `@IsOptional()`
   - **Mô tả**: Biến này là tùy chọn, không bắt buộc phải có.
   - **Ví dụ**: 
   ```typescript
   @IsOptional()
   nickname?: string;
   ```

## Decorators Tùy Biến Dữ Liệu

12. `@Transform()`
   - **Mô tả**: Cho phép tùy chỉnh dữ liệu trước khi xử lý.
   - **Ví dụ**: 
   ```typescript
   @Transform(({ value }) => value.toUpperCase())
   title: string;
   ```

13. `@Type()`
   - **Mô tả**: Xác định kiểu dữ liệu phức tạp (ví dụ: class) cho một biến.
   - **Ví dụ**: 
   ```typescript
   @Type(() => Number)
   age: number;
   ```

