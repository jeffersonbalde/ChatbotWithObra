import { Redirect } from 'expo-router'

export default function index() {
  return (
    // <Redirect href={"/(routes)/start_app"}/>
    <Redirect href={"/(routes)/login"}/>
  )
}