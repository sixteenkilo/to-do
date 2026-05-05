import { Button, Flex, Popconfirm, Typography } from "antd";
import { useProject } from "../store/projectService";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { CreateTask } from "../components/createTask";
import { useTask } from "../store/taskService";
import { TaskElement } from "../components/taskElement";

const { Title, Paragraph } = Typography;

export const ProjectView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tasksData = useTask((s) => s.tasks)
    .filter((item) => item.projectId === id)
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  const project = useProject((s) => s.projects.find((item) => item.id === id));

  const deleteProject = useProject((s) => s.deleteProject);
  const updateProject = useProject((s) => s.updateProject);

  const destroy = () => {
    deleteProject(project.id);
    navigate("/");
  };

  useEffect(() => {
    if (!project) navigate("/");
  }, [project, navigate]);

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
              }}
            >
              <Title
                level={1}
                editable={{
                  icon: null,
                  triggerType: ["text"],
                  onChange: (value) => {
                    if (!value.trim()) return;
                    updateProject(project.id, { title: value });
                  },
                }}
                style={{ margin: 0 }}
              >
                {project?.title}
              </Title>

              <EditOutlined
                style={{
                  fontSize: 16,
                  color: "#999",
                  cursor: "pointer",
                  opacity: 0.6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
              />
            </div>

            {/* DESCRIPTION */}
            <Paragraph
              editable={{
                icon: null,
                onChange: (value) => {
                  updateProject(project.id, { description: value });
                },
              }}
              style={{
                color: "#666",
                marginTop: 4,
              }}
            >
              {project?.description || "Добавить описание"}
            </Paragraph>
          </div>
          {/* RIGHT ACTIONS */}
          <Popconfirm
            title="Вы уверены?"
            description="после удаления все задачи проекта будут удалены"
            okText="Удалить"
            cancelText="Нет"
            onConfirm={destroy}
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} color="danger" variant="solid">
              Удалить проект
            </Button>
          </Popconfirm>
        </div>
      </Flex>
      <Flex flex={1} vertical>
        {tasksData.map((item) => (
          <TaskElement task={item} key={item.id} />
        ))}
        <CreateTask projectId={id} />
      </Flex>
    </Flex>
  );
};
