import React from 'react';
import { Task } from '../app/page';
import styles from '../styles/TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  selectedTaskId?: number;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onSelectTask, 
  onToggleComplete, 
  onDeleteTask,
  selectedTaskId 
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa502';
      case 'Low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className={styles.emptyList}>
        <div className={styles.emptyIcon}>🎯</div>
        <h3>No tasks found</h3>
        <p>Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.listHeader}>
        <h2>Tasks</h2>
        <span className={styles.taskCount}>{tasks.length} items</span>
      </div>
      
      <div className={styles.taskGrid}>
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`${styles.taskCard} ${
              task.completed ? styles.completed : ''
            } ${selectedTaskId === task.id ? styles.selected : ''}`}
            onClick={() => onSelectTask(task)}
          >
            <div className={styles.taskHeader}>
              <div className={styles.taskMeta}>
                <span 
                  className={styles.priority}
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className={styles.category}>{task.category}</span>
              </div>
              
              <div className={styles.taskActions}>
                <button
                  className={`${styles.actionBtn} ${styles.completeBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(task.id);
                  }}
                  title={task.completed ? 'Mark as pending' : 'Mark as complete'}
                >
                  {task.completed ? '↶' : '✓'}
                </button>
                
                <button
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className={styles.taskBody}>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <p className={styles.taskDescription}>
                {task.description.length > 80 
                  ? `${task.description.substring(0, 80)}...` 
                  : task.description
                }
              </p>
            </div>

            <div className={styles.taskFooter}>
              <span className={styles.taskDate}>
                📅 {new Date(task.createdAt).toLocaleDateString()}
              </span>
              <div className={styles.taskStatus}>
                {task.completed && (
                  <span className={styles.completedBadge}>✅ Done</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;