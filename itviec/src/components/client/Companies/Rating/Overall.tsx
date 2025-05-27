import React from 'react';
import { Progress, Rate } from 'antd';

interface OverallProps {
  average: number;
  totalReviews: number;
  counts: number[]; // [count1star, count2star, count3star, count4star, count5star]
}

const Overall: React.FC<OverallProps> = ({ average, totalReviews, counts }) => {
  // Tính % từng sao
  const reviews = [1, 2, 3, 4, 5].map((star, i) => {
    const count = counts[star - 1] ?? 0; // Đảo ngược cho đúng thứ tự 5->1
    const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percent };
  });

  return (
    <>
      <h2 className="text-xl font-bold text-black mb-4">TỔNG QUAN</h2>
      <div className="flex flex-row gap-6 items-start">
        
        <div className="flex flex-col justify-center items-center w-40">
          <span className="text-4xl font-bold text-gray-700">{average?.toFixed(1) ?? '--'}</span>
          <Rate allowHalf value={average ?? 0} disabled />
          <p className="text-sm text-gray-600 mt-2">{totalReviews ?? 0} đánh giá</p>
        </div>

        <div className="flex-1">
          {reviews.map((review) => (
            <div key={review.star} className="flex items-center mb-2">
              <span className="w-8 text-gray-600">{review.star}★</span>
              <Progress
                percent={review.percent}
                showInfo={false}
                className="flex-1"
                strokeColor="#FFA500"
              />
              <span className="ml-2 text-gray-600 min-w-[30px] text-right">{review.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overall;













// import React from 'react';
// import { Progress, Rate } from 'antd';

// const Overall = () => {
//     const reviews = [
//         { stars: 5, percentage: 20 },
//         { stars: 4, percentage: 37 },
//         { stars: 3, percentage: 34 },
//         { stars: 2, percentage: 8 },
//         { stars: 1, percentage: 1 },
//     ];

//     return (
//         <>
//             <h2 className="text-xl font-bold text-black mb-4">TỔNG QUAN</h2>
//             <div className="flex flex-row justify-between items-start">
//                 <div className="flex w-2/3">
//                     <div className="flex flex-col justify-center items-center gap-2 w-1/2 mb-4">
//                         <span className="ml-2 text-4xl font-bold text-gray-700">3.7</span>
//                         <Rate allowHalf defaultValue={3.7} disabled />
//                         <p className="text-sm text-gray-600 mb-4">1935 reviews</p>
//                     </div>
//                     <div className='w-1/2'>
//                         {reviews.map((review) => (
//                             <div key={review.stars} className="flex items-center mb-2">
//                                 <span className="w-6 text-gray-600">{review.stars}★</span>
//                                 <Progress
//                                     percent={review.percentage}
//                                     showInfo={false}
//                                     className="flex-grow"
//                                     strokeColor="#FFA500"
//                                 />
//                                 <span className="ml-2 text-gray-600">{review.percentage}%</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="w-1/3 flex flex-col items-center">
//                     <Progress
//                         type="circle"
//                         percent={82}
//                         strokeColor="#52C41A"
//                         format={() => '82%'}
//                     />
//                     <p className="text-sm text-gray-700 mt-2 text-center">
//                         Recommend working here to a friend
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Overall;
