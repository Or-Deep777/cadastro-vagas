import { auth, db } from "@/firebase/firebaseConfig";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Home(){
  const [vagas, setVagas] = useState<any[]>([])

  async function logout() {
    try{
      await signOut(auth)
      router.replace("/login")
    } catch (error) {
      console.log(error)
    }
  }

  async function carregarVagas() {
    const snapshot = await getDocs(collection(db, "vagas"))
    const lista: any = []
    snapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() })
    })
    setVagas(lista)
  }

  useEffect(() => { carregarVagas() }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vagas</Text>
      
      <TouchableOpacity style={styles.botaoCadastrar} onPress={() => router.push('/cadastro')}>
        <Text style={styles.textoBotao}>Cadastrar vaga</Text>
      </TouchableOpacity>

      <FlatList 
        data={vagas}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cargo}>{item.cargo}</Text>
            <Text style={styles.empresa}>{item.empresa}</Text>
            <Text style={styles.salario}>R$ {item.salario}</Text>  
          </View>
        )}
      />

      <TouchableOpacity onPress={logout} style={styles.botaoLogout}>
        <Text style={styles.textoLogout}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f4f6f8" 
  },
  titulo: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color:"#1e3a8a",
    marginBottom: 20,
    textAlign:"center"
  },
  botaoCadastrar: { 
    backgroundColor: "#2563eb", 
    padding: 15,
    borderRadius: 14, 
    alignItems: "center", 
    marginBottom: 20,
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:3
    } 
  },
  textoBotao: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 17
  },
  card: { 
    borderColor: "#fff", 
    padding: 18,
    marginBottom: 15, 
    borderRadius: 15,
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:0
    },
    shadowOpacity:0.08,
    shadowRadius:3,
    elevation:3
  },
  cargo: { 
    fontSize: 20,
    fontWeight: "bold",
    color:"#111827",
    marginBottom:8
  },
  empresa: { 
    fontSize: 16,
    color: "#4b5563", 
    marginBottom:5
  },
  salario: { 
    fontSize: 18,
    color: "#16a34a", 
    fontWeight: "bold" 
  },
  botaoLogout:{
    backgroundColor:"#dc2626",
    padding:15,
    borderRadius:14,
    alignItems:"center",
    marginTop:10
  },
  textoLogout:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  }
});