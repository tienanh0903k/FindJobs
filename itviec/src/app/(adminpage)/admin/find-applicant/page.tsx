'use client';

import React, { useState } from 'react';
import { Input, Button, Select, Tag, Avatar, List } from 'antd';
import { SearchOutlined, LockOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { MainResume } from '@/components/client/Resumes'; // Nếu export default thì không cần { }
import { message } from 'antd';
import { useEffect } from 'react';
import userApi from '@/api/userApi';
import { IUser, IUserResume } from '@/app/types/interface';
const { Option } = Select;



export default function FindApplicantPage() {
  const [applicants, setApplicants] = useState<IUser[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchApplicants = async (params = { page: 1, limit: 10 }) => {
    setLoading(true);
    try {
      const res = await userApi.getCandidates(params);
      setApplicants(res.results);
      setTotal(res.total);
      setSelectedId(res.results?.[0]?._id); // auto select đầu tiên
    } catch (e: any) {
      message.error('Không lấy được danh sách ứng viên');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants({ page, limit: 10 });
  }, [page]);

  const selectedApplicant = applicants.find(item => item._id === selectedId) || applicants[0];

  return (
    <div style={{ padding: 24 }}>
      {/* Tìm kiếm, lọc */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <Input
          placeholder="Vị trí cần tuyển"
          style={{ width: 260 }}
          prefix={<SearchOutlined />}
        />
        <Select defaultValue="Toàn quốc" style={{ width: 180 }}>
          <Option value="Toàn quốc">Toàn quốc</Option>
          <Option value="Hà Nội">Hà Nội</Option>
          <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
        </Select>
        <Button type="default">Bộ lọc</Button>
        <Button type="primary" icon={<SearchOutlined />}>Tìm kiếm</Button>
      </div>

      <div className="flex gap-4" style={{ minHeight: 550 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 10,
            padding: 4,
            width: 320,
            boxShadow: '0 2px 8px #f0f1f2',
            maxHeight: 550,
            overflowY: 'auto',
          }}
        >
          <div style={{ fontWeight: 500, marginBottom: 12 }}>
            {applicants.length.toLocaleString()} ứng viên
            <span style={{ float: 'right', color: '#888', fontSize: 13 }}>Cập nhật mới nhất</span>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={applicants}
            renderItem={item => (
              <List.Item
                className={item._id === selectedId ? 'bg-blue-100 rounded' : ''}
                style={{ cursor: 'pointer', padding: 10 }}
                onClick={() => setSelectedId(item._id)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar size={36} style={{ background: '#bdbdbd' }}>
                      {item.avatar}
                    </Avatar>
                  }
                  title={
                    <span>
                      <b>{item.userName}</b> <span style={{ color: '#888' }}>(2000)</span>
                      {/* {item.active && (
                        <Tag color="orange" style={{ marginLeft: 6 }}>Tích cực tìm việc</Tag>
                      )} */}
                      <Tag color="orange" style={{ marginLeft: 6 }}>Tích cực tìm việc</Tag>
                    </span>
                  }
                  description={
                    <div>
                      <div>{item.currentPosition}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>
                        {item.workExperience?.length || 'Chưa cập nhật'} năm kinh nghiệm
                      </div>
                    </div>
                  }
                />
                {/* {item. === 'Đã xem' && (
                  <Tag color="blue" style={{ marginLeft: 8 }}>Đã xem</Tag>
                )} */}
              </List.Item>
            )}
          />
        </div>

        <div
          style={{
            flex: 1,
            background: '#fff',
            borderRadius: 10,
            padding: 24,
            minHeight: 550,
            boxShadow: '0 2px 8px #f0f1f2',
          }}
        >
          {/* Thông tin cơ bản */}
          <div className="flex flex-row items-center gap-4">
            <Avatar size={80} style={{ background: '#bdbdbd', fontSize: 36 }}>
              {selectedApplicant?.userName?.[0]}
            </Avatar>
            <div>
              <div style={{ fontWeight: 700, fontSize: 22 }}>{selectedApplicant?.userName}</div>
              <div style={{ fontSize: 15, marginBottom: 8 }}>{selectedApplicant?.currentPosition}</div>
              {/* <div style={{ color: '#999' }}>Hoạt động {selectedApplicant?.lastActive}</div> */}
            </div>
            <div className="flex-1" />
            <Button type="text" icon={<HeartOutlined />} />
            <Button type="text" icon={<ShareAltOutlined />} />
            <Button type="primary" style={{ marginLeft: 12, background: '#7e48ff' }}>
              Mua thông tin liên hệ
            </Button>
          </div>

          <div style={{ marginTop: 18, marginBottom: 12, display: 'flex', gap: 40 }}>
            <div>
              <div style={{ color: '#888', fontSize: 13 }}>Số điện thoại</div>
              <LockField />
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 13 }}>Email</div>
              <LockField />
            </div>
            {/* <div>
              <div style={{ color: '#888', fontSize: 13 }}>Tình trạng hôn nhân</div>
              <span>{selectedApplicant?.married}</span>
            </div>
            <div>
              <div style={{ color: '#888', fontSize: 13 }}>Tỉnh / Thành phố</div>
              <span>{selectedApplicant?.city}</span>
            </div> */}
          </div>

          {/* Thông tin chi tiết */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 mt-4 mb-2" style={{ fontSize: 15 }}>
            <InfoRow label="Trình độ học vấn" value="Đại học" />
            <InfoRow label="Số năm kinh nghiệm" value="1 năm" />
            <InfoRow label="Ngày sinh & Giới tính" value="nam" />
            <InfoRow label="Cấp bậc hiện tại" value={selectedApplicant?.currentPosition} />
            <InfoRow label="Mức lương mong muốn" value={selectedApplicant?.balance.toString()} />
            <InfoRow label="Cấp bậc mong muốn" value={selectedApplicant?.currentPosition} />
            <InfoRow label="Địa điểm làm việc mong muốn" value={selectedApplicant?.address} />
            <InfoRow label="Nghề nghiệp" value={selectedApplicant?.skills?.join(', ')} />
          </div>

          <div style={{ marginTop: 32 }}>
            <h2 className="text-xl font-bold mb-3">CV chi tiết</h2>
            <div
              className="resume-scroll"
              style={{
                background: '#f6f8fa',
                boxShadow: '0 2px 12px #e6e6e6',
                padding: 24,
                border: '1.5px solid #e0e0e0',
                maxHeight: 500,
                overflowY: 'auto',
                minHeight: 240,
                transition: 'box-shadow 0.2s',
              }}
            >
              <MainResume userData={selectedApplicant} showContact={false} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

// Component nhỏ render dòng thông tin
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ color: '#888', fontSize: 13 }}>{label}</span>
      <div style={{ fontWeight: 500 }}>{value}</div>
    </div>
  );
}

// Component hiển thị thông tin đã ẩn
function LockField() {
  return (
    <span style={{ color: '#7e48ff', fontWeight: 500 }}>
      <LockOutlined /> Thông tin đã ẩn
    </span>
  );
}
