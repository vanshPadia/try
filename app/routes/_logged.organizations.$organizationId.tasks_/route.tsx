import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Tag,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TasksPage() {
  const { organization } = useUserContext()
  const { organizationId } = useParams()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterPriority, setFilterPriority] = useState<string | null>(null)
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null)

  const { data: tasksData, refetch: refetchTasks } = Api.task.findMany.useQuery(
    {
      where: { board: { userId: organization?.id } },
      include: { assignee: true, board: true },
    },
  )

  const { data: usersData } = Api.user.findMany.useQuery({
    where: { organizationRoles: { some: { organizationId } } },
  })

  const { mutateAsync: createTask } = Api.task.create.useMutation()
  const { mutateAsync: updateTask } = Api.task.update.useMutation()
  const { mutateAsync: deleteTask } = Api.task.delete.useMutation()

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData)
    }
  }, [tasksData])

  const showModal = (taskId: string | null = null) => {
    setEditingTaskId(taskId)
    if (taskId) {
      const task = tasks.find(t => t.id === taskId)
      form.setFieldsValue({
        ...task,
        deadline: task.deadline ? dayjs(task.deadline) : null,
      })
    } else {
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingTaskId) {
        await updateTask({
          where: { id: editingTaskId },
          data: { ...values, deadline: values.deadline?.toISOString() },
        })
      } else {
        await createTask({
          data: {
            ...values,
            deadline: values.deadline?.toISOString(),
            boardId: tasks[0]?.boardId || '',
          },
        })
      }
      setIsModalVisible(false)
      refetchTasks()
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteTask({ where: { id } })
    refetchTasks()
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>
      ),
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee: any) => assignee?.name || 'Unassigned',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline: string) =>
        deadline ? dayjs(deadline).format('YYYY-MM-DD') : 'No deadline',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record.id)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const filteredTasks = tasks.filter(task => {
    return (
      (!filterStatus || task.status === filterStatus) &&
      (!filterPriority || task.priority === filterPriority) &&
      (!filterAssignee || task.assignee?.id === filterAssignee)
    )
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Tasks Management</Title>
        <Text>
          View, create, and manage your tasks, to-do lists, deadlines, and
          progress tracking in one place.
        </Text>

        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Space>
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Status"
              allowClear
              onChange={value => setFilterStatus(value)}
            >
              <Select.Option value="To Do">To Do</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Priority"
              allowClear
              onChange={value => setFilterPriority(value)}
            >
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="High">High</Select.Option>
            </Select>
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Assignee"
              allowClear
              onChange={value => setFilterAssignee(value)}
            >
              {usersData?.map(user => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
            >
              Create Task
            </Button>
          </Space>
        </div>

        <Table columns={columns} dataSource={filteredTasks} rowKey="id" />

        <Modal
          title={editingTaskId ? 'Edit Task' : 'Create Task'}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="To Do">To Do</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Low">Low</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="High">High</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="assigneeId" label="Assignee">
              <Select>
                {usersData?.map(user => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="deadline" label="Deadline">
              <DatePicker />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
