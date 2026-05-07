import { Flex, Typography } from "antd";
import { useTask } from "../store/taskService";
import { TaskElement } from "../components/taskElement";

const { Title } = Typography;

export const WeekTasksView = () => {
  const tasks = useTask((s) => s.tasks);

  const now = new Date();

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const tasksData = tasks
    .filter((task) => {
      if (!task.dueDate) return false;

      const due = new Date(task.dueDate);

      return due >= startOfWeek && due <= endOfWeek;
    })
    .sort((a, b) => {
      return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
    });
  return (
    <Flex vertical style={{ height: "100%" }}>
      <Title level={1}>Неделя</Title>

      <Flex vertical gap={8}>
        {tasksData.map((item) => (
          <TaskElement task={item} key={item.id} />
        ))}
      </Flex>
    </Flex>
  );
};
