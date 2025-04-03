import Image from "next/image"

interface StrapiMediaProps {
  media: any
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
  alt?: string
}

const getStrapiMedia = (media: any) => {
  if (!media) return null

  const { url } = media.data.attributes
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${url}`
}

const StrapiMedia = ({
  media,
  className,
  priority = false,
  fill = false,
  width,
  height,
  alt = "",
}: StrapiMediaProps) => {
  if (!media || !media.data) {
    return null
  }

  const { alternativeText } = media.data.attributes
  const imageUrl = getStrapiMedia(media)

  if (!imageUrl) {
    return null
  }

  if (fill) {
    return (
      <Image
        src={imageUrl || "/placeholder.svg?height=1000&width=1000"}
        alt={alt || alternativeText || ""}
        className={className}
        fill
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={imageUrl || "/placeholder.svg?height=1000&width=1000"}
      alt={alt || alternativeText || ""}
      width={width || media.data.attributes.width || 1000}
      height={height || media.data.attributes.height || 1000}
      className={className}
      priority={priority}
    />
  )
}

export default StrapiMedia

