interface ShowModalProps {
  handleDelete: () => void
  showModal: string | null
  setShowModal: (value: string | null) => void
  id: string
}

export default function ShowModal({
  handleDelete,
  showModal,
  setShowModal,
}: ShowModalProps) {
  return (
    <>
      {showModal && (
        <div className=" fixed inset-0 bg-black  bg-opacity-70   flex items-center justify-center z-50  text-textlight dark:text-textdark">
          <div className="bg-bglight dark:bg-bgdark rounded-xl p-6 max-w-md w-full border-[1px] border-zinc-300 dark:border-zinc-700">
            <h2 className="text-lg font-semibold mb-4">Excluir</h2>
            <p className="mb-6">Tem certeza que deseja excluir ?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(null)}
                className="button !mb-0"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
