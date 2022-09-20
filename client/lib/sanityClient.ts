import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '5ghsx5tj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-10-21',
  token:
    'skJcKyCJvKvdpWRPFcztGKEYSjYtVvlZ98rSnQJUTidnozRHa4bzaEDluLGOnlJhu9hGnUJKGVkjmGMyY1GMWcUuUbz1WDCjukzy4RudEHHGBvXqRWTo9DC5tM2FD7GCjrPqA6xOww96Vl5naL5aYnNuJwy5D2TzqyjYaoimtw37OjGXoXeQ',
  ignoreBrowserTokenWarning: true,
})
