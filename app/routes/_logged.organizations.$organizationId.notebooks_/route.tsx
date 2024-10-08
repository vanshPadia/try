import { Typography, List, Button, Input, Modal, message, Space } from 'antd'
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

export default function NotebooksPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [editingNotebook, setEditingNotebook] = useState<any>(null)
  const [newNotebookName, setNewNotebookName] = useState('')
  const [newNotebookDescription, setNewNotebookDescription] = useState('')

  const { data: notebooks, refetch } = Api.notebook.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dateUpdated: 'desc' },
  })

  const { mutateAsync: createNotebook } = Api.notebook.create.useMutation()
  const { mutateAsync: updateNotebook } = Api.notebook.update.useMutation()
  const { mutateAsync: deleteNotebook } = Api.notebook.delete.useMutation()

  const handleCreateNotebook = async () => {
    try {
      await createNotebook({
        data: {
          name: newNotebookName,
          description: newNotebookDescription,
          userId: user?.id as string,
        },
      })
      message.success('Notebook created successfully')
      setIsModalVisible(false)
      setNewNotebookName('')
      setNewNotebookDescription('')
      refetch()
    } catch (error) {
      message.error('Failed to create notebook')
    }
  }

  const handleUpdateNotebook = async () => {
    try {
      await updateNotebook({
        where: { id: editingNotebook.id },
        data: {
          name: newNotebookName,
          description: newNotebookDescription,
        },
      })
      message.success('Notebook updated successfully')
      setIsModalVisible(false)
      setEditingNotebook(null)
      refetch()
    } catch (error) {
      message.error('Failed to update notebook')
    }
  }

  const handleDeleteNotebook = async (id: string) => {
    try {
      await deleteNotebook({ where: { id } })
      message.success('Notebook deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete notebook')
    }
  }

  const showModal = (mode: 'create' | 'edit', notebook?: any) => {
    setModalMode(mode)
    if (mode === 'edit' && notebook) {
      setEditingNotebook(notebook)
      setNewNotebookName(notebook.name || '')
      setNewNotebookDescription(notebook.description || '')
    } else {
      setNewNotebookName('')
      setNewNotebookDescription('')
    }
    setIsModalVisible(true)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>My Notebooks</Title>
        <Text>
          Manage your notebooks, folders, and sections to organize your notes.
        </Text>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal('create')}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          Create New Notebook
        </Button>

        <List
          itemLayout="horizontal"
          dataSource={notebooks}
          renderItem={notebook => (
            <List.Item
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showModal('edit', notebook)}
                >
                  Edit
                </Button>,
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteNotebook(notebook.id)}
                  danger
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <a
                    onClick={() =>
                      navigate(
                        `/organizations/${organizationId}/notebooks/${notebook.id}/notes`,
                      )
                    }
                  >
                    {notebook.name}
                  </a>
                }
                description={
                  <Space direction="vertical">
                    <Text>{notebook.description}</Text>
                    <Text type="secondary">
                      Last updated:{' '}
                      {dayjs(notebook.dateUpdated).format('MMMM D, YYYY')}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />

        <Modal
          title={
            modalMode === 'create' ? 'Create New Notebook' : 'Edit Notebook'
          }
          visible={isModalVisible}
          onOk={
            modalMode === 'create' ? handleCreateNotebook : handleUpdateNotebook
          }
          onCancel={() => setIsModalVisible(false)}
        >
          <Input
            placeholder="Notebook Name"
            value={newNotebookName}
            onChange={e => setNewNotebookName(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Input.TextArea
            placeholder="Notebook Description"
            value={newNotebookDescription}
            onChange={e => setNewNotebookDescription(e.target.value)}
            rows={4}
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
