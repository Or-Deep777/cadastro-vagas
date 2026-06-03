import { db } from "@/firebase/firebaseConfig";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Home(){
  const [vagas, setVagas] = useState<any[]>([]);

  async function carregarVagas() {
    const snapshot = await getDocs(collection(db, "vagas"));
    const lista: any = [];
    snapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setVagas(lista);
  }

  useEffect(() => { carregarVagas() }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vagas</Text>
      
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/cadastro')}>
        <Text style={styles.textoBotao}>Cadastrar vaga</Text>
      </TouchableOpacity>

      <FlatList 
        data={vagas}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cargo}>{item.cargo}</Text>
            <Text style={styles.empresa}>{item.empresa}</Text>
            <Text style={styles.salario}>R$ {item.salario}</Text>  
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  
  // O botão simples de 3 linhas
  botao: { backgroundColor: "#0400ff", padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Lista de vagas bonitinha
  card: { borderWidth: 1, borderColor: "#e0e0e0", padding: 15, marginBottom: 10, borderRadius: 8 },
  cargo: { fontSize: 18, fontWeight: "bold" },
  empresa: { color: "#666", marginVertical: 3 },
  salario: { color: "#00b050", fontWeight: "bold" }
});