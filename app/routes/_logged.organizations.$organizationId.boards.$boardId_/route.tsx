import { useState, useEffect } from 'react'
import {
  Typography,
  Card,
  Input,
  Button,
  Space,
  Row,
  Col,
  Modal,
  Form,
  Select,
  message,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
type BoardWithTasks = Prisma.BoardGetPayload<{
  include: { tasks: { include: { assignee: true } } }
}>
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BoardEditorPage() {
  const { boardId, organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [board, setBoard] = useState<BoardWithTasks | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: boardData,
    isLoading,
    refetch,
  } = Api.board.findUnique.useQuery({
    where: { id: boardId },
    include: { tasks: { include: { assignee: true } } },
  })

  const { data: users } = Api.user.findMany.useQuery({})

  const { mutateAsync: updateBoard } = Api.board.update.useMutation()
  const { mutateAsync: createTask } = Api.task.create.useMutation()
  const { mutateAsync: updateTask } = Api.task.update.useMutation()
  const { mutateAsync: deleteTask } = Api.task.delete.useMutation()

  useEffect(() => {
    if (boardData) {
      setBoard(boardData)
    }
  }, [boardData])

  const handleBoardUpdate = async () => {
    if (board) {
      await updateBoard({
        where: { id: board.id },
        data: { name: board.name, description: board.description },
      })
      message.success('Board updated successfully')
    }
  }

  const handleAddTask = () => {
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      await createTask({
        data: {
          ...values,
          boardId: board!.id,
          status: 'TODO',
        },
      })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
      message.success('Task added successfully')
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  const handleTaskUpdate = async (
    taskId: string,
    data: Partial<Prisma.TaskUpdateInput>,
  ) => {
    await updateTask({
      where: { id: taskId },
      data,
    })
    refetch()
    message.success('Task updated successfully')
  }

  const handleTaskDelete = async (taskId: string) => {
    await deleteTask({
      where: { id: taskId },
    })
    refetch()
    message.success('Task deleted successfully')
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  if (!board) {
    return <PageLayout layout="full-width">Board not found</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Visual Board Editor</Title>
        <Text>
          Create and edit visual boards with mind mapping features for
          brainstorming.
        </Text>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Input
              value={board.name}
              onChange={e => setBoard({ ...board, name: e.target.value })}
              placeholder="Board Name"
              style={{ fontSize: '1.5em', fontWeight: 'bold' }}
            />
            <Input.TextArea
              value={board.description}
              onChange={e =>
                setBoard({ ...board, description: e.target.value })
              }
              placeholder="Board Description"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleBoardUpdate}
            >
              Save Board
            </Button>
          </Space>
        </Card>

        <Row gutter={16}>
          {['TODO', 'IN_PROGRESS', 'DONE'].map(status => (
            <Col span={8} key={status}>
              <Card title={status.replace('_', ' ')}>
                {board.tasks
                  ?.filter(task => task.status === status)
                  .map(task => (
                    <Card key={task.id} style={{ marginBottom: 16 }}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        <Input
                          value={task.title}
                          onChange={e =>
                            handleTaskUpdate(task.id, { title: e.target.value })
                          }
                        />
                        <Input.TextArea
                          value={task.description}
                          onChange={e =>
                            handleTaskUpdate(task.id, {
                              description: e.target.value,
                            })
                          }
                        />
                        <Select
                          style={{ width: '100%' }}
                          value={task.assignee?.id}
                          onChange={value =>
                            handleTaskUpdate(task.id, {
                              assignee: { connect: { id: value } },
                            })
                          }
                        >
                          <Select.Option value={null}>Unassigned</Select.Option>
                          {users?.map(user => (
                            <Select.Option key={user.id} value={user.id}>
                              {user.name}
                            </Select.Option>
                          ))}
                        </Select>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleTaskDelete(task.id)}
                        >
                          Delete
                        </Button>
                      </Space>
                    </Card>
                  ))}
              </Card>
            </Col>
          ))}
        </Row>

        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask}>
          Add Task
        </Button>

        <Modal
          title="Add New Task"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="assignee" label="Assignee">
              <Select>
                <Select.Option value={null}>Unassigned</Select.Option>
                {users?.map(user => (
                  <Select.Option
                    key={user.id}
                    value={{ connect: { id: user.id } }}
                  >
                    {user.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </PageLayout>
  )
}
