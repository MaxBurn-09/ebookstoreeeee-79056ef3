import * as React from 'react'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  orderId?: string
  total?: string
  books?: string[]
  orderUrl?: string
}

const OrderReady = ({ name, orderId, total, books = [], orderUrl = 'https://futuregrowacademy.co/dashboard' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your ebooks are ready to download</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>Future Grow Academy</Text>
        <Heading style={h1}>Your ebooks are ready</Heading>
        <Text style={text}>{name ? `Hi ${name},` : 'Hi there,'} thank you for your order. Your payment is confirmed and your ebooks are waiting in your library.</Text>
        {books.length > 0 && (
          <>
            <Hr style={hr} />
            {books.map((b, i) => (
              <Text key={i} style={item}>• {b}</Text>
            ))}
            <Hr style={hr} />
          </>
        )}
        {(orderId || total) && (
          <Text style={muted}>{orderId ? `Order #${orderId.slice(0, 8).toUpperCase()}` : ''}{orderId && total ? ' · ' : ''}{total ? `Total ${total}` : ''}</Text>
        )}
        <Button href={orderUrl} style={button}>Read & download</Button>
        <Text style={muted}>Sign in with this email address to access your ebooks anytime — lifetime access included.</Text>
        <Text style={footer}>Learn Today. Grow Tomorrow.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderReady,
  subject: 'Your ebooks are ready — Future Grow Academy',
  displayName: 'Order ready (ebook delivery)',
  previewData: { name: 'Priya', orderId: '3f2a9c1e-0000', total: '₹249', books: ['Stop Overthinking in 7 Days', 'The Power of No'] },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const brand = { color: '#D1002C', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 16px' }
const h1 = { color: '#0B1633', fontFamily: 'Georgia, serif', fontSize: '26px', margin: '0 0 16px' }
const text = { color: '#0B1633', fontSize: '15px', lineHeight: '24px' }
const item = { color: '#0B1633', fontSize: '15px', margin: '4px 0' }
const muted = { color: '#5E6472', fontSize: '13px', lineHeight: '20px' }
const hr = { borderColor: '#E9E5DF', margin: '16px 0' }
const button = { backgroundColor: '#D1002C', color: '#ffffff', borderRadius: '999px', padding: '14px 26px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'inline-block', margin: '12px 0 16px' }
const footer = { color: '#5E6472', fontSize: '12px', marginTop: '24px' }
