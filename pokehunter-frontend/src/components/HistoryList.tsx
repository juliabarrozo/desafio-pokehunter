import type { HistoryItem } from "../types/type"

type Props = {
  history: HistoryItem[]
}

function HistoryList({ history }: Props) {
  return (
    <div>
      <h3>Histórico</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.date.slice(0, 10)} - {item.city} - {item.temp}°C - {item.pokemon} ({item.type})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryList
