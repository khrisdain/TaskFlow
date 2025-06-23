'use client'
import React from 'react';
import { Task } from '../app/page';
import styles from '../styles/TaskDetails.module.css';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ 
  task, 
  onClose, 
  onToggleComplete, 
  onDelete 
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa502';
      case 'Low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsHeader}>
        <div className={styles.headerTop}>
          <h2>Task Details</h2>
          <button 
            className={styles.closeBtn}
            onClick={onClose}
            title="Close details"
          >
            ✕
          </button>
        </div>
        
        <div className={styles.taskMeta}>
          <span 
            className={styles.priorityBadge}
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority} Priority
          </span>
          <span className={styles.categoryBadge}>{task.category}</span>
          {task.completed && (
            <span className={styles.statusBadge}>✅ Completed</span>
          )}
        </div>
      </div>

      <div className={styles.detailsBody}>
        <div className={styles.titleSection}>
          <h1 className={styles.taskTitle}>{task.title}</h1>
        </div>

        <div className={styles.descriptionSection}>
          <h3>Description</h3>
          <div className={styles.description}>
            {task.description || 'No description provided'}
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📅</div>
            <div className={styles.infoContent}>
              <h4>Created Date</h4>
              <p>{new Date(task.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>⚡</div>
            <div className={styles.infoContent}>
              <h4>Priority Level</h4>
              <p style={{ color: getPriorityColor(task.priority) }}>
                {task.priority}
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📂</div>
            <div className={styles.infoContent}>
              <h4>Category</h4>
              <p>{task.category}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📊</div>
            <div className={styles.infoContent}>
              <h4>Status</h4>
              <p className={task.completed ? styles.completedText : styles.pendingText}>
                {task.completed ? 'Completed' : 'In Progress'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsActions}>
        <button
          className={`${styles.actionButton} ${styles.toggleBtn}`}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? '↶ Mark as Pending' : '✓ Mark as Complete'}
        </button>
        
        <button
          className={`${styles.actionButton} ${styles.deleteBtn}`}
          onClick={handleDelete}
        >
          🗑️ Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;