import { useParams, useRoutes } from "react-router-dom"

export default function LetterBox(){
  const {id} = useParams();
  return <div>{id}</div>
}