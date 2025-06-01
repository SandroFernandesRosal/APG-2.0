'use client'
import { useState, useEffect } from 'react'
import { Endereco } from '@/data/types/endereco'
import EditEndereco from './crud/EditEndereco'
import RemoveEndereco from './crud/RemoveEndereco'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { User } from '@/data/types/user'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const HouseIcon = new L.Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [22, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export interface ItemEnderecoProps {
  item: Endereco
  token: User | null
  openEdit: string | null
  setOpenEdit: (id: string | null) => void
  setSelectedProduct: (product: Endereco | null) => void
}

export default function ItemEndereco({
  item,
  token,
  openEdit,
  setOpenEdit,
  setSelectedProduct,
}: ItemEnderecoProps) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)

  useEffect(() => {
    geocodeAddress(item)
  }, [item])

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
        setCoordinates([parseFloat(lat), parseFloat(lon)])
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

  return (
    <div
      className={`flex justify-between h-[400px] border-[1px] border-zinc-300 dark:border-zinc-800 ${token && 'mb-20 md:mb-24'}`}
      key={item.id}
    >
      <div className="flex justify-center items-center h-[50%]">
        {coordinates ? (
          <MapContainer
            center={coordinates}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={coordinates} icon={HouseIcon}>
              <Popup>
                {item.local}, {item.rua}, {item.numero}, {item.cidade},{' '}
                {item.cep}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Carregando mapa...</p>
        )}
      </div>
      <div className="px-2 gap-1 flex md:text-xl justify-evenly py-1 h-[50%] flex-col items-center">
        <h1 className="text-primary dark:text-secundary text-xl">
          {item.local}
        </h1>
        <h2 className="text-center">
          {item.rua}, {item.numero}, {item.cidade}
        </h2>
        <span className="">CEP: {item.cep}</span>

        <button onClick={() => openGoogleMaps(item)} className="button mb-0">
          Abrir mapa
        </button>
      </div>
      {token?.role === 'ADMIN' && (
        <div className="my-4 flex w-full flex-1 items-end justify-around text-white">
          {openEdit !== item.id ? (
            <button
              className="button"
              onClick={() => {
                setOpenEdit(item.id)
                setSelectedProduct(item)
              }}
            >
              Editar
            </button>
          ) : (
            <EditEndereco
              localInitial={item.local}
              ruaInitial={item.rua}
              cepInitial={item.cep}
              id={item.id}
              numeroInitial={item.numero}
              cidadeInitial={item.cidade}
              setOpenEdit={setOpenEdit}
            />
          )}
          <RemoveEndereco id={item.id} />
        </div>
      )}
    </div>
  )
}
