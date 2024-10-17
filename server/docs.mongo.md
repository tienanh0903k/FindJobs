# Hướng Dẫn Truy Vấn MongoDB

## Điều Kiện Tiên Quyết
- Cài đặt MongoDB Server: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Cài đặt MongoDB Compass (Không bắt buộc): [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
- Cài đặt MongoDB Shell (`mongosh`): [https://www.mongodb.com/try/download/shell](https://www.mongodb.com/try/download/shell)

## Kết Nối Với MongoDB
Để kết nối với máy chủ MongoDB, sử dụng lệnh:
```sh
mongosh
```
Để kết nối với một cơ sở dữ liệu cụ thể:
```sh
use <database_name>
```

## Các Hoạt Động CRUD Cơ Bản

### Tạo (Insert)

Chèn một tài liệu vào một collection:
```js
db.collection_name.insertOne({
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com"
});
```

Chèn nhiều tài liệu:
```js
db.collection_name.insertMany([
  { "name": "Alice", "age": 25, "email": "alice@example.com" },
  { "name": "Bob", "age": 28, "email": "bob@example.com" }
]);
```

### Đọc (Find)

Tìm tất cả các tài liệu trong một collection:
```js
db.collection_name.find();
```

Tìm tài liệu với một điều kiện cụ thể:
```js
db.collection_name.find({ "age": { "$gt": 25 } });
```

Tìm một tài liệu duy nhất:
```js
db.collection_name.findOne({ "name": "Alice" });
```

### Cập Nhật (Update)

Cập nhật một tài liệu:
```js
db.collection_name.updateOne(
  { "name": "John Doe" },
  { "$set": { "age": 31 } }
);
```

Cập nhật nhiều tài liệu:
```js
db.collection_name.updateMany(
  { "age": { "$lt": 30 } },
  { "$set": { "status": "young" } }
);
```

### Xóa (Delete)

Xóa một tài liệu:
```js
db.collection_name.deleteOne({ "name": "Bob" });
```

Xóa nhiều tài liệu:
```js
db.collection_name.deleteMany({ "age": { "$lt": 30 } });
```

## Các Toán Tử Truy Vấn

### Toán Tử So Sánh
- `$eq`: Bằng
- `$ne`: Không bằng
- `$gt`: Lớn hơn
- `$gte`: Lớn hơn hoặc bằng
- `$lt`: Nhỏ hơn
- `$lte`: Nhỏ hơn hoặc bằng

Ví dụ:
```js
db.collection_name.find({ "age": { "$gte": 25, "$lte": 35 } });
```

### Toán Tử Logic
- `$and`: Phép AND logic
- `$or`: Phép OR logic
- `$not`: Phép NOT logic
- `$nor`: Phép NOR logic

Ví dụ:
```js
db.collection_name.find({
  "$or": [
    { "name": "Alice" },
    { "age": { "$gt": 30 } }
  ]
});
```

## Tổng Hợp (Aggregation)

### Pipeline Tổng Hợp
Framework tổng hợp cho phép biến đổi và phân tích dữ liệu:
```js
db.collection_name.aggregate([
  { "$match": { "age": { "$gte": 25 } } },
  { "$group": { "_id": "$age", "count": { "$sum": 1 } } },
  { "$sort": { "count": -1 } }
]);
```

### Các Giai Đoạn Tổng Hợp Thông Dụng
- `$match`: Lọc tài liệu dựa trên các điều kiện.
- `$group`: Nhóm các tài liệu lại với nhau và thực hiện các phép toán trên mỗi nhóm.
- `$sort`: Sắp xếp kết quả theo thứ tự tăng hoặc giảm dần.
- `$project`: Chọn hoặc thay đổi các trường trong tài liệu.
- `$limit`: Giới hạn số lượng kết quả trả về.
- `$skip`: Bỏ qua một số lượng tài liệu.
- `$unwind`: Tách một mảng thành nhiều tài liệu.

### Ví Dụ Chi Tiết

#### Sử Dụng `$match`
Lọc các tài liệu có `age` lớn hơn hoặc bằng 30:
```js
db.collection_name.aggregate([
  { "$match": { "age": { "$gte": 30 } } }
]);
```

#### Sử Dụng `$group`
Nhóm các tài liệu theo trường `city` và đếm số lượng người ở mỗi thành phố:
```js
db.collection_name.aggregate([
  { "$group": { "_id": "$city", "totalPeople": { "$sum": 1 } } }
]);
```

#### Sử Dụng `$project`
Chỉ lấy các trường `name` và `age` trong tài liệu:
```js
db.collection_name.aggregate([
  { "$project": { "name": 1, "age": 1, "_id": 0 } }
]);
```

#### Sử Dụng `$unwind`
Tách tài liệu có mảng `tags` thành nhiều tài liệu riêng biệt:
```js
db.collection_name.aggregate([
  { "$unwind": "$tags" }
]);
```

### $lookup - Truy Vấn Nâng Cao
Toán tử `$lookup` được sử dụng để thực hiện liên kết (join) giữa các collection, tương tự như phép `JOIN` trong SQL:
```js
db.orders.aggregate([
  {
    "$lookup": {
      "from": "customers",
      "localField": "customerId",
      "foreignField": "_id",
      "as": "customerDetails"
    }
  }
]);
```
- **`from`**: Tên của collection mà bạn muốn liên kết.
- **`localField`**: Trường trong collection hiện tại.
- **`foreignField`**: Trường trong collection mà bạn muốn liên kết.
- **`as`**: Tên trường để lưu trữ kết quả liên kết.

Ví dụ trên sẽ liên kết các tài liệu từ collection `orders` với collection `customers` dựa trên trường `customerId`.

## Đánh Chỉ Mục (Indexing)

### Tạo Chỉ Mục
Tạo chỉ mục trên một trường cụ thể:
```js
db.collection_name.createIndex({ "name": 1 });
```

### Xem Các Chỉ Mục
Liệt kê tất cả các chỉ mục cho một collection:
```js
db.collection_name.getIndexes();
```

### Xóa Chỉ Mục
Xóa một chỉ mục cụ thể:
```js
db.collection_name.dropIndex("name_1");
```

## Các Lệnh Hữu Ích Khác

### Đếm Tài Liệu
Đếm số lượng tài liệu phù hợp với truy vấn:
```js
db.collection_name.countDocuments({ "age": { "$gt": 25 } });
```

### Giới Hạn và Bỏ Qua
Giới hạn số lượng tài liệu được trả về:
```js
db.collection_name.find().limit(5);
```

Bỏ qua một số lượng tài liệu:
```js
db.collection_name.find().skip(10);
```

## MongoDB Atlas
Nếu bạn đang sử dụng MongoDB Atlas, hãy đảm bảo cấu hình chuỗi kết nối của bạn đúng cách.
Ví dụ chuỗi kết nối:
```sh
mongosh "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority"
```

Thay thế `<username>`, `<password>`, và `<database_name>` bằng thông tin của bạn.

---

## Tham Khảo
- [Tài Liệu MongoDB](https://docs.mongodb.com/)
- [Tổng Hợp MongoDB](https://docs.mongodb.com/manual/aggregation/)

Hãy thoải mái chỉnh sửa và thêm các truy vấn khác theo yêu cầu dự án của bạn.