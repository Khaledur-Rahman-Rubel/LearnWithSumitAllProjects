import { useState } from "react";
import AddTaskModel from "./TaskBoard/AddTaskModel";
import NoTaskFound from "./TaskBoard/NoTaskFound";
import SearchBox from "./TaskBoard/SearchBox";
import TaskAction from "./TaskBoard/TaskAction";
import TaskList from "./TaskBoard/TaskList";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Connect an existing API to a third-party database using methods and handle data exchange efficiently.",
    tags: ["Web", "Python", "Api"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    console.log(isAdd);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }

          return task;
        })
      );
      setShowAddModal(false);
    }

    setShowAddModal(false);
    setTaskToUpdate(null);
  };
  const handleClose = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };
  const handleDeleteTask = (taskId) => {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  };
  const handleOnDeleteAll = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };
  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTask = [...tasks];
    console.log(newTask);

    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  };

  const handleSearch = (searchTrem) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTrem.toLowerCase())
    );
    setTasks([...filtered]);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModel
            onSave={handleAddEditTask}
            onClose={handleClose}
            taskToUpdate={taskToUpdate}
          />
        )}
        <div className="container">
          <SearchBox onSearch={handleSearch} />

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddClick={() => setShowAddModal(true)}
              onDeleteAll={handleOnDeleteAll}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onFavorite={handleFavorite}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskBoard;
