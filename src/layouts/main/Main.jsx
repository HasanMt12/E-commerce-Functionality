
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../../Shared/Navbar';
import Footer from '../../Shared/Footer';


const Main = () => {
    const location = useLocation();
    const noFooter = location.pathname.includes('login') 
    const noHeader = location.pathname.includes('login') 
    return (
        <div className='bg-[#F5F5F5] '>
           {noHeader ||  <Header></Header> }
                <Outlet />
           {noFooter || <Footer></Footer>} 
        </div>
    );
};

export default Main;