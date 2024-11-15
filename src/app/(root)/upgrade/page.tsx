import React from 'react';
import { Button, Table } from 'antd';

const UpgradeAccount: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      feature: 'Thời hạn sử dụng',
      basic: 'Vĩnh viễn',
      verified: 'Vĩnh viễn',
      pro: '1 tháng',
    },
    {
      key: '2',
      feature: 'Số lượng CV',
      basic: '6',
      verified: '6',
      pro: '12',
    },
    {
      key: '3',
      feature: 'Số lượng Cover Letter',
      basic: '6',
      verified: '6',
      pro: '12',
    },
    {
      key: '4',
      feature: 'Thời gian chờ khi tải CV và Cover Letter',
      basic: '5s',
      verified: '5s',
      pro: '3s',
    },
    {
      key: '5',
      feature: 'Ưu tiên đẩy Top hiển thị với NTD',
      basic: '—',
      verified: '—',
      pro: '1 lần/ngày',
    },
    {
      key: '6',
      feature: 'Biểu tượng xác minh tài khoản',
      basic: '—',
      verified: '—',
      pro: '✔️',
    },
    {
      key: '7',
      feature: 'Sử dụng mẫu CV Cao Cấp',
      basic: '—',
      verified: '—',
      pro: '✔️',
    },
    {
      key: '8',
      feature: 'Sử dụng mẫu Cover Letter Cao Cấp',
      basic: '—',
      verified: '—',
      pro: '✔️',
    },
    {
      key: '9',
      feature: 'Gửi quà tặng từ đối tác GitHub',
      basic: '—',
      verified: '—',
      pro: '✔️',
    },
    {
      key: '10',
      feature: 'Tài khoản PRO trị giá 299K',
      basic: '—',
      verified: '—',
      pro: '✔️',
    },
    {
      key: '11',
      feature: 'Khoá học Tin học VP: Word / Excel / Power Point',
      basic: '—',
      verified: '—',
      pro: '✔️',
    },
  ];

  const columns = [
    {
      title: 'Loại tài khoản',
      dataIndex: 'feature',
      key: 'feature',
    },
    {
      title: 'Thường',
      dataIndex: 'basic',
      key: 'basic',
    },
    {
      title: 'Pro',
      dataIndex: 'pro',
      key: 'pro',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-green-500">Nâng Cấp Tài Khoản</h2>
        <p className="text-lg text-gray-600">Mở khóa nhiều quyền lợi hơn</p>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        size="middle"
      />

      <div className="mt-8 flex justify-center">
        <Button type="primary" size="large">Nâng Cấp lên Pro</Button>
      </div>
    </div>
  );
};

export default UpgradeAccount;
