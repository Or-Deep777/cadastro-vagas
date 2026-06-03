import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function Cadastro(){

    const [cargo,setCargo] = useState('')
    const [empresa,setEmpresa] = useState('')
    const [salario,setSalario] = useState('')

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
                <Text>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        padding:10,
        margin:5
    },
    botao:{
        backgroundColor:"#00c3ff",
        borderRadius:8,
        padding:16,
        alignItems: "center"
    }
})