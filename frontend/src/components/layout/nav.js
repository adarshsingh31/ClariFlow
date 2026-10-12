import { Box, LayoutGrid, MessageSquare } from 'lucide-react'

export const NAV = [
  { to: '/app', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/app/orders', label: 'Orders', icon: Box },
  { to: '/app/support', label: 'Support', icon: MessageSquare, tag: 'PREVIEW' },
]
