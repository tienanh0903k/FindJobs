
# Các Lệnh Git Cơ Bản và Chức Năng

## Cấu Hình
- **`git config`**: Cấu hình tên và email người dùng.
  ```bash
  git config --global user.name "Tên của bạn"
  git config --global user.email "email@example.com"
  ```

## Quản Lý Kho Lưu Trữ
- **`git init`**: Khởi tạo một kho lưu trữ Git mới.
- **`git clone`**: Sao chép một kho lưu trữ từ xa.
  ```bash
  git clone <đường_dẫn_kho_lưu_trữ>
  ```

## Quản Lý Tệp
- **`git add`**: Thêm tệp/thư mục vào khu vực staging.
  ```bash
  git add <tên_tệp>
  git add .
  ```
- **`git rm`**: Xóa tệp khỏi kho lưu trữ.
  ```bash
  git rm <tên_tệp>
  ```

## Commit Thay Đổi
- **`git commit`**: Lưu thay đổi vào kho lưu trữ.
  ```bash
  git commit -m "Mô tả thay đổi"
  ```

## Quản Lý Nhánh (Branch)
- **`git branch`**: Liệt kê, tạo, hoặc xóa nhánh.
  ```bash
  git branch
  git branch <tên_nhánh_mới>
  git branch -d <tên_nhánh>
  ```
- **`git checkout`**: Chuyển nhánh hoặc khôi phục tệp.
  ```bash
  git checkout <tên_nhánh>
  git checkout -b <tên_nhánh_mới>
  ```

## Cập Nhật và Hợp Nhất
- **`git fetch`**: Lấy thay đổi từ kho lưu trữ từ xa.
- **`git pull`**: Lấy và hợp nhất thay đổi.
  ```bash
  git pull <tên_remote> <tên_nhánh>
  ```
- **`git push`**: Đẩy thay đổi lên kho lưu trữ từ xa.
  ```bash
  git push <tên_remote> <tên_nhánh>
  ```
- **`git merge`**: Hợp nhất nhánh.
  ```bash
  git merge <tên_nhánh>
  ```

## Kiểm Tra Trạng Thái và Lịch Sử
- **`git status`**: Hiển thị trạng thái của kho lưu trữ.
- **`git log`**: Xem lịch sử commit.
  ```bash
  git log
  ```

## Bỏ Qua Tệp
- **`.gitignore`**: Chỉ định các tệp hoặc thư mục cần bỏ qua.

## Lưu Trữ Tạm Thời
- **`git stash`**: Lưu trữ tạm thời các thay đổi chưa commit.
  ```bash
  git stash
  git stash list
  git stash apply
  ```

## Tag (Gắn Thẻ)
- **`git tag`**: Tạo thẻ cho các commit.
  ```bash
  git tag <tên_thẻ>
  ```

## Kho Lưu Trữ Từ Xa
- **`git remote`**: Quản lý các kho lưu trữ từ xa.
  ```bash
  git remote add <tên> <đường_dẫn>
  git remote -v
  ```

---

Tài liệu này tóm tắt các lệnh Git cơ bản thường dùng trong quản lý phiên bản.
