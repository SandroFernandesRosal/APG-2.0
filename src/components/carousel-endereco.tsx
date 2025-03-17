'use client'
import { FaPlus } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { Endereco } from '@/data/types/endereco'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import SkeletonNew from './skeleton/SkeletonNew'
import { useToken } from '@/hooks/useToken'
import EditEndereco from './crud/EditEndereco'
import RemoveEndereco from './crud/RemoveEndereco'
import AddEndereco from './crud/AddEndereco'
import { Minus } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const HouseIcon = new L.Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [22, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export default function CarouselEndereco({
  titleproducts,
}: {
  titleproducts: string
}) {
  const [data, setData] = useState<Endereco[]>([])
  const [loading, setLoading] = useState(true)
  const token = useToken()
  const [openEndereco, setOpenEndereco] = useState(false)
  const [openEdit, setOpenEdit] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Endereco | null>(null)
  const [coordinates, setCoordinates] = useState<{
    [key: string]: [number, number]
  }>({})

  useEffect(() => {
    setLoading(true)
    api
      .get(`/endereco`)
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

  const openGoogleMaps = (coords: Endereco) => {
    const { rua, numero, local, cidade, cep } = coords
    const enderecoFormatado = `${rua}, ${numero}, ${local}, ${cidade}, ${cep}`
    const url = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`
    window.open(url, '_blank')
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
    ],
  }

  return (
    <>
      <section className="text-textprimary flex flex-col items-center py-4 justify-center overflow-hidden bg-bglight w-full border-[1px] border-zinc-300 dark:border-zinc-800 dark:bg-bgdark">
        <h1 className="text-xl font-bold flex">
          <Minus
            size={45}
            strokeWidth={3}
            className="text-secundary dark:text-primary flex place-self-end"
          />
          <span className="text-primary dark:text-secundary text-2xl">
            Endereços
          </span>
        </h1>

        {token && (
          <>
            {openEndereco === false && (
              <button className="button" onClick={() => setOpenEndereco(true)}>
                Adicionar endereço
              </button>
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

        <div className="flex gap-2 items-center justify-between px-2 w-[80vw] lg:max-w-[1200px] mt-5">
          <h1 className="md:text-2xl w-full font-bold">{titleproducts}</h1>
          <Link
            href={`/enderecos`}
            className="font-bold md:text-lg w-full justify-end flex items-center gap-2"
          >
            <span>Ver todos</span> <FaPlus />
          </Link>
        </div>

        <div className="flex w-full gap-3 justify-center">
          {loading ? (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 gap-2 overflow-hidden"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonNew key={index} />
              ))}
            </Slider>
          ) : data.length === 0 ? (
            <div className="flex flex-col h-full overflow-hidden border-[1px] my-5 border-zinc-400 dark:border-zinc-700 p-5 rounded-lg justify-center items-center">
              <p>Nenhum endereço cadastrado.</p>
            </div>
          ) : (
            <Slider
              {...settings}
              className="w-[80vw] lg:max-w-[1200px] my-5 mx-10 gap-2"
            >
              {data.map((product: Endereco) => {
                const coords = coordinates[product.id]

                return (
                  <div
                    className={`flex  justify-between  h-[400px] border-[1px] border-zinc-300 dark:border-zinc-800   ${token && 'mb-20 md:mb-24'}`}
                    key={product.id}
                  >
                    <div className="flex  justify-center items-center  h-[50%] ">
                      {coords ? (
                        <MapContainer
                          center={coords}
                          zoom={13}
                          className="h-full w-full"
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker position={coords} icon={HouseIcon}>
                            <Popup>
                              {product.local}, {product.rua}, {product.numero},{' '}
                              {product.cidade}, {product.cep}
                            </Popup>
                          </Marker>
                        </MapContainer>
                      ) : (
                        <p>Carregando mapa...</p>
                      )}
                    </div>
                    <div className=" px-2 gap-1 flex md:text-xl justify-evenly py-1   h-[50%] flex-col items-center">
                      <h1 className="text-primary dark:text-secundary text-xl">
                        {product.local}
                      </h1>
                      <h2 className=" text-center">
                        {product.rua}, {product.numero}, {product.cidade}
                      </h2>
                      <span className="">CEP: {product.cep}</span>

                      <button
                        onClick={() => openGoogleMaps(product)}
                        className="button mb-0"
                      >
                        {' '}
                        Abrir mapa
                      </button>
                    </div>
                    {token && (
                      <div className="my-4 flex w-full flex-1 items-end justify-around text-white">
                        {openEdit !== product.id ? (
                          <button
                            className="button !mb-0"
                            onClick={() => {
                              setOpenEdit(product.id)
                              setSelectedProduct(product)
                            }}
                          >
                            Editar
                          </button>
                        ) : null}
                        <RemoveEndereco id={product.id} />
                      </div>
                    )}
                  </div>
                )
              })}
            </Slider>
          )}
        </div>
      </section>
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
