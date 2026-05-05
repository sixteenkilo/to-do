import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input, DatePicker } from "antd";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useTask } from "../store/taskService";

export const CreateTask = ({ projectId }: { projectId: string }) => {
  const createTask = useTask((s) => s.createTask);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleCreate = () => {
    if (!title.trim()) return;

    createTask(title, projectId, date?.toISOString());

    setTitle("");
    setDate(null);
    setOpen(false);
  };

  if (!open) {
    return (
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          cursor: "pointer",
          color: "#1677ff",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        onClick={() => setOpen(true)}
      >
        <PlusOutlined /> Добавить задачу
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "12px",
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        background: "#fafafa",
      }}
    >
      <Flex vertical gap={8}>
        <Input
          autoFocus
          placeholder="Название задачи"
          size="large"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleCreate}
        />

        <Flex gap={8}>
          <DatePicker
            showTime
            value={date}
            onChange={(v) => setDate(v)}
            placeholder="Дата и время"
            style={{ flex: 1 }}
          />

          <Button
            type="primary"
            onClick={handleCreate}
            disabled={!title.trim()}
          >
            Добавить
          </Button>

          <Button onClick={() => setOpen(false)}>Отмена</Button>
        </Flex>
      </Flex>
    </div>
  );
};
