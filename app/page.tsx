'use client';

import { 
  MdTrendingUp, 
  MdShoppingCart, 
  MdPeople, 
  MdInventory,
  MdMoreVert,
  MdArrowUpward,
  MdArrowDownward
} from 'react-icons/md';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const statsCards = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up',
    icon: MdTrendingUp,
    color: 'text-success'
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: MdShoppingCart,
    color: 'text-info'
  },
  {
    title: 'Total Users',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: MdPeople,
    color: 'text-warning'
  },
  {
    title: 'Products',
    value: '789',
    change: '-2.1%',
    trend: 'down',
    icon: MdInventory,
    color: 'text-danger'
  }
];

const salesData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 139 },
  { name: 'Mar', sales: 2000, orders: 980 },
  { name: 'Apr', sales: 2780, orders: 390 },
  { name: 'May', sales: 1890, orders: 480 },
  { name: 'Jun', sales: 2390, orders: 380 },
  { name: 'Jul', sales: 3490, orders: 430 }
];

const categoryData = [
  { name: 'Electronics', value: 400, color: 'rgb(247, 80, 64)' },
  { name: 'Clothing', value: 300, color: '#EDF1FF' },
  { name: 'Books', value: 200, color: '#28a745' },
  { name: 'Home & Garden', value: 100, color: '#17a2b8' }
];

const recentOrders = [
  { id: '#12345', customer: 'John Doe', product: 'iPhone 14 Pro', amount: '$999', status: 'Completed', date: '2024-01-15' },
  { id: '#12346', customer: 'Jane Smith', product: 'MacBook Air', amount: '$1,299', status: 'Processing', date: '2024-01-14' },
  { id: '#12347', customer: 'Mike Johnson', product: 'AirPods Pro', amount: '$249', status: 'Shipped', date: '2024-01-14' },
  { id: '#12348', customer: 'Sarah Wilson', product: 'iPad Pro', amount: '$1,099', status: 'Pending', date: '2024-01-13' },
  { id: '#12349', customer: 'Tom Brown', product: 'Apple Watch', amount: '$399', status: 'Completed', date: '2024-01-13' }
];

const topProducts = [
  { name: 'iPhone 14 Pro', sales: 234, revenue: '$233,400', trend: 'up' },
  { name: 'MacBook Air', sales: 156, revenue: '$202,440', trend: 'up' },
  { name: 'AirPods Pro', sales: 189, revenue: '$47,061', trend: 'down' },
  { name: 'iPad Pro', sales: 98, revenue: '$107,702', trend: 'up' },
  { name: 'Apple Watch', sales: 145, revenue: '$57,855', trend: 'up' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-success text-white';
    case 'Processing': return 'bg-warning text-dark';
    case 'Shipped': return 'bg-info text-white';
    case 'Pending': return 'bg-secondary text-primary';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Page = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Heres whats happening with your store today.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-opacity-80 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-light rounded-lg hover:bg-opacity-90 transition-colors">
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-light p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-dark mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <MdArrowUpward className="text-success mr-1" size={16} />
                    ) : (
                      <MdArrowDownward className="text-danger mr-1" size={16} />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-opacity-10 ${stat.color}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-light p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark">Sales Overview</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MdMoreVert size={20} className="text-gray-600" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="rgb(247, 80, 64)" 
                strokeWidth={3}
                dot={{ fill: 'rgb(247, 80, 64)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-light p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark">Sales by Category</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MdMoreVert size={20} className="text-gray-600" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-light rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-dark">Recent Orders</h3>
              <button className="text-primary hover:underline">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-dark">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-light rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-dark">Top Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dark">{product.revenue}</p>
                    <div className="flex items-center justify-end">
                      {product.trend === 'up' ? (
                        <MdArrowUpward className="text-success mr-1" size={12} />
                      ) : (
                        <MdArrowDownward className="text-danger mr-1" size={12} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-light p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-dark mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-secondary transition-colors group">
            <MdInventory size={24} className="text-gray-400 group-hover:text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-primary">Add Product</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-secondary transition-colors group">
            <MdShoppingCart size={24} className="text-gray-400 group-hover:text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-primary">New Order</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-secondary transition-colors group">
            <MdPeople size={24} className="text-gray-400 group-hover:text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-primary">Add User</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-secondary transition-colors group">
            <MdTrendingUp size={24} className="text-gray-400 group-hover:text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-primary">View Reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;