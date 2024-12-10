# Docker Commands Cheatsheet

## Basic Commands

| Command | Description |
| --- | --- |
| `docker run <image>` | Tạo và chạy một container từ image. Có thể thêm các tùy chọn như `-d` (chạy ở chế độ detached), `-p` (map port), `-v` (mount volume), `-e` (set environment variables), v.v. |
| `docker ps` | Liệt kê các container đang chạy |
| `docker ps -a` | Liệt kê tất cả các container (bao gồm cả đã dừng) |
| `docker stop <container>` | Dừng một container đang chạy |
| `docker start <container>` | Khởi động lại một container đã dừng |
| `docker rm <container>` | Xóa một container |
| `docker rmi <image>` | Xóa một image |
| `docker logs <container>` | Xem logs của một container |
| `docker exec -it <container> <command>` | Chạy một lệnh bên trong container |

## Image Management

| Command | Description |
| --- | --- |
| `docker build -t <name>:<tag> .` | Tạo image từ Dockerfile trong thư mục hiện tại |
| `docker pull <image>` | Tải image từ registry |
| `docker push <image>` | Đẩy image lên registry |
| `docker images` | Liệt kê các image có sẵn |
| `docker inspect <image>` | Xem thông tin chi tiết về image |
| `docker history <image>` | Xem lịch sử build của image |

## Container Networking

| Command | Description |
| --- | --- |
| `docker network create <network>` | Tạo mạng ảo mới |
| `docker network ls` | Liệt kê các mạng ảo |
| `docker network inspect <network>` | Xem thông tin chi tiết về mạng ảo |
| `docker run --network <network> <image>` | Chạy container trong mạng ảo |
| `docker network connect <network> <container>` | Kết nối container vào mạng ảo |
| `docker network disconnect <network> <container>` | Ngắt kết nối container khỏi mạng ảo |

## Volume Management

| Command | Description |
| --- | --- |
| `docker volume create <volume>` | Tạo volume mới |
| `docker volume ls` | Liệt kê các volume |
| `docker volume inspect <volume>` | Xem thông tin chi tiết về volume |
| `docker run -v <volume>:<container_path> <image>` | Chạy container với volume được mount |
| `docker volume rm <volume>` | Xóa volume |

## Docker Compose

| Command | Description |
| --- | --- |
| `docker-compose up` | Khởi động các dịch vụ được định nghĩa trong file docker-compose.yml |
| `docker-compose up -d` | Khởi động các dịch vụ ở chế độ detached |
| `docker-compose down` | Dừng và xóa các dịch vụ |
| `docker-compose ps` | Liệt kê các container được quản lý bởi Compose |
| `docker-compose logs` | Xem logs của các dịch vụ |
| `docker-compose build` | Rebuild các image được định nghĩa trong file docker-compose.yml |

Đây là một số lệnh Docker cơ bản và phổ biến để quản lý các container, image, mạng, volume và sử dụng Docker Compose. Hãy tham khảo thêm tài liệu chính thức của Docker để biết thêm thông tin chi tiết.