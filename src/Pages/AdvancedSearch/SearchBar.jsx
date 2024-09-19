

const SearchBar = () => {
    return (
        <div className="bg-[#A7794B] min-h-screen flex justify-center items-center">
            <div className="bg-[#F8F8F8] h-80 w-[600px] flex flex-col justify-center items-center rounded-lg shadow-lg">
                <div className="mb-4 pt-8">
                    <h4 className="text-[#A7794B] text-2xl noto font-bold mb-4">Explore According to Your Preferences!</h4>
                </div>

                <form className="w-full px-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Job Name..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                           
                        </div>

                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="City..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                           
                        </div>

                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Job Type..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                            
                        </div>

                        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Experience Level..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>

                        <div className="col-span-2 flex items-center bg-white rounded-full shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Salary Range..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#A7794B] text-white rounded-full px-6 py-2 shadow-md hover:bg-[#8c6639] transition duration-200"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBar;