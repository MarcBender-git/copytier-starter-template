/**
 * LeadNotificationEmail — React Email component
 * Pack 6: Backend, Data & Integrations
 *
 * This is the email the CONTRACTOR receives when a lead submits the contact form.
 * Rendered by Resend. Import @react-email/components, not standard HTML.
 *
 * Design goals:
 * - Emergency leads jump out immediately (red banner)
 * - Phone number is the biggest element — tap to call from phone
 * - All lead details in one scannable view
 * - Includes a "Log In to Dashboard" link for phase 2 CRM
 * - Renders correctly in Gmail, Apple Mail, Outlook
 */

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

interface LeadPayload {
  submissionId: string
  name: string
  email: string
  phone: string
  service_needed?: string
  message?: string
  is_emergency: boolean
  source_page?: string
  submitted_at: string
}

interface LeadNotificationEmailProps {
  lead: LeadPayload
  businessName: string
}

// Format phone for tel: link and display
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return raw
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }) + ' PT'
}

export function LeadNotificationEmail({ lead, businessName }: LeadNotificationEmailProps) {
  const displayPhone = formatPhone(lead.phone)
  const telLink = `tel:+1${lead.phone.replace(/\D/g, '')}`
  const submittedAt = formatDateTime(lead.submitted_at)

  const previewText = lead.is_emergency
    ? `🚨 EMERGENCY: ${lead.name} needs help NOW — ${displayPhone}`
    : `New lead from ${lead.name}: ${lead.service_needed ?? 'General inquiry'} — ${displayPhone}`

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* ── Emergency Banner ── */}
          {lead.is_emergency && (
            <Section style={styles.emergencyBanner}>
              <Text style={styles.emergencyText}>
                🚨 EMERGENCY REQUEST — RESPOND IMMEDIATELY
              </Text>
            </Section>
          )}

          {/* ── Header ── */}
          <Section style={lead.is_emergency ? styles.headerEmergency : styles.header}>
            <Text style={styles.headerLabel}>
              {lead.is_emergency ? 'Emergency Lead' : 'New Lead'} — {businessName}
            </Text>
            <Heading style={styles.leadName}>{lead.name}</Heading>
            <Text style={styles.submittedAt}>{submittedAt}</Text>
          </Section>

          {/* ── Phone — the most important thing ── */}
          <Section style={styles.phoneCTA}>
            <Text style={styles.phoneLabel}>CALL THIS LEAD NOW</Text>
            <Link href={telLink} style={styles.phoneNumber}>
              {displayPhone}
            </Link>
            <Text style={styles.phoneHint}>
              Tap to call · Best response time within 30 minutes
            </Text>
          </Section>

          {/* ── Lead Details ── */}
          <Section style={styles.detailsSection}>
            <Heading as="h2" style={styles.sectionTitle}>Lead Details</Heading>

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>Name</Column>
              <Column style={styles.detailValue}>{lead.name}</Column>
            </Row>
            <Hr style={styles.detailDivider} />

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>Phone</Column>
              <Column style={styles.detailValue}>
                <Link href={telLink} style={styles.inlineLink}>{displayPhone}</Link>
              </Column>
            </Row>
            <Hr style={styles.detailDivider} />

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>Email</Column>
              <Column style={styles.detailValue}>
                <Link href={`mailto:${lead.email}`} style={styles.inlineLink}>
                  {lead.email}
                </Link>
              </Column>
            </Row>
            <Hr style={styles.detailDivider} />

            {lead.service_needed && (
              <>
                <Row style={styles.detailRow}>
                  <Column style={styles.detailLabel}>Service</Column>
                  <Column style={styles.detailValue}>{lead.service_needed}</Column>
                </Row>
                <Hr style={styles.detailDivider} />
              </>
            )}

            <Row style={styles.detailRow}>
              <Column style={styles.detailLabel}>Emergency?</Column>
              <Column style={styles.detailValue}>
                {lead.is_emergency
                  ? <Text style={styles.emergencyBadge}>YES — Urgent</Text>
                  : 'No'}
              </Column>
            </Row>

            {lead.source_page && (
              <>
                <Hr style={styles.detailDivider} />
                <Row style={styles.detailRow}>
                  <Column style={styles.detailLabel}>From page</Column>
                  <Column style={styles.detailValue}>{lead.source_page}</Column>
                </Row>
              </>
            )}
          </Section>

          {/* ── Message ── */}
          {lead.message && (
            <Section style={styles.messageSection}>
              <Heading as="h2" style={styles.sectionTitle}>Their Message</Heading>
              <Text style={styles.messageText}>"{lead.message}"</Text>
            </Section>
          )}

          {/* ── Response Tips ── */}
          <Section style={styles.tipsSection}>
            <Heading as="h2" style={styles.sectionTitle}>Response Tips</Heading>
            <Text style={styles.tipItem}>
              ✓ Call within 5 minutes — leads go cold after 30
            </Text>
            <Text style={styles.tipItem}>
              ✓ If no answer, leave a voicemail and send a text
            </Text>
            <Text style={styles.tipItem}>
              ✓ Confirm the service needed and offer a free estimate
            </Text>
            {lead.is_emergency && (
              <Text style={{ ...styles.tipItem, color: '#DC2626', fontWeight: '700' }}>
                ✓ Emergency: offer immediate dispatch or next-available window
              </Text>
            )}
          </Section>

          {/* ── Footer ── */}
          <Hr style={styles.footerDivider} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              This lead was submitted via your website contact form.
              Submission ID: {lead.submissionId}
            </Text>
            <Text style={styles.footerText}>
              <Link href={`mailto:support@copytier.com`} style={styles.footerLink}>
                Report a problem
              </Link>
              {' · '}
              Powered by Copytier
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// ---------------------------------------------------------------------------
// Inline styles — required for email client compatibility
// Use only shorthand-safe CSS properties
// ---------------------------------------------------------------------------
const styles = {
  body: {
    backgroundColor: '#F3F4F6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: '0',
    padding: '0',
  },
  container: {
    backgroundColor: '#FFFFFF',
    margin: '32px auto',
    maxWidth: '600px',
    borderRadius: '8px',
    overflow: 'hidden' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  emergencyBanner: {
    backgroundColor: '#DC2626',
    padding: '12px 24px',
    textAlign: 'center' as const,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '0.05em',
  },
  header: {
    backgroundColor: '#1E3A5F',
    padding: '28px 32px',
  },
  headerEmergency: {
    backgroundColor: '#7F1D1D',
    padding: '28px 32px',
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    margin: '0 0 8px 0',
  },
  leadName: {
    color: '#FFFFFF',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
  },
  submittedAt: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px',
    margin: '0',
  },
  phoneCTA: {
    backgroundColor: '#F0FDF4',
    borderTop: '4px solid #16A34A',
    padding: '24px 32px',
    textAlign: 'center' as const,
  },
  phoneLabel: {
    color: '#15803D',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    margin: '0 0 8px 0',
  },
  phoneNumber: {
    color: '#15803D',
    fontSize: '36px',
    fontWeight: '800',
    display: 'block',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  phoneHint: {
    color: '#6B7280',
    fontSize: '12px',
    margin: '8px 0 0 0',
  },
  detailsSection: {
    padding: '24px 32px',
  },
  sectionTitle: {
    color: '#111827',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    margin: '0 0 16px 0',
  },
  detailRow: {
    padding: '10px 0',
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: '13px',
    fontWeight: '600',
    width: '120px',
    verticalAlign: 'top',
  },
  detailValue: {
    color: '#111827',
    fontSize: '14px',
    verticalAlign: 'top',
  },
  detailDivider: {
    borderColor: '#F3F4F6',
    margin: '0',
  },
  inlineLink: {
    color: '#1D4ED8',
    textDecoration: 'none',
  },
  emergencyBadge: {
    color: '#DC2626',
    fontWeight: '700',
    margin: '0',
  },
  messageSection: {
    backgroundColor: '#F9FAFB',
    borderLeft: '4px solid #D1D5DB',
    margin: '0 32px 24px',
    padding: '16px 20px',
    borderRadius: '0 4px 4px 0',
  },
  messageText: {
    color: '#374151',
    fontSize: '15px',
    fontStyle: 'italic',
    lineHeight: '1.6',
    margin: '8px 0 0 0',
  },
  tipsSection: {
    backgroundColor: '#FFFBEB',
    borderTop: '1px solid #FDE68A',
    borderBottom: '1px solid #FDE68A',
    padding: '20px 32px',
  },
  tipItem: {
    color: '#374151',
    fontSize: '13px',
    margin: '4px 0',
    lineHeight: '1.5',
  },
  footerDivider: {
    borderColor: '#E5E7EB',
    margin: '0',
  },
  footer: {
    padding: '20px 32px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#9CA3AF',
    fontSize: '11px',
    margin: '4px 0',
  },
  footerLink: {
    color: '#6B7280',
    textDecoration: 'underline',
  },
} as const
