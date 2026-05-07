import { Flex, Typography } from "antd";
import { useTask } from "../store/taskService";
import { TaskElement } from "../components/taskElement";

const { Title } = Typography;

export const TomorrowTasksView = () => {
  const tasks = useTask((s) => s.tasks);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowStart = new Date(tomorrow);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const tasksData = tasks
    .filter((task) => {
      if (!task.dueDate) return false;

      const due = new Date(task.dueDate);

      return due >= tomorrowStart && due <= tomorrowEnd;
    })
    .sort((a, b) => {
      return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
    });

  return (
    <Flex vertical style={{ height: "100%" }}>
      <Title level={1}>Завтра</Title>

      <Flex vertical gap={8}>
        {tasksData.map((item) => (
          <TaskElement task={item} key={item.id} />
        ))}
      </Flex>
    </Flex>
  );
};
