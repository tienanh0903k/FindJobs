# mongoosastic-ts

Mongoosastic-ts là một plugin [mongoose](http://mongoosejs.com/) có khả năng tự động lập chỉ mục các mô hình của bạn vào [elasticsearch](https://www.elastic.co/).

- [Cài đặt](#cài-đặt)
- [Cấu hình](#cấu-hình)
- [Lập chỉ mục](#lập-chỉ-mục)
- [Lưu một tài liệu](#lưu-một-tài-liệu)
- [Xóa một tài liệu](#xóa-một-tài-liệu)
- [Lập chỉ mục các mô hình lồng nhau](#lập-chỉ-mục-các-mô-hình-lồng-nhau)
- [Lập chỉ mục tham chiếu mongoose](#lập-chỉ-mục-tham-chiếu-mongoose)
- [Lập chỉ mục một bộ sưu tập hiện có](#lập-chỉ-mục-một-bộ-sưu-tập-hiện-có)
- [Lập chỉ mục hàng loạt](#lập-chỉ-mục-hàng-loạt)
- [Lập chỉ mục theo điều kiện](#lập-chỉ-mục-theo-điều-kiện)
- [Lập chỉ mục theo yêu cầu](#lập-chỉ-mục-theo-yêu-cầu)
- [Xóa chỉ mục theo yêu cầu](#xóa-chỉ-mục-theo-yêu-cầu)
- [Cắt ngắn một chỉ mục](#cắt-ngắn-một-chỉ-mục)
- [Hạn chế](#hạn-chế)
  - [Tự động lập chỉ mục](#tự-động-lập-chỉ-mục)
  - [Tìm kiếm ngay sau sự kiện es-indexed](#tìm-kiếm-ngay-sau-sự-kiện-es-indexed)
- [Mapping](#mapping)
- [Mapping địa lý](#mapping-địa-lý)
  - [Lập chỉ mục một điểm địa lý](#lập-chỉ-mục-một-điểm-địa-lý)
  - [Lập chỉ mục một hình dạng địa lý](#lập-chỉ-mục-một-hình-dạng-địa-lý)
- [Tạo mapping theo yêu cầu](#tạo-mapping-theo-yêu-cầu)
- [Truy vấn](#truy-vấn)
- [Hydration](#hydration)

## Cài đặt

Phiên bản mới nhất của gói này sẽ gần như tương thích với các gói `elasticsearch` và `mongoose` mới nhất.

```bash
npm install -S mongoosastic-ts
```

## Cấu hình

### Model.plugin(mongoosastic, options)

Các tùy chọn bao gồm:

- `index` - chỉ mục trong Elasticsearch để sử dụng. Mặc định là dạng số nhiều của tên mô hình.
- `type` - loại mà mô hình này đại diện trong Elasticsearch. Mặc định là tên mô hình.
- `esClient` - một thể hiện `Client` Elasticsearch hiện có.
- `hosts` - một mảng các máy chủ mà Elasticsearch đang chạy.
- `host` - máy chủ mà Elasticsearch đang chạy
- `port` - cổng mà Elasticsearch đang chạy
- `auth` - thông tin xác thực cần thiết để truy cập máy chủ Elasticsearch. Theo định dạng tiêu chuẩn 'username:password'
- `protocol` - giao thức mà máy chủ Elasticsearch sử dụng. Mặc định là http
- `hydrate` - có tìm kiếm kết quả trong mongodb trước hay không
- `hydrateOptions` - tùy chọn để truyền vào hàm hydrate
- `bulk` - các tùy chọn kích thước và độ trễ cho lập chỉ mục hàng loạt
- `filter` - hàm được sử dụng cho lập chỉ mục theo điều kiện
- `transform` - hàm được sử dụng để biến đổi tài liệu đã được tuần tự hóa trước khi lập chỉ mục
- `populate` - một mảng các đối tượng tùy chọn populate của Mongoose
- `indexAutomatically` - cho phép tắt lập chỉ mục sau khi lưu mô hình khi bạn cần kiểm soát tốt hơn về thời điểm tài liệu được lập chỉ mục. Mặc định là true
- `customProperties` - một đối tượng chi tiết các thuộc tính bổ sung sẽ được hợp nhất vào mapping mặc định của loại khi `createMapping` được gọi.
- `saveOnSynchronize` - kích hoạt phương thức lưu Mongoose (và phương thức trước khi lưu) khi đồng bộ hóa một bộ sưu tập/chỉ mục. Mặc định là true

Để có một mô hình được lập chỉ mục vào Elasticsearch, chỉ cần thêm plugin.

```typescript
const mongoose = require('mongoose'),
mongoosastic = require('mongoosastic-ts'),
Schema = mongoose.Schema;

const User = new Schema({
name: String,
email: String,
city: String,
});

User.plugin(mongoosastic);
```

Mặc định, nó sẽ sử dụng dạng số nhiều của tên mô hình làm chỉ mục và sử dụng tên mô hình làm loại. Vì vậy, nếu bạn tạo một đối tượng User mới và lưu nó, bạn có thể thấy nó bằng cách điều hướng đến
http://localhost:9200/users/user/_search (giả sử Elasticsearch đang chạy cục bộ trên cổng 9200).

Hành vi mặc định là tất cả các trường sẽ được lập chỉ mục vào Elasticsearch. Điều này có thể hơi lãng phí, đặc biệt là khi tài liệu hiện đang bị sao chép giữa mongodb và Elasticsearch, vì vậy bạn nên cân nhắc chỉ lập chỉ mục các trường nhất định bằng cách chỉ định `es_indexed` trên các trường bạn muốn lưu trữ:

```typescript
const User = new Schema({
name: { type: String, es_indexed: true },
email: String,
city: String,
});

User.plugin(mongoosastic);
```

Trong trường hợp này, chỉ có trường name sẽ được lập chỉ mục để tìm kiếm.

Bây giờ, bằng cách thêm plugin, mô hình sẽ có một phương thức mới gọi là `search` có thể được sử dụng để thực hiện các tìm kiếm đơn giản đến phức tạp. Phương thức `search` chấp nhận [chuỗi truy vấn tiêu chuẩn của Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-queries.html)

```typescript
const results = await User.search({
query_string: {
  query: "john"
}
});
// kết quả ở đây
```

Để kết nối đến nhiều máy chủ hơn, bạn có thể sử dụng một mảng các máy chủ.

```typescript
MyModel.plugin(mongoosastic, {
hosts: ['localhost:9200', 'anotherhost:9200'],
});
```

Ngoài ra, bạn có thể tái sử dụng một thể hiện `Client` Elasticsearch hiện có.

```typescript
const esClient = new elasticsearch.Client({ host: 'localhost:9200' });
MyModel.plugin(mongoosastic, {
esClient: esClient,
});
```

## Lập chỉ mục

### Lưu một tài liệu

Việc lập chỉ mục diễn ra sau khi lưu trong mongodb và là một quá trình trì hoãn. Một có thể kiểm tra sự kết thúc của quá trình lập chỉ mục bằng cách bắt sự kiện es-indexed.

```typescript
await doc.save();
/* Đang lập chỉ mục tài liệu */
doc.on('es-indexed', function (err, res) {
if (err) throw err;
/* Tài liệu đã được lập chỉ mục */
});
```

### Xóa một tài liệu

Việc xóa một tài liệu, hoặc hủy lập chỉ mục, diễn ra khi một tài liệu bị xóa bằng cách gọi `.remove()` trên một thể hiện Document của mongoose. Một có thể kiểm tra sự kết thúc của quá trình hủy lập chỉ mục bằng cách bắt sự kiện es-removed.

```typescript
await doc.remove();
/* Đang hủy lập chỉ mục tài liệu trong nền */
doc.on('es-removed', function (err, res) {
if (err) throw err;
/* Tài liệu đã được hủy lập chỉ mục */
});
```

Lưu ý rằng việc sử dụng `Model.remove` không liên quan đến các tài liệu mongoose như đã được nêu trong [tài liệu](http://mongoosejs.com/docs/api.html#model_Model.remove). Do đó, điều sau đây sẽ không hủy lập chỉ mục tài liệu.

```typescript
await MyModel.remove({ _id: doc.id });
/* tài liệu vẫn còn trong cụm Elasticsearch */
```

### Lập chỉ mục các mô hình lồng nhau

Để lập chỉ mục các mô hình lồng nhau, bạn có thể tham khảo ví dụ sau.

```typescript
const Comment = new Schema({
title: String,
body: String,
author: String,
});

const User = new Schema({
name: { type: String, es_indexed: true },
email: String,
city: String,
comments: { type: [Comment], es_indexed: true },
});

User.plugin(mongoosastic);
```

### Kiểu dữ liệu lồng nhau của Elasticsearch

Vì mặc định trong Elasticsearch là lấy các mảng và làm phẳng chúng thành các đối tượng, điều này có thể gây khó khăn trong việc viết các truy vấn mà bạn cần duy trì mối quan hệ giữa các đối tượng trong mảng. Cách để thay đổi hành vi này là bằng cách thay đổi loại Elasticsearch từ `object` (mặc định của mongoosastic) thành `nested`.

```typescript
const Comment = new Schema({
title: String,
body: String,
author: String,
});

const User = new Schema({
name: { type: String, es_indexed: true },
email: String,
city: String,
comments: {
  type: [Comment],
  es_indexed: true,
  es_type: 'nested',
  es_include_in_parent: true,
},
});

User.plugin(mongoosastic);
```

### Lập chỉ mục tham chiếu mongoose

Để lập chỉ mục các tham chiếu mongoose, bạn có thể tham khảo ví dụ sau.

```typescript
const Comment = new Schema({
title: String,
body: String,
author: String,
});

const User = new Schema({
name: { type: String, es_indexed: true },
email: String,
city: String,
comments: {
  type: Schema.Types.ObjectId,
  ref: 'Comment',
  es_schema: Comment,
  es_indexed: true,
  es_select: 'title body',
},
});

User.plugin(mongoosastic, {
populate: [{ path: 'comments', select: 'title body' }],
});
```

Trong schema, bạn cần cung cấp trường `es_schema` - schema được tham chiếu. Mặc định, mọi trường của schema được tham chiếu sẽ được ánh xạ. Sử dụng trường `es_select` để chỉ định các trường cụ thể.

`populate` là một mảng các đối tượng tùy chọn mà bạn thường truyền cho [Model.populate](http://mongoosejs.com/docs/api.html#model_Model.populate).

### Lập chỉ mục một bộ sưu tập hiện có

Bạn đã có một bộ sưu tập mongodb mà bạn muốn lập chỉ mục bằng plugin này? Không vấn đề gì! Chỉ cần gọi phương thức synchronize trên mô hình của bạn để mở một luồng mongoose và bắt đầu lập chỉ mục các tài liệu một cách riêng lẻ.

```typescript
const BookSchema = new Schema({
title: String,
});
BookSchema.plugin(mongoosastic);

const Book = mongoose.model('Book', BookSchema),
stream = Book.synchronize(),
count = 0;

stream.on('data', function (err, doc) {
count++;
});
stream.on('close', function () {
console.log('đã lập chỉ mục ' + count + ' tài liệu!');
});
stream.on('error', function (err) {
console.log(err);
});
```

Bạn cũng có thể đồng bộ hóa một tập hợp con của các tài liệu dựa trên một truy vấn!

```typescript
const stream = Book.synchronize({ author: 'Arthur C. Clarke' });
```

Cũng như chỉ định các tùy chọn đồng bộ hóa.

```typescript
const stream = Book.synchronize({}, { saveOnSynchronize: true });
```

Các tùy chọn là:

- `saveOnSynchronize` - kích hoạt phương thức lưu Mongoose (và phương thức trước khi lưu) khi đồng bộ hóa một bộ sưu tập/chỉ mục. Mặc định là tùy chọn `saveOnSynchronize` toàn cầu.

### Lập chỉ mục hàng loạt

Bạn cũng có thể chỉ định các tùy chọn `bulk` với mongoose, điều này sẽ sử dụng API lập chỉ mục hàng loạt của Elasticsearch. Điều này sẽ khiến phương thức `synchronize` sử dụng lập chỉ mục hàng loạt.

Mongoosastic sẽ chờ 1 giây (hoặc độ trễ được chỉ định) cho đến khi nó có 1000 tài liệu (hoặc kích thước được chỉ định) và sau đó thực hiện lập chỉ mục hàng loạt.

```typescript
BookSchema.plugin(mongoosastic, {
bulk: {
  size: 10, // số lượng tài liệu ưa thích để lập chỉ mục hàng loạt
  delay: 100, //milliseconds để chờ đủ tài liệu đáp ứng điều kiện kích thước
},
});
```

### Lập chỉ mục theo điều kiện

Bạn có thể chỉ định một hàm lọc để lập chỉ mục một mô hình vào Elasticsearch dựa trên một số điều kiện cụ thể.

Hàm lọc phải trả về True cho các điều kiện mà sẽ bỏ qua việc lập chỉ mục vào Elasticsearch.

```typescript
const MovieSchema = new Schema({
title: { type: String },
genre: { type: String, enum: ['horror', 'action', 'adventure', 'other'] },
});

MovieSchema.plugin(mongoosastic, {
filter: function (doc) {
  return doc.genre === 'action';
},
});
```

Các thể hiện của mô hình Movie có genre là 'action' sẽ không được lập chỉ mục vào Elasticsearch.

### Lập chỉ mục theo yêu cầu

Bạn có thể thực hiện lập chỉ mục theo yêu cầu bằng cách sử dụng hàm `index`.

```typescript
const dude = Dude.findOne({ name: 'Jeffrey Lebowski' });
dude.awesome = true;
dude
.index()
.then((res) => {
  console.log("Ôi không! Tôi đã được lập chỉ mục!");
})
.catch((err) => {
  console.error('lỗi trong lập chỉ mục');
});
```

Phương thức index nhận 2 đối số:

- `options` (tùy chọn) - {index, type} - chỉ mục và loại để công bố. Mặc định là chỉ mục và loại tiêu chuẩn mà mô hình đã được thiết lập.
- `callback` - hàm callback sẽ được gọi khi tài liệu đã được lập chỉ mục.

Lưu ý rằng việc lập chỉ mục một mô hình không có nghĩa là nó sẽ được lưu vào mongodb. Sử dụng lưu cho điều đó.

### Xóa chỉ mục theo yêu cầu

Bạn có thể xóa một tài liệu khỏi cụm Elasticsearch bằng cách sử dụng hàm `unIndex`.

```typescript
doc.unIndex(function (err) {
console.log("Tôi đã bị xóa khỏi cụm :(");
});
```

Phương thức unIndex nhận 2 đối số:

- `options` (tùy chọn) - {index, type} - chỉ mục và loại để công bố. Mặc định là chỉ mục và loại tiêu chuẩn mà mô hình đã được thiết lập.
- `callback` - hàm callback sẽ được gọi khi mô hình đã được hủy lập chỉ mục.

### Cắt ngắn một chỉ mục

Phương thức tĩnh `esTruncate` sẽ xóa tất cả các tài liệu khỏi chỉ mục liên quan. Phương thức này kết hợp với `synchronize()` có thể hữu ích trong trường hợp kiểm thử tích hợp, ví dụ khi mỗi trường hợp thử nghiệm cần một chỉ mục được làm sạch trong Elasticsearch.

```typescript
GarbageModel.esTruncate(function(err) {...
});
```

### Hạn chế

#### Tự động lập chỉ mục

Mongoosastic-ts cố gắng tự động lập chỉ mục tài liệu thay cho tính năng [middleware](http://mongoosejs.com/docs/middleware.html) của mongoose.

Mongoosastic-ts sẽ tự động lập chỉ mục khi `document.save`/`Model.findOneAndUpdate`/`Model.insertMany`/`document.remove`/`Model.findOneAndRemove`, nhưng không bao gồm `Model.remove`/`Model.update`.

Và bạn nên có tùy chọn `new: true` khi `findOneAndUpdate` để mongoosastic-ts có thể lấy giá trị mới trong hook sau.

#### Tìm kiếm ngay sau sự kiện es-indexed

> Elasticsearch mặc định làm mới mỗi shard mỗi giây, vì vậy tài liệu sẽ có sẵn để tìm kiếm sau 1 giây kể từ khi lập chỉ mục.

Sự kiện `es-indexed` có nghĩa là elasticsearch đã nhận yêu cầu lập chỉ mục, và nếu bạn muốn tìm kiếm tài liệu, hãy thử sau 1 giây. Xem [Tài liệu không tìm thấy ngay sau khi được lưu](https://github.com/elastic/elasticsearch-js/issues/231)

## Mapping

Các schema có thể được cấu hình để có các tùy chọn đặc biệt cho từng trường. Những điều này tương ứng với các [cấu hình ánh xạ trường hiện có](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html) được định nghĩa bởi Elasticsearch với sự khác biệt duy nhất là tất cả đều được tiền tố bằng "es_".

> Boost đã bị loại bỏ trong Elasticsearch 8, ví dụ dưới đây là cho phiên bản < 8

Vì vậy, ví dụ. Nếu bạn muốn lập chỉ mục một mô hình sách và có boost cho tiêu đề được đặt thành 2.0 (đưa nó vào ưu tiên cao hơn khi tìm kiếm), bạn sẽ định nghĩa nó như sau:

```typescript
const BookSchema = new Schema({
title: { type: String },
author: { type: String, es_null_value: 'Unknown Author' },
publicationDate: { type: Date, es_type: 'date' },
});
```

Ví dụ này sử dụng một vài trường ánh xạ khác... chẳng hạn như null_value và type (thay thế giá trị kiểu schema). 

Có nhiều tùy chọn ánh xạ