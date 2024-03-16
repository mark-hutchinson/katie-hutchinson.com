export function Section({id, children}) {
  return (
    <div id={id} className={`section ` + id}>
      {children}
    </div>
  )
}