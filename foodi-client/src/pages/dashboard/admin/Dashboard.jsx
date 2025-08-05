import React from 'react';
import useAuth from './../../../hooks/useAuth';
// A custom hook for accessing authentication-related data (likely provides user information).
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// useQuery: A hook from @tanstack/react-query for data fetching and caching.
import { FaDollarSign, FaUsers, FaUtensils, FaShoppingCart } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get('/adminStats');
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get('/orderStats');
      return res.data;
    },
  });

  console.log("Stats:", stats);
  console.log("Chart Data:", chartData);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => ({
    name: data.category,
    value: data.revenue,
  }));

  // Hardcoded data for debugging purposes
  const sampleChartData = [
    { category: 'Drinks', revenue: 400 },
    { category: 'Salad', revenue: 300 },
    { category: 'Popular', revenue: 300 },
    { category: 'Pizza', revenue: 200 },
  ];

  const samplePieChartData = sampleChartData.map((data) => ({
    name: data.category,
    value: data.revenue,
  }));

  return (
    <div className='w-full md:w-[950px] mx-auto px-4'>
      <h2 className='text-2xl font-semibold my-4'>Hi, {user.displayName} </h2>

      <div className="stats stats-vertical w-full lg:stats-horizontal shadow">
        <div className="stat bg-emerald-200">
          <div className="stat-figure text-secondary text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-orange-200">
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-indigo-400">
          <div className="stat-figure text-secondary text-3xl">
            <FaUtensils />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-purple-300">
          <div className="stat-figure text-secondary text-3xl">
            <FaShoppingCart />
          </div>
          <div className="stat-title">All Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-gray-300">
          <div className="stat-figure text-secondary text-3xl">
            <SlCalender />
          </div>
          <div className="stat-title">All Bookings</div>
          <div className="stat-value">{stats.bookings}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className='mt-16 flex flex-col sm:flex-row'>
        <div className='sm:w-1/2 w-full'>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={sampleChartData} // Use sampleChartData for debugging
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='sm:w-1/2 w-full'>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={samplePieChartData} // Use samplePieChartData for debugging
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {samplePieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
