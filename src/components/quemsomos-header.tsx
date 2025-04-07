import Link from 'next/link'
import Image from 'next/image'
import logob from '../../public/img/logob.png'

export default function QuemSomosHeader() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center ">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/igreja2.png)] bg-cover bg-center  scale-110"></div>

        <Image
          src={logob}
          height={200}
          width={200}
          priority
          quality={100}
          alt="logo do site"
          className="relative z-10 w-[200px] object-contain md:h-full "
        />
      </div>

      <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
        <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
          Ministerio Alcançados pela Graça
        </h1>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-xl italic">
            &quot;Porque pela graça sois salvos, por meio da fé.&ldquo; -
            Efésios 2:8
          </h2>

          <div>
            <p className="mb-4">
              Fundada em XX de X de XXXX, somos a Igreja Evangélica Alcançados
              pela Graça, uma comunidade de fé comprometida com a proclamação do
              evangelho e a edificação dos cristãos. Atuamos em três
              localidades, levando a mensagem de Cristo e promovendo comunhão e
              crescimento espiritual. Nossa missão é alcançar vidas com a graça
              de Deus, fortalecendo famílias e edificando discípulos.
            </p>
            <Link
              href={'/sobre'}
              className="button p-2 !text-white !border-secundary"
            >
              Conheça nossa Igreja
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
