export default function BarrioTitle({ barrio }) {
  return (
    <div className={'text-center'}>
      <span>
        <em>{`${barrio.name} - ${barrio.state} - ads (${barrio?.ads?.length})`}</em>
      </span>
    </div>
  )
}
