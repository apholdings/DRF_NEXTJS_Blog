export default function LoadingPostCard() {
  return (
    <article className="flex flex-col items-start justify-between">
      {/* Skeleton para la imagen principal */}
      <div className="relative w-full">
        <div className="aspect-video w-full animate-pulse rounded-2xl bg-gray-200 sm:aspect-[2/1] lg:aspect-[3/2]" />
      </div>

      {/* Contenido del post */}
      <div className="max-w-xl space-y-6">
        {/* Skeleton para la fecha y categoría */}
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* Skeleton para el título */}
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />

        {/* Skeleton para la descripción */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </article>
  );
}
