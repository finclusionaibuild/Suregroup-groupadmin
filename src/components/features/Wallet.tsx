import React, { useState } from 'react';
import { Send, Plus, ArrowUpRight, ArrowDownLeft, Eye, CreditCard, History, QrCode, Smartphone } from 'lucide-react';

interface WalletTransaction {
  id: string;
  type: 'sent' | 'received' | 'deposit' | 'withdrawal';
  amount: number;
  description: string;
  recipient?: string;
  sender?: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  transactionId: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastTransaction?: string;
}

export const Wallet: React.FC = () => {
  const [balance] = useState(1247.85);
  const [activeTab, setActiveTab] = useState<'overview' | 'send' | 'receive' | 'history'>('overview');
  const [showQRCode, setShowQRCode] = useState(false);
  
  const [transactions] = useState<WalletTransaction[]>([
    {
      id: '1',
      type: 'received',
      amount: 125.50,
      description: 'Monthly contribution refund',
      sender: 'Community Church',
      status: 'completed',
      timestamp: '2025-01-14T10:30:00Z',
      transactionId: 'TXN-2025-001'
    },
    {
      id: '2',
      type: 'sent',
      amount: 50.00,
      description: 'Youth camp registration',
      recipient: 'Youth Ministry',
      status: 'completed',
      timestamp: '2025-01-13T16:45:00Z',
      transactionId: 'TXN-2025-002'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 500.00,
      description: 'Bank transfer deposit',
      status: 'completed',
      timestamp: '2025-01-12T14:20:00Z',
      transactionId: 'TXN-2025-003'
    },
    {
      id: '4',
      type: 'sent',
      amount: 25.75,
      description: 'Coffee with Sarah',
      recipient: 'Sarah Johnson',
      status: 'pending',
      timestamp: '2025-01-12T11:15:00Z',
      transactionId: 'TXN-2025-004'
    },
    {
      id: '5',
      type: 'withdrawal',
      amount: 200.00,
      description: 'ATM withdrawal',
      status: 'completed',
      timestamp: '2025-01-11T09:30:00Z',
      transactionId: 'TXN-2025-005'
    }
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'SJ',
      lastTransaction: '2025-01-12'
    },
    {
      id: '2',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      avatar: 'MW',
      lastTransaction: '2025-01-10'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      avatar: 'ED',
      lastTransaction: '2025-01-08'
    }
  ]);

  const [sendForm, setSendForm] = useState({
    recipient: '',
    amount: '',
    description: '',
    pin: ''
  });

  const [receiveForm, setReceiveForm] = useState({
    amount: '',
    description: ''
  });

  const handleSendMoney = () => {
    if (!sendForm.recipient || !sendForm.amount || !sendForm.pin) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Simulate transaction
    alert(`Sending $${sendForm.amount} to ${sendForm.recipient}`);
    setSendForm({ recipient: '', amount: '', description: '', pin: '' });
    setActiveTab('overview');
  };

  const handleRequestMoney = () => {
    if (!receiveForm.amount) {
      alert('Please enter an amount');
      return;
    }
    
    alert(`Payment request for $${receiveForm.amount} created`);
    setReceiveForm({ amount: '', description: '' });
    setActiveTab('overview');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent': return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'received': return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'deposit': return <Plus className="w-4 h-4 text-blue-500" />;
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4 text-orange-500" />;
      default: return <CreditCard className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'sent': return 'text-red-600';
      case 'received': return 'text-green-600';
      case 'deposit': return 'text-blue-600';
      case 'withdrawal': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const recentTransactions = transactions.slice(0, 5);
  const totalSent = transactions.filter(t => t.type === 'sent' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = transactions.filter(t => t.type === 'received' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sure Banker Wallet</h1>
        <p className="text-gray-600">Manage your digital wallet and transactions</p>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Available Balance</p>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            <p className="text-blue-100 text-sm mt-1">Sure Banker Account</p>
          </div>
          <div className="text-right">
            <CreditCard className="w-12 h-12 text-blue-200 mb-2" />
            <p className="text-xs text-blue-100">**** 1234</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-xl font-bold text-red-600">${totalSent.toFixed(2)}</p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Received</p>
              <p className="text-xl font-bold text-green-600">${totalReceived.toFixed(2)}</p>
            </div>
            <ArrowDownLeft className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-yellow-600">{pendingTransactions}</p>
            </div>
            <History className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-xl font-bold text-blue-600">{transactions.length}</p>
            </div>
            <History className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('send')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'send'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Send Money
            </button>
            <button
              onClick={() => setActiveTab('receive')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'receive'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Request Money
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transaction History
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('send')}
                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Send Money</p>
              </button>
              <button
                onClick={() => setActiveTab('receive')}
                className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                <ArrowDownLeft className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Request Money</p>
              </button>
              <button
                onClick={() => setShowQRCode(true)}
                className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <QrCode className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Code</p>
              </button>
              <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
                <Smartphone className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Mobile Pay</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.recipient || transaction.sender || 'System'} • 
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'sent' || transaction.type === 'withdrawal' ? '-' : '+'}
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab('history')}
              className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Transactions
            </button>
          </div>
        </div>
      )}

      {/* Send Money Tab */}
      {activeTab === 'send' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Money</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                <input
                  type="text"
                  value={sendForm.recipient}
                  onChange={(e) => setSendForm({...sendForm, recipient: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email or phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={sendForm.amount}
                    onChange={(e) => setSendForm({...sendForm, amount: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  value={sendForm.description}
                  onChange={(e) => setSendForm({...sendForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this for?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction PIN</label>
                <input
                  type="password"
                  value={sendForm.pin}
                  onChange={(e) => setSendForm({...sendForm, pin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your 4-digit PIN"
                  maxLength={4}
                />
              </div>

              <button
                onClick={handleSendMoney}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send ${sendForm.amount || '0.00'}
              </button>
            </div>

            {/* Recent Contacts */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Contacts</h3>
              <div className="grid grid-cols-3 gap-3">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSendForm({...sendForm, recipient: contact.email})}
                    className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-medium text-sm">{contact.avatar}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-900">{contact.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Money Tab */}
      {activeTab === 'receive' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Money</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={receiveForm.amount}
                    onChange={(e) => setReceiveForm({...receiveForm, amount: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={receiveForm.description}
                  onChange={(e) => setReceiveForm({...receiveForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this payment for?"
                />
              </div>

              <button
                onClick={handleRequestMoney}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create Payment Request
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowQRCode(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-2 mx-auto"
              >
                <QrCode className="w-4 h-4" />
                <span>Show QR Code</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">
                            {transaction.recipient || transaction.sender || 'System'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'sent' || transaction.type === 'withdrawal' ? '-' : '+'}
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Payment QR Code</h3>
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Share this QR code to receive payments instantly
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowQRCode(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};