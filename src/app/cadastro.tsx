import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { router } from "expo-router";

export default function Cadastro(){

    const [cargo,setCargo] = useState('')
    const [empresa,setEmpresa] = useState('')
    const [salario,setSalario] = useState('')

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            if(!user){
                router.replace("/login")
            }
        })
        return unsubscribe
    },[])

    async function salvarVaga() {
        await addDoc(
            collection(db,"vagas"),
            {
                cargo,
                empresa,
                salario
            }
        )
        alert("Vaga cadastrada!")
    }

    return(
        <View>
            <Text>Cadastro de Vagas</Text>
            <TextInput 
            value={cargo}
            onChangeText={setCargo}
            placeholder="Digite o cargo..."
            style={styles.input}
            />
            <TextInput 
            value={empresa}
            onChangeText={setEmpresa}
            placeholder="Digite a empresa..."
            style={styles.input}
            />
            <TextInput 
            value={salario}
            onChangeText={setSalario}
            placeholder="Digite o salário..."
            style={styles.input}
            />
            <TouchableOpacity onPress={salvarVaga} style={styles.botao}>
                <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f4f6f6",
        justifyContent:"center",
        padding:20
    },
    card:{
        backgroundColor:"#fff",
        padding:25,
        borderRadius:20,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:4
        }
    },
    titulo:{
        fontSize:28,
        fontWeight:"bold",
        textAlign:"center",
        color:"#272acf",
        marginTop:25
    },
    input:{
        height:55,
        borderWidth:1,
        borderColor:"#ddd",
        borderRadius:12,
        paddingHorizontal:15,
        backgroundColor:"#fafafa",
        marginBottom:15,
        fontSize:16
    },
    botao:{
        backgroundColor:"#272acf",
        borderRadius:12,
        padding:16,
        alignItems: "center",
        marginTop:10
    },
    textoBotao:{
        color:"#fff",
        fontSize:18,
        fontWeight:"bold"
    }
})