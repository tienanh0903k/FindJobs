'use client';
import categoryApi from '@/api/categoryApi';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { JobSlide } from '../Home';
import { IPost } from '@/app/types/interface';

const LOCATION_OPTIONS = [
  { id: 'hn', name: 'Hà Nội' },
  { id: 'hcm', name: 'Hồ Chí Minh' },
  { id: 'dn', name: 'Đà Nẵng' },
  { id: 'ct', name: 'Cần Thơ' },
  { id: 'hp', name: 'Hải Phòng' },
  { id: 'bd', name: 'Bình Dương' },
  { id: 'dna', name: 'Đồng Nai' },
  { id: 'qn', name: 'Quảng Ninh' },
  { id: 'tth', name: 'Huế' },
  { id: 'vl', name: 'Vĩnh Long' },
  { id: 'nt', name: 'Nha Trang' },
  { id: 'py', name: 'Phú Yên' },
  { id: 'dl', name: 'Đắk Lắk' },
  { id: 'pt', name: 'Phan Thiết' },
  { id: 'tb', name: 'Thái Bình' },
];

export default function JobHeader({jobs, onFilterChange }: { jobs?: IPost[], onFilterChange?: (filter: string, value: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedFilter, setSelectedFilter] = useState('category'); // Mặc định là ngành IT
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [categoryOptions, setCategoryOptions] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        // Đảm bảo key là id và name
        setCategoryOptions(response.data.map((c: any) => ({
          id: c._id || c.id, // phòng trường hợp backend trả về _id hoặc id
          name: c.name,
        })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
//jobs:
//   {
// 	"_id": {
// 	  "$oid": "671a6889f3ef7fe71c07d72c"
// 	},
// 	"position": "Junior React",
// 	"description": "Công ty ABC đang tìm kiếm một Kỹ sư phần mềm có năng lực để phát triển và duy trì các ứng dụng web và di động. Bạn sẽ tham gia vào toàn bộ quy trình phát triển phần mềm, từ phân tích yêu cầu đến thiết kế, lập trình và kiểm thử.\n\n**Mô tả công việc:**\n- Phát triển các ứng dụng web và di động.\n- Tối ưu hóa hiệu suất và tính khả dụng của ứng dụng.\n- Tham gia vào việc bảo trì và cập nhật phần mềm.\n- Hợp tác với các bộ phận khác để đảm bảo tính đồng bộ và hiệu suất của hệ thống.\n\n**Yêu cầu:**\n- Có ít nhất 2 năm kinh nghiệm làm việc trong lĩnh vực phát triển phần mềm.\n- Thành thạo các ngôn ngữ lập trình như JavaScript, TypeScript, hoặc Python.\n- Kinh nghiệm với các framework như React hoặc Angular là một lợi thế.\n- Kỹ năng làm việc nhóm tốt và khả năng giao tiếp hiệu quả.",
// 	"requirements": "Có kinh nghiệm làm việc với React và Node.js.",
// 	"companyName": "Công ty ABC",
// 	"location": "Hà Nội",
// 	"salary": "10 triệu - 15 triệu",
// 	"workingHours": "Toàn thời gian",
// 	"deadline": {
// 	  "$date": "2024-12-31T00:00:00.000Z"
// 	},
// 	"contactInfo": "hr@abc.com",
// 	"status": "Đang tuyển",
// 	"postedDate": {
// 	  "$date": "2024-10-24T00:00:00.000Z"
// 	},
// 	"experience": "2 năm",
// 	"numberOfPositions": 3,
// 	"tags": [
// 	  "Kỹ thuật",
// 	  "Lập trình",
// 	  "Toàn thời gian"
// 	],
// 	"isHot": true,
// 	"companyId": "671212ced248ea19f1385cd8",
// 	"userId": "66d9e651527b266d82753ebd",
// 	"__v": 0,
// 	"level": "Junior",
// 	"categories": [
// 	  "frontend"
// 	]
//   }

const filteredJobs = useMemo(() => {
	if (!jobs) return [];
	// Nếu chưa chọn filter, trả về tất cả jobs (hiện hết)
	if (!selectedOption) return jobs;
	if (selectedFilter === 'category') {
	  return jobs.filter(
		(job) =>
		  Array.isArray(job.categories) &&
		  job.categories.includes(selectedOption)
	  );
	}
	if (selectedFilter === 'location') {
	  return jobs.filter(
		(job) => job.location === selectedOption
	  );
	}
	return jobs;
  }, [jobs, selectedOption, selectedFilter]);

  console.log('filteredJobs', filteredJobs);

  // Tạo FILTERS động
  const FILTERS = [
    {
      label: 'Danh mục',
      key: 'category',
      options: categoryOptions,
    },
    {
      label: 'Địa điểm',
      key: 'location',
      options: LOCATION_OPTIONS,
    },
  ];

  const currentFilter = FILTERS.find(f => f.key === selectedFilter);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
	console.log('selectedFilter', id);
    if (onFilterChange) onFilterChange(selectedFilter, id);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h1 className="text-[#00a14b] font-semibold text-lg sm:text-xl md:text-2xl leading-tight">
          Việc làm tốt nhất
        </h1>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-[10px] sm:text-xs text-[#6b7280] font-semibold leading-none">
            Đề xuất bởi
          </span>
          <img
            src="https://storage.googleapis.com/a1aa/image/baf0528d-685c-4c5f-17d7-6d2ebf3cf65d.jpg"
            alt="TOPPYAI logo"
            className="h-7 w-auto"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        {/* Select loại filter */}
        <div className="relative w-[180px] sm:w-[220px]">
          <select
            aria-label="Chọn loại lọc"
            name="filter-type"
            value={selectedFilter}
            onChange={e => setSelectedFilter(e.target.value)}
            className="appearance-none w-full border border-[#d1d5db] rounded-md py-2 pl-3 pr-8 text-sm text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#00a14b] focus:border-[#00a14b]"
          >
            {FILTERS.map(f => (
              <option value={f.key} key={f.key}>{f.label}</option>
            ))}
          </select>
          <i className="fas fa-filter absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-xs pointer-events-none"></i>
          <i className="fas fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] text-xs pointer-events-none"></i>
        </div>

        {/* Arrow left */}
        <button
          aria-label="Previous"
          onClick={scrollLeft}
          className="border border-[#00a14b] text-[#00a14b] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d1f0d9] transition"
        >
			<ArrowLeftOutlined />
        </button>

        {/* Chỉ hiện option của filter đang chọn */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none max-w-[calc(100vw-300px)]"
        >
          {currentFilter?.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`rounded-full px-4 py-1 text-xs sm:text-sm font-semibold whitespace-nowrap
                ${selectedOption === option.id
                  ? 'bg-[#00a14b] text-white'
                  : 'bg-[#e5e7eb] text-[#374151] hover:bg-[#d1f0d9]'
                }
              `}
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* Arrow right */}
			  <button
				  aria-label="Next"
				  onClick={scrollRight}
				  className="border border-[#00a14b] text-[#00a14b] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d1f0d9] transition"
			  >
				  <ArrowRightOutlined />
			  </button>
		  </div>

		  <JobSlide posts={filteredJobs ?? []}/>
	  </div>
  );
}
