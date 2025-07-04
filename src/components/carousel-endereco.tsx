'use client'

import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useShowModal } from '@/store/useStore'
import { Endereco } from '@/data/types/endereco'
import SkeletonNew from './skeleton/SkeletonNew'
import { useToken } from '@/hooks/useToken'
import EditEndereco from './crud/EditEndereco'
import RemoveEndereco from './crud/RemoveEndereco'
import AddEndereco from './crud/AddEndereco'
import EnderecosHeader from './enderecos-header'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const HouseIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function CarouselEndereco() {
  const [data, setData] = useState<Endereco[]>([])
  const [loading, setLoading] = useState(true)
  const token = useToken()
  const [openEndereco, setOpenEndereco] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Endereco | null>(null)
  const { showModal, setShowModal } = useShowModal()
  const [coordinates, setCoordinates] = useState<{
    [key: string]: [number, number]
  }>({})

  const podeGerenciar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/endereco', { cache: 'no-store' })
        if (!res.ok) throw new Error('Erro ao buscar endereços')
        const json = await res.json()
        if (Array.isArray(json)) {
          setData(json)
          json.forEach((endereco: Endereco) => geocodeAddress(endereco))
        } else {
          setData([])
        }
      } catch (err) {
        console.error(err)
        setData([])
      } finally {
        setLoading(false)
      }
    }
    fetchEnderecos()
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

  const openGoogleMaps = (coords: Endereco) => {
    const { rua, numero, local, cidade, cep } = coords
    const enderecoFormatado = `${rua}, ${numero}, ${local}, ${cidade}, ${cep}`
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      enderecoFormatado,
    )}`
    window.open(url, '_blank')
  }

  const settings = {
    dots: true,
    infinite: data.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: data.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: data.length > 1,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden w-full">
        <EnderecosHeader />
        {podeGerenciar && (
          <div className="my-4">
            {!openEndereco ? (
              <button className="button" onClick={() => setOpenEndereco(true)}>
                Adicionar endereço
              </button>
            ) : (
              <div className="w-full max-w-2xl">
                <AddEndereco
                  openEndereco={openEndereco}
                  setOpenEndereco={setOpenEndereco}
                />
              </div>
            )}
          </div>
        )}

        <div className="w-full lg:max-w-6xl px-8 pb-4">
          {loading ? (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-2">
                    <SkeletonNew />
                  </div>
                ))}
              </Slider>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col h-40 my-5 border border-dashed border-zinc-300 dark:border-zinc-700 p-5 rounded-lg justify-center items-center text-gray-500">
              <p>Nenhum endereço cadastrado.</p>
            </div>
          ) : (
            <div className="w-full mt-5">
              <Slider {...settings}>
                {data.map((product: Endereco) => {
                  const coords = coordinates[product.id]
                  return (
                    <div key={product.id} className="p-2">
                      <div className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-auto min-h-[450px] overflow-hidden group relative border-[1px] border-zinc-300 dark:border-zinc-800">
                        {podeGerenciar && (
                          <div className="absolute top-2 right-2 flex gap-2 z-[1001]">
                            <button
                              onClick={() => {
                                setOpenEdit(product.id)
                                setSelectedProduct(product)
                              }}
                              className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white text-blue-600 shadow-md transition"
                              title="Editar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setShowModal(product.id)
                                setSelectedProduct(product)
                              }}
                              className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white text-red-600 shadow-md transition"
                              title="Remover"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        )}

                        <div className="h-56 w-full">
                          {coords ? (
                            <MapContainer
                              center={coords}
                              zoom={15}
                              scrollWheelZoom={false}
                              className="h-full w-full"
                            >
                              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                              <Marker position={coords} icon={HouseIcon}>
                                <Popup>{product.local}</Popup>
                              </Marker>
                            </MapContainer>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                              <p className="text-gray-500">
                                Carregando mapa...
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-primary dark:text-secundary mb-2">
                            {product.local}
                          </h3>
                          <p className="text-base text-gray-700 dark:text-gray-300">
                            {product.rua}, {product.numero}
                          </p>
                          <p className="text-base text-gray-600 dark:text-gray-400">
                            {product.cidade} - CEP: {product.cep}
                          </p>
                          <div className="mt-auto pt-4">
                            <button
                              onClick={() => openGoogleMaps(product)}
                              className="button w-full"
                            >
                              Ver no Google Maps
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          )}
        </div>
        <div className="border-t-[1px] border-zinc-300 dark:border-zinc-800 w-[70%] mx-auto mt-16"></div>
      </section>

      {showModal && selectedProduct && (
        <RemoveEndereco id={selectedProduct.id} />
      )}
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
    </>
  )
}
