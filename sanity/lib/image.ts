import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

export function urlForImageString(
  source: SanityImageSource,
  width = 800,
  height = 450
): string {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .format('webp')
    .quality(80)
    .url()
}
