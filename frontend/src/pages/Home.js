import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";
import ComponentName from "../component/ProductCategories";
import GifComponent from "../component/gif";

function Home() {

    return (
        <>
        <Header />
        <GifComponent/>
        <Sidebar/>
        <ComponentName/>
        <Footer/>
        </>
        
      );
}

export default Home;
