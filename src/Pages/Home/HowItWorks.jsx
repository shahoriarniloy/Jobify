import { FaUserPlus, FaFileUpload, FaSearch, FaClipboardCheck } from 'react-icons/fa';
import { SiLibreofficewriter } from "react-icons/si";
import arrow1 from '../../assets/arrow1.png'
import arrow2 from '../../assets/arrow2.png'

const HowItWorks = () => {
  return (
    <div className='bg-secondary'>
      <div className='py-[100px] container mx-auto '>
        <h1 className='text-3xl font-semibold mb-2 tracking-wider text-black text-center '>How Jobify work</h1>
        {/* <div className="flex justify-between items-center  gap-12 text-center mt-16"> */}
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4  gap-12 text-center mt-16 ">
          <div className="flex flex-col justify-center items-center max-w-xs gap-3 relative">
            <div className='p-6 rounded-full bg-white flex justify-center items-center'>

              <FaUserPlus className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Create account</h3>
              <p className="text-gray-500">Aliquam facilisis egestas sapien, nec tempor leo tristique at.</p>
            </div>
            <div className='absolute -right-[50%] top-0 hidden lg:block'>
              <img src={arrow1} alt="" />
            </div>
          </div>


          <div className="flex flex-col justify-center items-center max-w-xs gap-3 bg-white p-6 rounded-2xl">
            <div className='p-6 rounded-full bg-[#0A65CC] flex justify-center items-center'>
              <SiLibreofficewriter className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Build Resume</h3>
              <p className="text-gray-500">Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales</p>
            </div>
          </div>


          <div className="flex flex-col justify-center items-center max-w-xs gap-3 relative">
            <div className='p-6 rounded-full bg-white flex justify-center items-center'>

              <FaSearch className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Find suitable job</h3>
              <p className="text-gray-500">Phasellus quis eleifend ex. Morbi nec fringilla nibh.</p>
            </div>
            <div className='absolute -right-[50%] top-0 hidden lg:block'>
              <img src={arrow1} alt="" />
            </div>
          </div>


          <div className="flex flex-col justify-center items-center max-w-xs gap-3">
            <div className='p-6 rounded-full bg-white flex justify-center items-center'>

              <FaClipboardCheck className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 ">Apply job</h3>
              <p className="text-gray-500">Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.</p>
            </div>
          </div>

          {/* arrow section */}
          <div className='absolute hidden lg:block'>
            <img src={arrow2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
