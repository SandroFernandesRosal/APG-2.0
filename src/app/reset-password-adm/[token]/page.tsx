import ResetPasswordFormAdm from '@/components/reset-form-adm'

interface ResetPasswordAdmProps {
  params: Promise<{
    token: string
  }>
}

export default async function ResetPasswordAdm({
  params,
}: ResetPasswordAdmProps) {
  const { token } = await params

  return (
    <div className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
      <ResetPasswordFormAdm token={token} />
    </div>
  )
}
