import { auth } from "@/firebase/firebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login(){

    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')

    async function fazerLogin() {
            try{
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    senha
                )
                alert("Login realizado com sucesso!")
                router.push("/")
            } catch (error) {
                alert("Erro ao fazer login")
                console.log(error)
            }
            
    }

    return(
        <View>
            <Text>Login</Text>
            <TextInput 
            placeholder="Digite seu email..."
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            />
            <TextInput 
            placeholder="Digite sua senha..."
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            />
            <TouchableOpacity onPress={fazerLogin}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}