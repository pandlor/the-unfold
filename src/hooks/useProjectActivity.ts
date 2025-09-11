import { useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

export interface ActivityItem {
  id: string;
  action: string;
  item: string;
  time: string;
  timestamp: number;
}

export const useProjectActivity = (projectId: string) => {
  const [activities, setActivities] = useLocalStorage<ActivityItem[]>(`project-activity-${projectId}`, []);

  const addActivity = (action: string, item: string) => {
    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      action,
      item,
      time: new Date().toLocaleString(),
      timestamp: Date.now()
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep only last 50 activities
  };

  const getRecentActivities = (count: number = 10) => {
    return activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, count)
      .map(activity => ({
        action: activity.action,
        item: activity.item,
        time: getRelativeTime(activity.timestamp)
      }));
  };

  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return {
    activities: getRecentActivities(),
    addActivity
  };
};