export default function Loading ({ size = 'md' }) {
  const sizing = {
    sm: 'h-5 w-5 border-[4px]',
    md: 'h-10 w-10 border-[8px]',
    lg: 'h-16 w-16 border-[8px]'
  }
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div
        className={`animate-spin  border-info border-t-transparent rounded-full ${sizing[size]}`}
      />
    </div>
  )
}
