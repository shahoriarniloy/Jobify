import useCurrentUser from "../Hooks/useCurrentUser";

const Home = () => {
    const {currentUser} = useCurrentUser()
    console.log(currentUser)
    return (
        <div>
            <h1 className="text-red-600">This Is Home</h1>
            
        </div>
    );
};

export default Home;