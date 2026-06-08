import { auth } from "@/firebase/firebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Image, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login(){

    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [loading,setLoading] = useState(false)

    async function fazerLogin() {
        if(!email.trim()){
            alert("Informe seu email..")
            return
        }
        if(!senha.trim()){
            alert("Informe sua senha..")
            return
        }
        try{
            setLoading(true)
            await signInWithEmailAndPassword(
                auth,
                email,
                senha
            )
            Alert.alert("Login","Login realizado com sucesso")
            router.push("/")
        } catch (error) {
            if(error.code === "auth/invalid-credential"){
                Alert.alert("Erro","Email ou senha incorretos...")
                return
            }
            if(error.code === "auth/too-many-requests"){
                Alert.alert("Erro","Muitas tentativas de login. Tente mais tarde!")
            }
            Alert.alert("Erro","Email ou senha invalidos")
            console.log(error)
        }
        setEmail("")
        setSenha("")
    }

    return(
        <View style={styles.container}>
            <Image 
            source={require("../../assets/images/logo-vagas.png")}
            style={{flex:1, justifyContent:"center", marginLeft:300}}
            />
            <TextInput 
            placeholder="Digite seu email..."
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
            />
            <TextInput 
            placeholder="Digite sua senha..."
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={styles.input}
            />
            <TouchableOpacity onPress={fazerLogin} style={styles.botao} disabled={loading}>
                {loading?(<ActivityIndicator color="#fff" />) : (
                <Text style={styles.textoBotao}>Fazer login</Text> )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push("/cadastroUsuario")}>
                <Text style={styles.link}>Fazer cadastro</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        padding:20,
        backgroundColor:"#f8fafc"
    },
    titulo:{
        fontSize:28,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:30
    },
    input:{
        borderWidth:1,
        borderColor:"#d1d5db",
        borderRadius:10,
        padding:15,
        marginBottom:15,
        backgroundColor:"#fff"
    },
    botao:{
        backgroundColor:"#2563eb",
        padding:15,
        borderRadius:10,
        alignItems:"center"
    },
    textoBotao:{
        color:"#fff",
        fontSize:18,
        fontWeight:"bold"
    },
    link:{
        textAlign:"center",
        marginTop:20,
        color:"2563eb",
        fontWeight:"bold"
    }
})