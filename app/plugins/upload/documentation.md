# Upload Plugin

The Upload plugin integrates with AWS S3 to provide file storage functionalities.

Note: If AWS environment variables are not defined, the plugin defaults to your server disk. Make sure you defined those in production or activated the Marblism Upload addon.

## Environment variables

```.env
// Setup your own AWS account & buckets
SERVER_UPLOAD_AWS_ACCESS_KEY=
SERVER_UPLOAD_AWS_SECRET_KEY=
SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME=
SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME=
SERVER_UPLOAD_AWS_REGION=

// OR use Marblism addon
SERVER_UPLOAD_MARBLISM_API_KEY=
```

## Client

Use the upload hooks for client-side functionalities.

### Upload a public file

```tsx
import { useUploadPublic } from '@/plugins/upload/client'

const { mutateAsync: uploadPublic } = useUploadPublic()

const handleUpload = async (file: File) => {
  const { url } = await uploadPublic({ file })

  console.log(url)
}
```

### Upload a private file

```tsx
import { Api } from '@/core/trpc'
import { useUploadPrivate } from '@/plugins/upload/client'

const { mutateAsync: uploadPrivate } = useUploadPrivate()
const { mutateAsync: fromPrivateToPublicUrl } =
  Api.upload.fromPrivateToPublicUrl.useMutation()

const handleUpload = async (file: File) => {
  const { url } = await uploadPrivate({ file })

  const { url: urlPublic } = await fromPrivateToPublicUrl({ url })

  console.log(url) // private url that you can store in your database
  console.log(urlPublic) // public url available for 1 hour
}
```

## Server

Use the `UploadServer.service` for server-side functionalities.

```tsx
import { AiServer } from '@/plugins/ai'

AiServer.service.uploadPublic(...)
AiServer.service.uploadPrivate(...)
AiServer.service.fromPrivateToPublicUrl(...)
```
