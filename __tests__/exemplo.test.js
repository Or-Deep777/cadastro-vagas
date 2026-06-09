//const { render } = require("@testing-library/react-native")
import { render } from "@testing-library/react-native"

jest.mock("../src/firebase/firebaseConfig",()=>{
    auth: {}
})

jest.mock("firebase/auth",()=>({
    signInWithEmailAndPassword: jest.fn()
}))

jest.mock("expo-router",()=>({
    router: {
        push: jest.fn()
    }
}))

import { signInWithEmailAndPassword } from 'firebase/auth'
import Login from '../src/app/login'
import { router } from 'expo-router'

test("deve renderizar a tela de login",()=>{
    const tela = render(<Login />)

    console.log(tela)
})