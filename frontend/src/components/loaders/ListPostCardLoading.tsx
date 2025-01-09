interface ComponentProps {
  showImage?: boolean;
}

export default function ListPostCardLoading({ showImage = true }: ComponentProps) {
  return (
    <article className="relative isolate flex flex-col gap-6 lg:flex-row">
      {/* Imagen/Carga del thumbnail */}
      {showImage && (
        <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-48 lg:shrink-0">
          <div className="absolute inset-0 h-full w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
      )}

      {/* Contenido del post */}
      <div className="flex flex-1 flex-col space-y-4">
        {/* Placeholder del encabezado */}
        <div className="flex items-center gap-x-4">
          <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Placeholder del título */}
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />

        {/* Placeholder del subtítulo */}
        <div className="h-4 w-5/6 animate-pulse rounded-lg bg-gray-200" />

        {/* Placeholder de descripción */}
        <div className="h-4 w-full animate-pulse rounded-lg bg-gray-200" />
        <div className="h-4 w-4/5 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </article>
  );
}

ListPostCardLoading.defaultProps = {
  showImage: true,
};
