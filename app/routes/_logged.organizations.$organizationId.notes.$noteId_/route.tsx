import React, { useState, useEffect } from 'react'
import {
  Typography,
  Input,
  Button,
  Space,
  List,
  Avatar,
  Mentions,
  message,
} from 'antd'
import {
  FileImageOutlined,
  VideoCameraOutlined,
  PaperClipOutlined,
  SaveOutlined,
  TeamOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { TextArea } = Input
import { Prisma } from '@prisma/client'
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NoteEditorPage() {
  const { organizationId, noteId } = useParams() as {
    organizationId: string
    noteId: string
  }
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [note, setNote] = useState<Prisma.NoteGetPayload<{}>>({
    id: '',
    title: '',
    content: '',
    notebookId: '',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  })
  const [collaborators, setCollaborators] = useState<
    Array<{ id: string; name: string; avatar: string }>
  >([])
  const [comments, setComments] = useState<
    Array<{ user: string; content: string; avatar?: string }>
  >([])
  const [newComment, setNewComment] = useState('')
  const { mutateAsync: upload } = useUploadPublic()

  const { data: noteData, isLoading } = Api.note.findUnique.useQuery({
    where: { id: noteId },
  }) as { data: Prisma.NoteGetPayload<{}> | null; isLoading: boolean }
  const { mutateAsync: updateNote } = Api.note.update.useMutation()
  const { mutateAsync: createMedia } = Api.media.create.useMutation()

  useEffect(() => {
    if (noteData) {
      setNote(noteData)
    }
  }, [noteData])

  const { emit } = SocketClient.useEvent(
    'note-update',
    (payload: { noteId: string; note: Prisma.NoteGetPayload<{}> }) => {
      if (payload.noteId === noteId) {
        setNote(payload.note)
      }
    },
  )

  const handleNoteChange = (
    field: keyof Prisma.NoteGetPayload<{}>,
    value: string,
  ) => {
    const updatedNote = { ...note, [field]: value }
    setNote(updatedNote)
    emit({
      payload: { noteId, note: updatedNote },
      userIds: collaborators.map(c => c.id),
    })
  }

  const handleSave = async () => {
    try {
      await updateNote({ where: { id: noteId }, data: note })
      message.success('Note saved successfully')
    } catch (error) {
      message.error('Failed to save note')
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const { url } = await upload({ file })
        const media = await createMedia({
          data: { mediaUrl: url, type: file.type },
        })
        const updatedContent = `${note.content}\n![${file.name}](${url})`
        handleNoteChange('content', updatedContent)
      } catch (error) {
        message.error('Failed to upload file')
      }
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { user: user?.name || 'Anonymous', content: newComment },
      ])
      setNewComment('')
    }
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}
      >
        <Title level={2}>Note Editor</Title>
        <Paragraph>
          Create and edit notes with rich text and Markdown formatting.
        </Paragraph>

        <Input
          placeholder="Note Title"
          value={note.title || ''}
          onChange={e => handleNoteChange('title', e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <TextArea
          rows={10}
          value={note.content || ''}
          onChange={e => handleNoteChange('content', e.target.value)}
          placeholder="Write your note here. You can use Markdown for formatting."
          style={{ marginBottom: 16 }}
        />

        <Space>
          <Button icon={<SaveOutlined />} onClick={handleSave}>
            Save
          </Button>
          <input
            type="file"
            id="fileUpload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            multiple
          />
          <Button
            icon={<FileImageOutlined />}
            onClick={() => document.getElementById('fileUpload')?.click()}
          >
            Add Image
          </Button>
          <Button
            icon={<VideoCameraOutlined />}
            onClick={() => document.getElementById('fileUpload')?.click()}
          >
            Add Video
          </Button>
          <Button
            icon={<PaperClipOutlined />}
            onClick={() => document.getElementById('fileUpload')?.click()}
          >
            Attach File
          </Button>
        </Space>

        <Title level={3} style={{ marginTop: 24 }}>
          Preview
        </Title>
        <div
          style={{ border: '1px solid #d9d9d9', padding: 16, borderRadius: 4 }}
        >
          <Paragraph>{note.content}</Paragraph>
        </div>

        <Title level={3} style={{ marginTop: 24 }}>
          Collaborators
        </Title>
        <Space>
          <Avatar.Group>
            {collaborators?.map(collaborator => (
              <Avatar key={collaborator.id} src={collaborator.avatar}>
                {collaborator.name[0]}
              </Avatar>
            ))}
          </Avatar.Group>
          <Button icon={<TeamOutlined />}>Invite</Button>
        </Space>

        <Title level={3} style={{ marginTop: 24 }}>
          Comments
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar}>{item.user[0]}</Avatar>}
                title={item.user}
                description={item.content}
              />
            </List.Item>
          )}
        />
        <Space.Compact style={{ width: '100%' }}>
          <Mentions
            style={{ width: '100%' }}
            value={newComment}
            onChange={setNewComment}
            placeholder="Add a comment or @mention a team member"
            options={collaborators?.map(c => ({
              value: c.name,
              label: c.name,
            }))}
          />
          <Button type="primary" onClick={handleAddComment}>
            Comment
          </Button>
        </Space.Compact>
      </Space>
    </PageLayout>
  )
}
