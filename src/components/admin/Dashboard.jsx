import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Select from 'react-select';
import { ErrorHandling } from '../toasters/MessagesHandling';
import http from '../../api/http';
import styles from './Dashboard.module.css';
import loaderStyle from '../main/loader.module.css';

const Dashboard = () => {
  const options = [
    { value: 'week', label: '1 week ' },
    { value: 'month', label: '1 month' },
    { value: 'year', label: '1 year' },
  ];

  const [checklists, setChecklists] = useState([]);
  const [users, setUsers] = useState([]);
  const [madeTodayUsers, setMadeTodayUsers] = useState(null);
  const [madeTodayChecklists, setMadeTodayChecklists] = useState(null);
  const [diapasonForChecklists, setDiapasonForChecklists] = useState(options[0]);
  const [diapasonForUsers, setDiapasonForUsers] = useState(options[0]);
  const [fetching, setFetching] = useState(true);
  const [loadingForChecklists, setLoadingChecklists] = useState(false);
  const [loadingForUsers, setLoadingUsers] = useState(false);


  const fetchChecklist = async () => {
    const response = await http.get('api/checklists/week');
    return response.data;
  };
  const fetchMadeTodayChecklist = async () => {
    const response = await http.get('api/checklists/today');
    return response.data;
  };

  const fetchMadeTodayUsers = async () => {
    const response = await http.get('api/admin/users/today');

    return response.data;
  };

  const fetchUsers = async () => {
    const response = await http.get('api/admin/users/week');

    return response.data;
  };

  useEffect(() => {
    fetchMadeTodayChecklist()
      .then(data => setMadeTodayChecklists(data.count));

    fetchMadeTodayUsers()
      .then(data => setMadeTodayUsers(data.count));

    fetchChecklist()
      .then(data => setChecklists(data));

    fetchUsers()
      .then(data => setUsers(data))
      .then(() => setFetching(false));
  }, []);

  const changeDiapasonForChecklists = async (period) => {
    try {
      setLoadingChecklists(true);
      const response = await http.get(`api/checklists/${period.value}`);
      setDiapasonForChecklists(period);
      setChecklists(response.data);
      setLoadingChecklists(false);
    } catch (error) {
      ErrorHandling(error.response.data.message);
    }
  };

  const changeDiapasonForUsers = async (period) => {
    try {
      setLoadingUsers(true);
      const response = await http.get(`api/admin/users/${period.value}`);
      setDiapasonForUsers(period);
      setUsers(response.data);
      setLoadingUsers(false);
    } catch (error) {
      ErrorHandling(error.message);
    }
  };

  if (fetching) return <div className={loaderStyle.loader}>Loading...</div>;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.checklistsChart}>
        <div className={styles.header}>
          <div className={styles.checklistsToday}>
            <p>
Today
              {' '}
              <span>{madeTodayChecklists}</span>
              {' '}
checklists
            </p>
          </div>
          <Select
            className={styles.select}
            isLoading={loadingForChecklists}
            value={diapasonForChecklists}
            isSearchable={false}
            onChange={value => changeDiapasonForChecklists(value)}
            options={options}
            components={{ IndicatorSeparator: () => null }}
          />
        </div>
        <ResponsiveContainer height={350} minHeight={100}>
          <AreaChart data={checklists}>
            <Area type="monotone" dataKey="checklists" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.usersChart}>
        <div className={styles.header}>
          <div className={styles.usersToday}>
            <p>
  Today
              {' '}
              <span>{madeTodayUsers}</span>
              {' '}
  users
            </p>
          </div>
          <Select
            className={styles.select}
            isLoading={loadingForUsers}
            value={diapasonForUsers}
            isSearchable={false}
            onChange={value => changeDiapasonForUsers(value)}
            options={options}
            components={{ IndicatorSeparator: () => null }}
          />
        </div>
        <ResponsiveContainer height={350} minHeight={100}>
          <AreaChart data={users}>
            <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#1DBDB6" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
