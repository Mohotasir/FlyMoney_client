
import logo from "../../../../public/assets/bird.svg";
export default function Navbar() {
  return (
    <div className="fixed">
        <div className="text-2xl font-bold text-purple-600 font-mono flex items-center mx-6 py-2"><img src={logo} height={0} width={50} alt="" />OurForum</div>
    </div>
  )
}
