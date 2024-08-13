import React from 'react';
import OrderSideNav from '@/components/OrderSideNav';
import { useRouter } from 'next/router';

const CustomerDashboard = () => {
  const router = useRouter();

  const renderContent = () => {
    const { section } = router.query;

    switch (section) {
      case 'orders':
        return <div>Your Orders</div>;
      case 'catalog':
        return <div>Product Catalog</div>;
      case 'payment':
        return <div>Payment Information</div>;
      case 'location':
        return <div>Change Location</div>;
      case 'language':
        return <div>Language Settings</div>;
      case 'signin':
        return <div>Sign In</div>;
      default:
        return <div>Welcome to your dashboard!</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <OrderSideNav />
      <main style={{ flex: 1, padding: '20px' }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default CustomerDashboard;
