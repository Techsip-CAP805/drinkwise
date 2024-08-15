import React, { useEffect, useState } from 'react';
import OrderSideNav from '@/components/OrderSideNav';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const getCustomerInfo = async () => {
    if (!session?.user?.sub) return;  // Exit if session is not available

    try {
      const customerRes = await fetch(`/api/getCustomerByID?id=${session.user.sub}`);
      const customerInfo = await customerRes.json();
      setCustomer(customerInfo);
    } catch (error) {
      console.error('Failed to fetch customer info:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getCustomerInfo();
    }

    console.log("CUSTOMER: ", customer);
  }, [session, status]);

  const renderContent = () => {
    const { section } = router.query;

    switch (section) {
      case 'orders':
        return (
          <div>
            <h2>Your Orders</h2>
            {customer?.orders?.length > 0 ? (
              <ul>
                {customer.orders.map((order, index) => (
                  <li key={index}>{order}</li> // Display order details here
                ))}
              </ul>
            ) : (
              <p>You have no orders yet.</p>
            )}
          </div>
        );
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
        return (
          <div>
            <h2>Welcome to your dashboard, {customer?.customerName || customer?.username}!</h2>
            <p><strong>Email Address:</strong> {customer?.emailAddress}</p>
            <p><strong>Preferred Branch:</strong> {customer?.preferredBranch || "No preferred branch selected"}</p>
            <p><strong>Account Creation Date:</strong> {new Date(customer?.accountCreationDate).toLocaleDateString()}</p>
          </div>
        );
    }
  };

  if (status === 'loading' || !customer) {
    return <div>Loading...</div>;  // Loading state while fetching data
  }

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
