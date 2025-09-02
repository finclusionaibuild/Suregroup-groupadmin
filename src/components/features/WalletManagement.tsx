import React, { useState } from 'react';
import { Search, Plus, Minus, Eye, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { WalletData, Transaction } from '../../types';

export const WalletManagement: React.FC = () => {
  const [wallets, setWallets] = useState<WalletData[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Smith',
      balance: 1250.75,
      currency: 'USD',
      status: 'active',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah Johnson',
      balance: 890.50,
      currency: 'USD',
      status: 'active',
      createdAt: '2025-01-02T00:00:00Z'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Wilson',
      balance: 0.00,
      currency: 'USD',
      status: 'frozen',
      createdAt: '2025-01-03T00:00:00Z'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      walletId: '1',
      type: 'credit',
      amount: 100.00,
      description: 'Marketplace sale',
      status: 'completed',
      createdAt: '2025-01-14T10:30:00Z'
    },
    {
      id: '2',
      walletId: '2',
      type: 'debit',
      amount: 25.50,
      description: 'Service fee',
      status: 'completed',
      createdAt: '2025-01-14T09:15:00Z'
    },
    {
      id: '3',
      walletId: '1',
      type: 'credit',
      amount: 500.00,
      description: 'Deposit',
      status: 'pending',
      createdAt: '2025-01-14T08:45:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'frozen' | 'suspended'>('all');
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    type: 'credit' as 'credit' | 'debit',
    amount: '',
    description: ''
  });

  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = wallet.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wallet.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getWalletTransactions = (walletId: string) => {
    return transactions.filter(tx => tx.walletId === walletId);
  };

  const handleAddTransaction = () => {
    if (!selectedWallet || !transactionForm.amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      walletId: selectedWallet.id,
      type: transactionForm.type,
      amount: parseFloat(transactionForm.amount),
      description: transactionForm.description,
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);

    // Update wallet balance
    const balanceChange = transactionForm.type === 'credit' 
      ? parseFloat(transactionForm.amount) 
      : -parseFloat(transactionForm.amount);
    
    setWallets(wallets.map(wallet => 
      wallet.id === selectedWallet.id 
        ? { ...wallet, balance: wallet.balance + balanceChange }
        : wallet
    ));

    setTransactionForm({ type: 'credit', amount: '', description: '' });
    setShowTransactionModal(false);
  };

  const toggleWalletStatus = (walletId: string) => {
    setWallets(wallets.map(wallet => 
      wallet.id === walletId 
        ? { ...wallet, status: wallet.status === 'active' ? 'frozen' : 'active' }
        : wallet
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'frozen': return 'bg-blue-100 text-blue-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const activeWallets = wallets.filter(w => w.status === 'active').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wallet Management</h1>
        <p className="text-gray-600">Manage user wallets and transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">${totalBalance.toFixed(2)}</p>
            </div>
            <CreditCard className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Wallets</p>
              <p className="text-2xl font-bold text-emerald-600">{activeWallets}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Frozen Wallets</p>
              <p className="text-2xl font-bold text-blue-600">
                {wallets.filter(w => w.status === 'frozen').length}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
            </div>
            <Eye className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search wallets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Wallets Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWallets.map((wallet) => (
                <tr key={wallet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {wallet.userName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{wallet.userName}</div>
                        <div className="text-sm text-gray-500">ID: {wallet.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${wallet.balance.toFixed(2)} {wallet.currency}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getWalletTransactions(wallet.id).length} transactions
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(wallet.status)}`}>
                      {wallet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(wallet.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedWallet(wallet)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedWallet(wallet);
                          setShowTransactionModal(true);
                        }}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleWalletStatus(wallet.id)}
                        className={wallet.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-emerald-600 hover:text-emerald-900'}
                      >
                        {wallet.status === 'active' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Wallet Details Modal */}
      {selectedWallet && !showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedWallet.userName}'s Wallet
              </h3>
              <button
                onClick={() => setSelectedWallet(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Balance</p>
                    <p className="text-xl font-bold text-gray-900">
                      ${selectedWallet.balance.toFixed(2)} {selectedWallet.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedWallet.status)}`}>
                      {selectedWallet.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-md font-semibold text-gray-900 mb-3">Recent Transactions</h4>
            <div className="space-y-2">
              {getWalletTransactions(selectedWallet.id).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-emerald-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? 
                        <Plus className="w-4 h-4 text-emerald-600" /> : 
                        <Minus className="w-4 h-4 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{new Date(transaction.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showTransactionModal && selectedWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Transaction - {selectedWallet.userName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={transactionForm.type}
                  onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value as 'credit' | 'debit'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="credit">Credit (Add Funds)</option>
                  <option value="debit">Debit (Remove Funds)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={transactionForm.amount}
                  onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={transactionForm.description}
                  onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Transaction description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTransactionModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};