import { Flex, Typography } from "antd";
import { useTask } from "../store/taskService";
import { TaskElement } from "../components/taskElement";

const { Title } = Typography;

export const OverdueTasksView = () => {
  const tasks = useTask((s) => s.tasks);

  const now = new Date();

  const tasksData = tasks
    .filter((task) => {
      if (!task.dueDate) return false;

      const due = new Date(task.dueDate);

      return due < now && !task.completed;
    })
    .sort((a, b) => {
      return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
    });

  return (
    <Flex vertical style={{ height: "100%" }}>
      <Title level={1}>Просрочено</Title>

      <Flex vertical gap={8}>
        {tasksData.map((item) => (
          <TaskElement task={item} key={item.id} />
        ))}
      </Flex>
    </Flex>
  );
};
