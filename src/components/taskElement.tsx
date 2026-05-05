import { Button, Checkbox, Flex, Row, Tag, Typography } from "antd";
import { useTask } from "../store/taskService";
import type { Task } from "../store/taskService";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Props {
  task: Task;
}

export const TaskElement = ({ task }: Props) => {
  const updateTask = useTask((s) => s.updateTask);
  const destroyTask = useTask((s) => s.deleteTask);

  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{
        padding: "10px 12px",
        borderBottom: "1px solid #f5f5f5",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#fafafa";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Checkbox
          checked={task.completed}
          onChange={(e) => {
            updateTask(task.id, { completed: e.target.checked });
          }}
        />

        <Text
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#999" : "inherit",
          }}
        >
          {task.title}
        </Text>
      </div>
      <Flex gap={8}>
        {task.dueDate && (
          <Tag color={task.completed ? "default" : "blue"}>
            {formatDate(task.dueDate)}
          </Tag>
        )}
        <Button
          size="small"
          color="danger"
          variant="solid"
          icon={<DeleteOutlined />}
          onClick={() => destroyTask(task.id)}
        ></Button>
      </Flex>
    </Row>
  );
};
