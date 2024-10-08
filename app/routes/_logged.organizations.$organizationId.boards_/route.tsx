import {
  Typography,
  Button,
  Card,
  Row,
  Col,
  Input,
  Modal,
  Form,
  message,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function VisualBoardsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingBoard, setEditingBoard] = useState<string | null>(null)

  const {
    data: boards,
    isLoading,
    refetch,
  } = Api.board.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { mutateAsync: createBoard } = Api.board.create.useMutation()
  const { mutateAsync: updateBoard } = Api.board.update.useMutation()
  const { mutateAsync: deleteBoard } = Api.board.delete.useMutation()

  const handleCreateOrUpdate = async (values: {
    name: string
    description: string
  }) => {
    try {
      if (editingBoard) {
        await updateBoard({
          where: { id: editingBoard },
          data: values,
        })
        message.success('Board updated successfully')
      } else {
        await createBoard({
          data: {
            ...values,
            userId: user?.id as string,
          },
        })
        message.success('Board created successfully')
      }
      setIsModalVisible(false)
      form.resetFields()
      setEditingBoard(null)
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBoard({ where: { id } })
      message.success('Board deleted successfully')
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const showModal = (board?: (typeof boards)[0]) => {
    if (board) {
      setEditingBoard(board.id)
      form.setFieldsValue(board)
    } else {
      setEditingBoard(null)
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Visual Boards</Title>
        <Text>
          Manage your visual boards for brainstorming and project planning
        </Text>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ marginTop: 16, marginBottom: 24 }}
        >
          Create New Board
        </Button>

        <Row gutter={[16, 16]}>
          {boards?.map(board => (
            <Col xs={24} sm={12} md={8} lg={6} key={board.id}>
              <Card
                title={board.name}
                extra={
                  <>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => showModal(board)}
                      style={{ marginRight: 8 }}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(board.id)}
                      danger
                    />
                  </>
                }
                hoverable
                onClick={() =>
                  navigate(
                    `/organizations/${organizationId}/boards/${board.id}`,
                  )
                }
              >
                <Text>{board.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title={editingBoard ? 'Edit Board' : 'Create New Board'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateOrUpdate} layout="vertical">
            <Form.Item
              name="name"
              label="Board Name"
              rules={[
                { required: true, message: 'Please input the board name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingBoard ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
