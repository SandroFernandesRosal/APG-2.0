'use client'
import { Endereco } from '@/data/types/endereco'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import ItemEndereco from './ItemEndereco'
import AddEndereco from './crud/AddEndereco'
import SkeletonEndereco from './skeleton/SkeletonEndereco'
import EditEndereco from './crud/EditEndereco'

export default function Locais() {
  const [data, setData] = useState<Endereco[]>([])
  const [loading, setLoading] = useState(true)
  const [openEndereco, setOpenEndereco] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Endereco | null>(null)
  const [coordinates, setCoordinates] = useState<{
    [key: string]: [number, number]
  }>({})
  const token = useToken()

  useEffect(() => {
    setLoading(true)
    api
      .get('/endereco')
      .then((response) => {
        setData(response.data)
        setLoading(false)
        response.data.forEach((endereco: Endereco) => {
          geocodeAddress(endereco)
        })
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const geocodeAddress = async (endereco: Endereco) => {
    const { rua, numero, local, cidade, cep } = endereco
    const enderecoFormatado = `${rua}, ${numero}, ${local}, ${cidade}, ${cep}`
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      enderecoFormatado,
    )}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        setCoordinates((prev) => ({
          ...prev,
          [endereco.id]: [parseFloat(lat), parseFloat(lon)],
        }))
      }
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error)
    }
  }

  return (
    <section className="mb-5 flex w-[100vw] flex-col items-center">
      {token && (
        <>
          {openEndereco === false && (
            <div className="button" onClick={() => setOpenEndereco(true)}>
              Adicionar endereço
            </div>
          )}

          {openEndereco && (
            <div className="md:min-w-[35%]">
              <AddEndereco
                openEndereco={openEndereco}
                setOpenEndereco={setOpenEndereco}
              />
            </div>
          )}
        </>
      )}

      <div className="relative -top-[30px] mb-2 flex w-full flex-wrap justify-center gap-x-5 p-1 px-2 pt-10 md:gap-x-5">
        {!loading ? (
          data.length < 1 ? (
            <p>Nenhum endereço cadastrado.</p>
          ) : (
            data.map((item) => (
              <ItemEndereco
                key={item.id}
                item={item}
                token={token}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                setSelectedProduct={setSelectedProduct}
                coordinates={coordinates[item.id]}
              />
            ))
          )
        ) : (
          <SkeletonEndereco />
        )}
      </div>

      {openEdit && selectedProduct && (
        <EditEndereco
          localInitial={selectedProduct.local}
          ruaInitial={selectedProduct.rua}
          cepInitial={selectedProduct.cep}
          id={selectedProduct.id}
          numeroInitial={selectedProduct.numero}
          cidadeInitial={selectedProduct.cidade}
          setOpenEdit={setOpenEdit}
        />
      )}
    </section>
  )
}
