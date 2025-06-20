'use client'
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
  coordinates: [number, number] | null
}

export default function ItemEndereco({
  item,
  token,
  openEdit,
  setOpenEdit,
  setSelectedProduct,
  coordinates,
}: ItemEnderecoProps) {
  const openGoogleMaps = (coords: Endereco) => {
    const { rua, numero, local, cidade, cep } = coords
    const enderecoFormatado = `${rua}, ${numero}, ${local}, ${cidade}, ${cep}`
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      enderecoFormatado,
    )}`
    window.open(url, '_blank')
  }

  const podeGerenciar = token?.role === 'ADMIN' || token?.role === 'SUPERADMIN'

  return (
    <div
      key={item.id}
      className="bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px]  overflow-hidden group relative w-[47%] max-w-[300px]"
    >
      {/* Botões flutuantes no canto superior direito */}
      {podeGerenciar && (
        <div className="absolute top-2 right-2 flex gap-2 z-[1001]">
          <button
            onClick={() => {
              setOpenEdit(item.id)
              setSelectedProduct(item)
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
          <RemoveEndereco id={item.id} />
        </div>
      )}

      {/* Mapa */}
      <div className="h-56 w-full">
        {coordinates ? (
          <MapContainer
            center={coordinates}
            zoom={15}
            scrollWheelZoom={false}
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
          <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <p className="text-gray-500">Carregando mapa...</p>
          </div>
        )}
      </div>
      {/* Detalhes */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary dark:text-secundary mb-2">
          {item.local}
        </h3>
        <p className="text-base text-gray-700 dark:text-gray-300">
          {item.rua}, {item.numero}
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          {item.cidade} - CEP: {item.cep}
        </p>
        <div className="mt-auto pt-4">
          <button
            onClick={() => openGoogleMaps(item)}
            className="button w-full"
          >
            Ver no Google Maps
          </button>
        </div>
      </div>
      {/* Edit Modal */}
      {openEdit === item.id && (
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
    </div>
  )
}
