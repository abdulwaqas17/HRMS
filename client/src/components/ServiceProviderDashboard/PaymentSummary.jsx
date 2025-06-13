import React from 'react';

const PaymentSummary = () => {
  const payments = [
    { company: "TechSolutions PK", amount: "$450", status: "paid", date: "Jul 12" },
    { company: "MediCare Ltd", amount: "$350", status: "paid", date: "Jul 10" },
    { company: "EduSoft", amount: "$250", status: "pending", date: "Jul 5" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h2>
      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{payment.company}</p>
              <p className="text-sm text-gray-500">{payment.date}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">{payment.amount}</p>
              <p className={`text-xs ${payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                {payment.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <p className="text-gray-600">Total Pending</p>
        <p className="font-semibold text-gray-800">$250</p>
      </div>
    </div>
  );
};

export default PaymentSummary;