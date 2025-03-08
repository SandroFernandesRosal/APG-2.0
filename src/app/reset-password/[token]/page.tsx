import ResetPasswordForm from '@/components/reset-form'

interface ResetPasswordPageProps {
  params: Promise<{
    token: string
  }>
}
export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params

  return (
    <div className="mb-2 mt-4 flex min-h-screen flex-col items-center gap-5 pt-24 md:mt-0 md:pt-[165px]">
      <ResetPasswordForm token={token} />
    </div>
  )
}
