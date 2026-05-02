import { Form, Input, Modal, type ModalProps } from "antd";
import { useProject } from "../store/projectService";

interface IProps {
  open: boolean;
  close: () => void;
}
type TCreateProject = {
  title: string;
  description: string;
};
const modal: ModalProps = {
  okText: "Создать",
  cancelText: "Отмена",
  cancelButtonProps: { color: "danger" },
};

export const CreateProject = ({ open, close }: IProps) => {
  const [form] = Form.useForm();
  const createProject = useProject((s) => s.createProject);
  const onFinish = (value: TCreateProject) => {
    createProject(value.title, value.description);
    close();
    console.log(value);
  };
  return (
    <Modal
      open={open}
      onCancel={close}
      title="Новый проект"
      onOk={() => form.submit()}
      {...modal}
    >
      <Form<TCreateProject> layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          rules={[
            { required: true, message: "Введите название проекта" },
            { whitespace: true, message: "Название не может быть пустым" },
          ]}
          label="Название проекта"
          name="title"
        >
          <Input placeholder="Введите название проект" />
        </Form.Item>
        <Form.Item label="Описание проекта" name="description">
          <Input placeholder="Введите описание проект" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
