
import { IPost } from "@/app/types/interface";

// const ItemJobs = () => {
//   return (
//     <div className="relative backdrop-blur-md bg-white/30 border border-gray-200 rounded-lg p-6 shadow-lg flex flex-col space-y-4">
//       <div className="flex justify-between items-start">
//         <h2 className="text-xl font-semibold text-gray-900">Middle/Senior Java Developer</h2>
//         <span className="text-white bg-orange-500 px-2 py-1 text-sm rounded">HOT</span>
//       </div>
      
//       <div className="flex items-center space-x-2 mt-4">
//         <img 
//           src="https://dummyimage.com/40x40/000/fff&text=MoMo" 
//           alt="Company Logo" 
//           className="w-10 h-10 rounded"
//         />
//         <a href="#" className="text-blue-600 font-medium">M_Service (MoMo)</a>
//       </div>
      
//       <div className="text-gray-700 mt-4">
//         <p>Đăng nhập để xem mức lương</p>
//       </div>
      
//       <div className="flex items-center text-gray-700 mt-4">
//         <p className="mr-2"><i className="fas fa-map-marker-alt"></i> Tại văn phòng</p>
//         <p>Ho Chi Minh - Ha Noi</p>
//       </div>
      
//       <div className="flex space-x-2 mt-4">
//         <span className="bg-white/30 border border-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full">Java</span>
//         <span className="bg-white/30 border border-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full">Spring</span>
//         <span className="bg-white/30 border border-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full">MySQL</span>
//       </div>
//     </div>
//   )
// }

// export default ItemJobs

interface ItemJobsProps {
  job?: IPost;  // Nhận prop 'job' với kiểu IPost
}
const ItemJobs = ({job} : ItemJobsProps) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-300 shadow-md p-4 m-4 bg-white transition-all hover:shadow-xl hover:border-blue-500 hover:bg-gray-50 hover:cursor-pointer ">
      <div className="flex items-center mb-4">
        <img
          src={job.companyId.logo || "https://via.placeholder.com/150"}
          alt="Logo công ty"
          className="w-12 h-12 object-cover"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 hover:cursor-pointer">
            {job.position}
            <span className="text-white bg-orange-500 px-2 py-1 text-sm rounded">HOT</span>
          </h3>
          <p className="text-gray-600 line-clamp-1">
            {job.companyId.name}  
          </p>  
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{job.salary}</p>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>  
    </div>
  );
}


export default ItemJobs;