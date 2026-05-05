import { Flex, Typography } from "antd";
import { useTask } from "../store/taskService";
import { TaskElement } from "../components/taskElement";

const { Title } = Typography;

export const AllTaksView = () => {
  const tasksData = useTask((s) => [...s.tasks]).sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Flex vertical style={{ height: "100%" }}>
      <Flex flex={0} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            width: "100%",
          }}
        >
          {/* LEFT */}
          <div style={{ flex: 1 }}>
            {/* TITLE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <Title level={1} style={{ margin: 0 }}>
                Все задачи
              </Title>
            </div>
          </div>
        </div>
      </Flex>
      <Flex flex={1} vertical>
        {tasksData.map((item) => (
          <TaskElement task={item} key={item.id} />
        ))}
      </Flex>
    </Flex>
  );
};
