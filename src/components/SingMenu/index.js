import { useUser } from 'src/context/UserContext'

export default function SingMenu() {
    const user = useUser()
    console.log(user)
    return (
        <div >
            menu para logearse
        </div>
    )
}