import { useNavigate } from "react-router-dom"


export default function DashBoardLayout() {
  const navigate  = useNavigate()
  const handleClick = ()=>{
     localStorage.removeItem("token")
     navigate('/')
  }
  return (
    <div>DashBoardLayout
      <button className="border btn m-5 p-2" onClick={handleClick}>logout</button>
    </div>

  )
}
