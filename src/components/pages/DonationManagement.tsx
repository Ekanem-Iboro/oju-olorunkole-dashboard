import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Eye, Filter } from 'lucide-react';

export function DonationManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const transactions = [
    {
      id: 1,
      amount: 250,
      donor: 'Anonymous',
      date: '2024-01-13',
      method: 'Credit Card',
      type: 'One-time',
      status: 'completed',
    },
    {
      id: 2,
      amount: 100,
      donor: 'John Smith',
      date: '2024-01-13',
      method: 'Bank Transfer',
      type: 'Monthly',
      status: 'completed',
    },
    {
      id: 3,
      amount: 75,
      donor: 'Sarah Johnson',
      date: '2024-01-12',
      method: 'Credit Card',
      type: 'One-time',
      status: 'completed',
    },
    {
      id: 4,
      amount: 500,
      donor: 'Anonymous',
      date: '2024-01-12',
      method: 'Cash',
      type: 'One-time',
      status: 'completed',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#22C55E] text-white';
      case 'pending':
        return 'bg-[#F59E0B] text-white';
      case 'failed':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Monthly':
        return 'bg-[#84CC16] text-white';
      case 'One-time':
        return 'bg-[#3B82F6] text-white';
      default:
        return 'bg-[#E2E8F0] text-[#6B7280]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#374151] mb-2">Donation Management</h1>
        <p className="text-[#6B7280]">Track donations, manage recurring gifts, and generate reports.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-[#22C55E]" />
            </div>
            <div className="flex items-center space-x-1 text-sm text-[#22C55E]">
              <TrendingUp className="h-4 w-4" />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Total This Month</h3>
            <p className="text-2xl font-semibold text-[#374151]">$24,500</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-blue-50">
              <Calendar className="h-6 w-6 text-[#3B82F6]" />
            </div>
            <div className="flex items-center space-x-1 text-sm text-[#22C55E]">
              <TrendingUp className="h-4 w-4" />
              <span>+12</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Recurring Donors</h3>
            <p className="text-2xl font-semibold text-[#374151]">127</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-yellow-50">
              <DollarSign className="h-6 w-6 text-[#F59E0B]" />
            </div>
            <div className="flex items-center space-x-1 text-sm text-[#22C55E]">
              <TrendingUp className="h-4 w-4" />
              <span>$185</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Average Gift</h3>
            <p className="text-2xl font-semibold text-[#374151]">$192</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-lime-50">
              <TrendingUp className="h-6 w-6 text-[#84CC16]" />
            </div>
            <div className="flex items-center space-x-1 text-sm text-[#22C55E]">
              <TrendingUp className="h-4 w-4" />
              <span>+15.3%</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-1">Total Donors</h3>
            <p className="text-2xl font-semibold text-[#374151]">347</p>
          </div>
        </div>
      </div>

      {/* Donation Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#374151]">Donation Trends</h2>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 text-sm border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
        
        {/* Mock Chart Area */}
        <div className="h-64 bg-gradient-to-t from-[#F8FAFC] to-white border border-[#E2E8F0] rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <p className="text-[#6B7280] text-sm">Donation trend chart would appear here</p>
            <p className="text-xs text-[#9CA3AF] mt-2">Showing donation amounts over time</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#374151]">Recent Transactions</h2>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-3 py-1 text-sm border border-[#E2E8F0] rounded-md hover:bg-[#F8FAFC] transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#3B82F6] text-white px-3 py-1 text-sm rounded-md hover:bg-[#2563EB] transition-colors">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E2E8F0]">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#374151] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E2E8F0]">
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#374151]">
                      ${transaction.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">{transaction.donor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#6B7280]">{transaction.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadge(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#3B82F6] hover:text-[#2563EB] p-1 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}