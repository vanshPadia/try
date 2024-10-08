import { Typography, Card, List, Space, Row, Col, Button } from 'antd'
import {
  BookOutlined,
  CheckSquareOutlined,
  ProjectOutlined,
  BellOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const { user, organization } = useUserContext()

  const { data: recentNotes } = Api.note.findMany.useQuery({
    take: 5,
    orderBy: { dateUpdated: 'desc' },
    include: { notebook: true },
  })

  const { data: recentTasks } = Api.task.findMany.useQuery({
    take: 5,
    orderBy: { dateUpdated: 'desc' },
    include: { board: true },
  })

  const { data: recentBoards } = Api.board.findMany.useQuery({
    take: 5,
    orderBy: { dateUpdated: 'desc' },
  })

  const { data: recentNotifications } = Api.notification.findMany.useQuery({
    take: 5,
    orderBy: { dateCreated: 'desc' },
    where: { userId: user?.id },
  })

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}
      >
        <Title level={2}>Welcome to Your Dashboard</Title>
        <Text>
          Here's an overview of your recent activities and quick access to your
          work.
        </Text>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title="Recent Notes"
              extra={
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/organizations/${organization?.id}/notebooks`)
                  }
                >
                  View All
                </Button>
              }
            >
              <List
                dataSource={recentNotes}
                renderItem={note => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<BookOutlined />}
                      title={
                        <a
                          onClick={() =>
                            navigate(
                              `/organizations/${organization?.id}/notes/${note.id}`,
                            )
                          }
                        >
                          {note.title}
                        </a>
                      }
                      description={`Updated ${dayjs(
                        note.dateUpdated,
                      ).fromNow()} in ${note.notebook?.name}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title="Recent Tasks"
              extra={
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/organizations/${organization?.id}/tasks`)
                  }
                >
                  View All
                </Button>
              }
            >
              <List
                dataSource={recentTasks}
                renderItem={task => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CheckSquareOutlined />}
                      title={
                        <a
                          onClick={() =>
                            navigate(
                              `/organizations/${organization?.id}/boards/${task.boardId}`,
                            )
                          }
                        >
                          {task.title}
                        </a>
                      }
                      description={`Status: ${task.status} - Updated ${dayjs(
                        task.dateUpdated,
                      ).fromNow()} in ${task.board?.name}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title="Recent Boards"
              extra={
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/organizations/${organization?.id}/boards`)
                  }
                >
                  View All
                </Button>
              }
            >
              <List
                dataSource={recentBoards}
                renderItem={board => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ProjectOutlined />}
                      title={
                        <a
                          onClick={() =>
                            navigate(
                              `/organizations/${organization?.id}/boards/${board.id}`,
                            )
                          }
                        >
                          {board.name}
                        </a>
                      }
                      description={`Updated ${dayjs(
                        board.dateUpdated,
                      ).fromNow()}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title="Recent Notifications"
              extra={
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/organizations/${organization?.id}/notifications`)
                  }
                >
                  View All
                </Button>
              }
            >
              <List
                dataSource={recentNotifications}
                renderItem={notification => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<BellOutlined />}
                      title={notification.content}
                      description={`Received ${dayjs(
                        notification.dateCreated,
                      ).fromNow()}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
