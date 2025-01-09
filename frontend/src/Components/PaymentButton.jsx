import React, { useState } from 'react';


const PaymentButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const createPayment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/customer/create-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.approval_url) {
        // 跳转到 PayPal 界面
        window.location.href = data.approval_url;
      } else {
        console.error('Payment creation failed');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  // 支付完成或取消后，获取支付结果
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/customer/payment-status/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setModalContent('Thank you for your purchase!'); // 支付成功内容
      } else if (data.status === 'cancel') {
        setModalContent('Sorry, the payment was not completed.'); // 支付取消内容
      }
      setShowModal(true); // 显示弹窗
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  return (
    <div className="text-center">
      <button onClick={createPayment} className="btn btn-primary">Pay with PayPal</button>

      {/* 弹窗 */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Status</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: '18px' }}>{modalContent}</p> {/* 动态显示内容 */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
