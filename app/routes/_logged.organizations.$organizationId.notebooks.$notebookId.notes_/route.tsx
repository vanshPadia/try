import { useState } from 'react'
import {
  Typography,
  Input,
  Button,
  List,
  Tag,
  Space,
  Row,
  Col,
  Spin,
} from 'antd'
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NotesListPage() {
  const { user } = useUserContext()
  const { notebookId } = useParams()
  const navigate = useNavigate()

  const [searchKeyword, setSearchKeyword] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [filterDate, setFilterDate] = useState('')

  const { data: notebook, isLoading: isLoadingNotebook } =
    Api.notebook.findUnique.useQuery({
      where: { id: notebookId },
      include: { notes: true },
    })

  const { data: notes, isLoading: isLoadingNotes } = Api.note.findMany.useQuery(
    {
      where: {
        notebookId: notebookId,
        title: { contains: searchKeyword, mode: 'insensitive' },
      },
      orderBy: { dateUpdated: 'desc' },
    },
  )

  const createNoteMutation = Api.note.create.useMutation()

  const filteredNotes = notes?.filter(
    note =>
      (!filterTag || note.content?.includes(filterTag)) &&
      (!filterDate ||
        dayjs(note.dateCreated).format('YYYY-MM-DD') === filterDate),
  )

  const handleCreateNote = async () => {
    const newNote = await createNoteMutation.mutateAsync({
      data: {
        title: 'New Note',
        content: '',
        notebookId: notebookId!,
      },
    })
    navigate(`/organizations/${user?.id}/notes/${newNote.id}`)
  }

  if (isLoadingNotebook || isLoadingNotes) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={18} lg={16} xl={14}>
          <Title level={2}>Notes in {notebook?.name}</Title>
          <Text>View, search, and manage your notes within this notebook.</Text>

          <Space
            direction="vertical"
            size="large"
            style={{ width: '100%', marginTop: '2rem' }}
          >
            <Space>
              <Input
                placeholder="Search notes"
                prefix={<SearchOutlined />}
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{ width: 200 }}
              />
              <Input
                placeholder="Filter by tag"
                prefix={<FilterOutlined />}
                value={filterTag}
                onChange={e => setFilterTag(e.target.value)}
                style={{ width: 150 }}
              />
              <Input
                type="date"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                style={{ width: 150 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateNote}
              >
                New Note
              </Button>
            </Space>

            <List
              itemLayout="vertical"
              dataSource={filteredNotes}
              renderItem={note => (
                <List.Item
                  key={note.id}
                  actions={[
                    <Text key="date">
                      Created: {dayjs(note.dateCreated).format('YYYY-MM-DD')}
                    </Text>,
                    <Text key="updated">
                      Updated: {dayjs(note.dateUpdated).format('YYYY-MM-DD')}
                    </Text>,
                  ]}
                  extra={
                    <Space>
                      <Tag color="blue">Sample Tag</Tag>
                    </Space>
                  }
                >
                  <List.Item.Meta
                    title={
                      <a
                        onClick={() =>
                          navigate(
                            `/organizations/${user?.id}/notes/${note.id}`,
                          )
                        }
                      >
                        {note.title}
                      </a>
                    }
                    description={note.content?.substring(0, 100) + '...'}
                  />
                </List.Item>
              )}
            />
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
