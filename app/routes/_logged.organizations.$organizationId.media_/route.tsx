import { useState } from 'react'
import {
  Typography,
  Upload,
  message,
  Card,
  Row,
  Col,
  Modal,
  Input,
  Button,
} from 'antd'
import {
  InboxOutlined,
  FolderOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { Dragger } = Upload
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MultimediaLibraryPage() {
  const { organizationId } = useParams()
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [newFolderName, setNewFolderName] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewMedia, setPreviewMedia] = useState<any>(null)

  const { data: mediaFiles, refetch } = Api.media.findMany.useQuery({
    where: { type: selectedFolder || undefined },
  })

  const { mutateAsync: createMedia } = Api.media.create.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  const handleUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      await createMedia({
        data: {
          mediaUrl: url,
          type: file.type.split('/')[0],
        },
      })
      message.success('File uploaded successfully')
      refetch()
    } catch (error) {
      message.error('Upload failed')
    }
  }

  const handlePreview = (media: any) => {
    setPreviewMedia(media)
    setPreviewVisible(true)
  }

  const renderMediaItem = (media: any) => {
    let icon
    switch (media.type) {
      case 'image':
        icon = <FileImageOutlined />
        break
      case 'video':
        icon = <VideoCameraOutlined />
        break
      default:
        icon = <FileOutlined />
    }

    return (
      <Col xs={24} sm={12} md={8} lg={6} key={media.id}>
        <Card hoverable cover={icon} onClick={() => handlePreview(media)}>
          <Card.Meta title={media.mediaUrl.split('/').pop()} />
        </Card>
      </Col>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Multimedia Library</Title>
        <Text>Upload, organize, and preview your media files.</Text>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={6}>
            <Card title="Folders">
              <Button
                icon={<FolderOutlined />}
                onClick={() => setSelectedFolder(null)}
                block
              >
                All Files
              </Button>
              <Button
                icon={<FileImageOutlined />}
                onClick={() => setSelectedFolder('image')}
                block
              >
                Images
              </Button>
              <Button
                icon={<VideoCameraOutlined />}
                onClick={() => setSelectedFolder('video')}
                block
              >
                Videos
              </Button>
              <Button
                icon={<FileOutlined />}
                onClick={() => setSelectedFolder('application')}
                block
              >
                Documents
              </Button>
              <Button
                onClick={() => setIsModalVisible(true)}
                block
                style={{ marginTop: '10px' }}
              >
                New Folder
              </Button>
            </Card>
          </Col>
          <Col span={18}>
            <Dragger
              customRequest={({ file }) => handleUpload(file as File)}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {mediaFiles?.map(renderMediaItem)}
            </Row>
          </Col>
        </Row>

        <Modal
          title="Create New Folder"
          visible={isModalVisible}
          onOk={() => {
            // Here you would typically create a new folder in your backend
            message.success(`Folder "${newFolderName}" created`)
            setIsModalVisible(false)
            setNewFolderName('')
          }}
          onCancel={() => setIsModalVisible(false)}
        >
          <Input
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
          />
        </Modal>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          {previewMedia && previewMedia.type === 'image' && (
            <img
              alt="preview"
              style={{ width: '100%' }}
              src={previewMedia.mediaUrl}
            />
          )}
          {previewMedia && previewMedia.type === 'video' && (
            <video width="100%" controls>
              <source src={previewMedia.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {previewMedia && previewMedia.type === 'application' && (
            <div>
              <p>File: {previewMedia.mediaUrl.split('/').pop()}</p>
              <a
                href={previewMedia.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open File
              </a>
            </div>
          )}
        </Modal>
      </div>
    </PageLayout>
  )
}
