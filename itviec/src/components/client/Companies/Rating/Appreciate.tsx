// import React, { useEffect, useState } from 'react';
// import Overall from './Overall';
// import { Button, Select, Input, Rate, Form } from 'antd';
// import useModal from '@/hook/useModal';
// import ModalGlobal from '@/components/base/ModalGlobal';
// import { useAppSelector } from '@/hook/useSelector';
// import { RootState } from '@/redux/store';
// import AccessSection from '@/components/base/AccessSection';
// import { reviewApi } from '@/api/reviewApi';
// import ReviewItem from '../Review/ReviewItem';

// const { Option } = Select;
// const { TextArea } = Input;

// const Appreciate = ({ targetId }: { targetId: string }) => {
// 	const user = useAppSelector((state: RootState) => state.auth.currentUser?.user);
// 	const [form] = Form.useForm();
// 	const { visible, openModal, closeModal } = useModal();

// 	const [stats, setStats] = useState<any>(null);
// 	const [reviews, setReviews] = useState<any[]>([]);

// 	const fetchStats = async () => {
// 		try {
// 			const data = await reviewApi.getReviewStats(targetId);
// 			setStats(data);
// 		} catch (error) {
// 			console.error('Error fetching review stats:', error);
// 		}
// 	};

// 	const fetchReviews = async () => {
// 		try {
// 			const data = await reviewApi.getReviews(targetId);
// 			console.log('d--------ata', data);
// 			setReviews(Array.isArray(data) ? data : []); 
// 		} catch (error) {
// 			console.error('Error fetching reviews:', error);
// 			setReviews([]);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchStats();
// 		fetchReviews();
// 	}, [targetId]);

// 	const handleSubmit = async (values: any) => {
// 		try {
// 			const dataToSend = {
// 				companyId: targetId,
// 				rating: values.rating,
// 				comment: values.content,
// 				// nếu backend có title thì truyền thêm: title: values.title,
// 			};

// 			await reviewApi.createReview(dataToSend);

// 			alert('Gửi đánh giá thành công!');
// 			closeModal();
// 			form.resetFields();
// 			fetchStats();
// 			fetchReviews();
// 		} catch (error) {
// 			alert('Lỗi khi gửi đánh giá, vui lòng thử lại.');
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<div className="p-4space-x-1">
// 			<Overall
// 				average={stats?.average || 0}
// 				totalReviews={stats?.totalReviews || 0}
// 				counts={stats?.counts || [0, 0, 0, 0, 0]}
// 			/>

// 			<div className="mt-4">
// 				<div className="flex justify-between">
// 					<h2 className="text-xl font-normal mb-2 space-x-1">Tất cả đánh giá</h2>
// 					<AccessSection user={user} onAllowed={openModal}>
// 						<Button type="primary">Viết đánh giá</Button>
// 					</AccessSection>
// 				</div>
// 				<div className="text-right my-2">
// 					<Select defaultValue="latest" style={{ minWidth: 'auto' }}>
// 						<Option value="latest">Mới nhất</Option>
// 						<Option value="highest">Cũ nhất</Option>
// 					</Select>
// 				</div>

// 				<hr className="border border-gray-100" />

// 				{Array.isArray(reviews) && reviews.length === 0 ? (
// 					<div>Chưa có đánh giá nào.</div>
// 				) : (
// 					Array.isArray(reviews) && reviews.map((review, idx) => (
// 						<ReviewItem key={review._id || idx} review={review} />
// 					))
// 				)}
// 			</div>

// 			<ModalGlobal visible={visible} close={closeModal} title="Viết đánh giá">
// 				<Form layout="horizontal" form={form} onFinish={handleSubmit}>
// 					<Form.Item
// 						label="Tiêu đề"
// 						name="title"
// 						rules={[{ required: false }]}
// 					>
// 						<Input placeholder="Nhập tiêu đề đánh giá (tuỳ chọn)" />
// 					</Form.Item>
// 					<Form.Item
// 						label="Nội dung"
// 						name="content"
// 						rules={[{ required: true, message: 'Vui lòng nhập nội dung đánh giá' }]}
// 					>
// 						<TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
// 					</Form.Item>
// 					<Form.Item
// 						label="Đánh giá"
// 						name="rating"
// 						rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
// 					>
// 						<Rate />
// 					</Form.Item>
// 					<Form.Item>
// 						<Button type="primary" htmlType="submit">
// 							Gửi đánh giá
// 						</Button>
// 					</Form.Item>
// 				</Form>
// 			</ModalGlobal>
// 		</div>
// 	);
// };

// export default Appreciate;


import React, { useEffect, useState } from 'react';
import Overall from './Overall';
import { Button, Select, Input, Rate, Form } from 'antd';
import useModal from '@/hook/useModal';
import ModalGlobal from '@/components/base/ModalGlobal';
import { useAppSelector } from '@/hook/useSelector';
import { RootState } from '@/redux/store';
import AccessSection from '@/components/base/AccessSection';
import { reviewApi } from '@/api/reviewApi';
import ReviewItem from '../Review/ReviewItem';

const { Option } = Select;
const { TextArea } = Input;

const Appreciate = ({ targetId }: { targetId: string }) => {
  const user = useAppSelector((state: RootState) => state.auth.currentUser?.user);
  const [form] = Form.useForm();
  const { visible, openModal, closeModal } = useModal();

  const [stats, setStats] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchStats = async () => {
    try {
      const data = await reviewApi.getReviewStats(targetId);
      setStats(data);
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewApi.getReviews(targetId);
      setReviews(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchReviews();
  }, [targetId]);

  const handleSubmit = async (values: any) => {
    try {
      const dataToSend = {
        companyId: targetId,
        rating: values.rating,
        comment: values.content,
      };

      await reviewApi.createReview(dataToSend);

      alert('Gửi đánh giá thành công!');
      closeModal();
      form.resetFields();
      fetchStats();
      fetchReviews();
    } catch (error) {
      alert('Lỗi khi gửi đánh giá, vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-x-1">
      <Overall
        average={stats?.average || 0}
        totalReviews={stats?.totalReviews || 0}
        counts={stats?.counts || [0, 0, 0, 0, 0]}
      />

      <div className="mt-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-normal mb-2 space-x-1">Tất cả đánh giá</h2>
          <AccessSection user={user} onAllowed={openModal}>
            <Button type="primary">Viết đánh giá</Button>
          </AccessSection>
        </div>
        <div className="text-right my-2">
          <Select defaultValue="latest" style={{ minWidth: 'auto' }}>
            <Option value="latest">Mới nhất</Option>
            <Option value="highest">Cũ nhất</Option>
          </Select>
        </div>

        <hr className="border border-gray-100" />

        {Array.isArray(reviews) && reviews.length === 0 ? (
          <div>Chưa có đánh giá nào.</div>
        ) : (
          reviews.map((review, idx) => (
            <ReviewItem key={review._id || idx} review={review} />
          ))
        )}
      </div>

      <ModalGlobal visible={visible} close={closeModal} title="Viết đánh giá">
        <Form layout="horizontal" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: false }]}
          >
            <Input placeholder="Nhập tiêu đề đánh giá (tuỳ chọn)" />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung đánh giá' }]}
          >
            <TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi đánh giá
            </Button>
          </Form.Item>
        </Form>
      </ModalGlobal>
    </div>
  );
};

export default Appreciate;
