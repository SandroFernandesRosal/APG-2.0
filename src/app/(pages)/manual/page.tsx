import manualData from '@/data/manual.json'
import ManualClient from '@/components/manual-client'

export default function ManualPage() {
  return <ManualClient manualContent={manualData.content} />
}
