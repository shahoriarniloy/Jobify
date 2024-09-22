const SearchBar = () => {
    return (
        <div className=" min-h-screen flex justify-center items-center">
            <div className="bg-[#EFEDE8] h-[500px] w-[800px] flex flex-col justify-center items-center rounded-md shadow-lg">
                <div className="mb-4 pt-8">
                    <h4 className="text-[#8B4513] text-3xl font-semibold">Explore According to Your Preferences</h4>
                </div>

                <form className="w-full px-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center rounded-md border-2 border-[#8B4513] shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Job Name"
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>

                        <div className="flex items-center rounded-md border-2 border-[#8B4513] shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="City..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>

                        <div className="flex items-center rounded-md border-2 border-[#8B4513] shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Job Type..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>

                        <div className="flex items-center rounded-md border-2 border-[#8B4513] shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Experience Level..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>

                        <div className="col-span-2 flex items-center rounded-md border-2 border-[#8B4513] shadow-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Salary Range..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="bg-redCastomize text-white rounded-full px-6 py-3 shadow-md hover:bg-[#6F3610] transition duration-200"
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