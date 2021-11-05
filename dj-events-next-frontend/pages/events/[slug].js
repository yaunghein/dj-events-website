import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { Layout } from '@dj-components'
import { API_URL } from '@dj-config/index'
import styles from '@dj-styles/Event.module.css'
// import { getPlaiceholder } from 'plaiceholder'

export default function EventPage({ evt }) {
  const deleteEvent = () => {
    console.log('Deleted!')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='!#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.large.url}
              width={1100}
              height={600}
              alt={evt.name}
              // placeholder='blur'
              // blurDataURL={evt.base64}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const resp = await fetch(`${API_URL}/events`)
  const events = await resp.json()
  const paths = events.map(evt => ({
    params: { slug: evt.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const resp = await fetch(`${API_URL}/events?slug=${context.params.slug}`)
  const events = await resp.json()
  // const { base64 } = await getPlaiceholder(events[0].image.formats.thumbnail.url)
  // const singleEventWithBlurPlaceholder = { ...events[0], base64 }

  return {
    props: { evt: events[0] },
    revalidate: 1,
  }
}

// ServerSide
// export async function getServerSideProps(context) {
//   const { slug } = context.query
//   const resp = await fetch(`${API_URL}/events/${slug}`)
//   const data = await resp.json()

//   return {
//     props: {
//       evt: data[0],
//     },
//   }
// }
