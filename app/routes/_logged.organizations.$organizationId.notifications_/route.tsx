import { Typography, List, Button, Switch, Space, message } from 'antd'
import { BellOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NotificationsPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const { organizationId } = useParams()

  const {
    data: notifications,
    isLoading,
    refetch,
  } = Api.notification.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dateCreated: 'desc' },
  })

  const { mutateAsync: updateNotification } =
    Api.notification.update.useMutation()

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      await updateNotification({ where: { id }, data: { isRead } })
      refetch()
      message.success(`Notification marked as ${isRead ? 'read' : 'unread'}`)
    } catch (error) {
      message.error('Failed to update notification')
    }
  }

  const handleNotificationClick = (notification: any) => {
    // This is a placeholder. You'll need to implement the actual navigation logic
    // based on the notification type and related content
    if (notification.content.includes('note')) {
      navigate(`/organizations/${organizationId}/notes/some-note-id`)
    } else if (notification.content.includes('task')) {
      navigate(`/organizations/${organizationId}/tasks`)
    } else if (notification.content.includes('board')) {
      navigate(`/organizations/${organizationId}/boards/some-board-id`)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>
            <BellOutlined /> Notifications
          </Title>
          <Text>
            Stay informed about mentions, comments, and task assignments.
          </Text>

          {isLoading ? (
            <Text>Loading notifications...</Text>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      checked={item.isRead}
                      onChange={checked => handleMarkAsRead(item.id, checked)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Button
                        type="link"
                        onClick={() => handleNotificationClick(item)}
                      >
                        {item.content}
                      </Button>
                    }
                    description={dayjs(item.dateCreated).format(
                      'MMMM D, YYYY h:mm A',
                    )}
                  />
                </List.Item>
              )}
            />
          )}
        </Space>
      </div>
    </PageLayout>
  )
}
