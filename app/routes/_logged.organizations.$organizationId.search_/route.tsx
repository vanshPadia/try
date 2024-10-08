import { useState, useEffect } from 'react'
import {
  Typography,
  Input,
  Select,
  DatePicker,
  Tag,
  List,
  Space,
  Spin,
} from 'antd'
import { SearchOutlined, ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SearchPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterDate, setFilterDate] = useState(null)
  const [filterTag, setFilterTag] = useState('')
  const [filterMember, setFilterMember] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const { data: searchResults, isLoading } = Api.search.findMany.useQuery({
    where: {
      organizationId,
      query: searchQuery,
      type: filterType !== 'all' ? filterType : undefined,
      date: filterDate ? dayjs(filterDate).toISOString() : undefined,
      tag: filterTag || undefined,
      memberId: filterMember || undefined,
    },
  })

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches')
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value && !recentSearches.includes(value)) {
      const updatedSearches = [value, ...recentSearches.slice(0, 4)]
      setRecentSearches(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    }
  }

  const handleItemClick = (item: any) => {
    switch (item.type) {
      case 'note':
        navigate(`/organizations/${organizationId}/notes/${item.id}`)
        break
      case 'board':
        navigate(`/organizations/${organizationId}/boards/${item.id}`)
        break
      case 'task':
        navigate(`/organizations/${organizationId}/tasks/${item.id}`)
        break
      case 'media':
        navigate(`/organizations/${organizationId}/media/${item.id}`)
        break
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Global Search</Title>
        <Text>
          Search across notes, boards, tasks, and media to find information
          quickly.
        </Text>

        <Space
          direction="vertical"
          size="large"
          style={{ width: '100%', marginTop: '24px' }}
        >
          <Search
            placeholder="Search..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
          />

          <Space wrap>
            <Select
              style={{ width: 120 }}
              placeholder="Type"
              onChange={value => setFilterType(value)}
            >
              <Option value="all">All</Option>
              <Option value="note">Notes</Option>
              <Option value="board">Boards</Option>
              <Option value="task">Tasks</Option>
              <Option value="media">Media</Option>
            </Select>
            <DatePicker onChange={date => setFilterDate(date)} />
            <Select
              style={{ width: 120 }}
              placeholder="Tag"
              onChange={value => setFilterTag(value)}
            >
              <Option value="">All Tags</Option>
              <Option value="important">Important</Option>
              <Option value="urgent">Urgent</Option>
            </Select>
            <Select
              style={{ width: 120 }}
              placeholder="Team Member"
              onChange={value => setFilterMember(value)}
            >
              <Option value="">All Members</Option>
              <Option value={user?.id}>{user?.name}</Option>
            </Select>
          </Space>

          {recentSearches.length > 0 && (
            <div>
              <Text strong>Recent Searches:</Text>
              <Space wrap style={{ marginTop: '8px' }}>
                {recentSearches.map((search, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    icon={<ClockCircleOutlined />}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Tag>
                ))}
              </Space>
            </div>
          )}

          {isLoading ? (
            <Spin size="large" />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={searchResults}
              renderItem={item => (
                <List.Item
                  onClick={() => handleItemClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <Space>
                        <Tag color="blue">{item.type}</Tag>
                        <Text type="secondary">
                          {dayjs(item.dateUpdated).format('YYYY-MM-DD HH:mm')}
                        </Text>
                      </Space>
                    }
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
