import Head from 'next/head'
import Link from 'next/link'
import { Heading, Flex, Stack, Divider } from '@chakra-ui/react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ContentBanner } from '../../components/ContentBanner'

interface LessonProps {
  lessons: {
    frontMatter: any
    slug: string
  }[]
}

const Lessons: React.FC<LessonProps> = ({ lessons }) => {
  return (
    <>
      <Head>
        <title>D_D Academy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" py={5} px={[4, 10, 16]} direction="column" minH="90vh">
        <Stack spacing={5} direction="column">
          <Heading
            as="h2"
            textAlign="center"
            color="#F96C9D"
            apply="mdx.h2"
            fontSize="3xl"
          >
            Smart Contract Development
          </Heading>
          <Heading apply="mdx.h3" as="h3" textAlign="center" fontSize="2xl">
            Solidity Track Lessons
          </Heading>
          {lessons.map((lesson: any, idx: number) => (
            <Link key={lesson.slug} href={'/lessons/' + lesson.slug} passHref>
              <ContentBanner lesson={lesson} idx={idx} />
            </Link>
          ))}
        </Stack>
      </Flex>
    </>
  )
}

export default Lessons

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('lessons'))
  const lessons = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('lessons', filename),
      'utf-8',
    )
    const { data: frontMatter } = matter(markdownWithMeta)
    return {
      frontMatter,
      slug: filename.split('.')[0],
    }
  })
  return {
    props: {
      lessons,
    },
  }
}
