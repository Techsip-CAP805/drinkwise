// pages/orders/[view].js
import Orders from './orders/[view].js';
import { withRole } from '../../../lib/auth.js';

const OrdersPage = () => {
    return (
        <Orders />
    );
};


//auth
export const getServerSideProps = withRole(['employee', 'admin'], '/employee/login');

export default OrdersPage;
