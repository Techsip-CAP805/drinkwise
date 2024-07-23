
import SideNav from '@/components/SideNav';

import { withRole } from '../../../lib/auth';

const Dashboard = () => {
    return (
        <div>
        <SideNav />
        Employee Dashboard
        </div>
    );
}


//auth
export const getServerSideProps = withRole(['employee', 'admin'], '/employee/login');

export default Dashboard;