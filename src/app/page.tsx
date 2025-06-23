'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';
import TaskForm from '../components/TaskForm';
import styles from '../styles/Home.module.css';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  createdAt: string;
  category: string;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React Assignment",
      description: "Finish the midterm practical exam with all required components",
      priority: "High",
      completed: false,
      createdAt: "2024-03-15",
      category: "Education"
    },
    {
      id: 2,
      title: "Review TypeScript Documentation",
      description: "Study advanced TypeScript features for better code quality",
      priority: "Medium",
      completed: true,
      createdAt: "2024-03-14",
      category: "Learning"
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all');

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, task]);
    setShowForm(false);
  };

  const toggleTaskComplete = (id: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'high':
        return task.priority === 'High';
      default:
        return true;
    }
  });

  return (
    <>
      <Head>
        <title>TaskFlow - Smart Task Management</title>
        <meta name="description" content="Modern task management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <span className={styles.gradient}>TaskFlow</span>
            </h1>
            <p className={styles.subtitle}>
              Smart task management for productive teams
            </p>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Cancel' : '+ New Task'}
            </button>
          </div>
        </header>

        <nav className={styles.filterNav}>
          <button 
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks ({tasks.length})
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
          <button 
            className={`${styles.filterBtn} ${filter === 'high' ? styles.active : ''}`}
            onClick={() => setFilter('high')}
          >
            High Priority ({tasks.filter(t => t.priority === 'High').length})
          </button>
        </nav>

        <main className={styles.main}>
          <div className={styles.sidebar}>
            {showForm && (
              <div className={styles.formContainer}>
                <TaskForm onSubmit={addTask} onCancel={() => setShowForm(false)} />
              </div>
            )}
            
            <div className={styles.listContainer}>
              <TaskList 
                tasks={filteredTasks}
                onSelectTask={setSelectedTask}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
                selectedTaskId={selectedTask?.id}
              />
            </div>
          </div>

          <div className={styles.details}>
            {selectedTask ? (
              <TaskDetail
                task={selectedTask} 
                onClose={() => setSelectedTask(null)}
                onToggleComplete={toggleTaskComplete}
                onDelete={deleteTask}
              />
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📋</div>
                <h3>Select a task to view details</h3>
                <p>Choose any task from the list to see its full information</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;