import { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Libro } from './src/models/Libro';
import { LibroService } from './src/services/LibroService';
import { pruebaSingleton } from './src/tests/pruebaSingleton';

pruebaSingleton();
const servicio = new LibroService();

export default function App() {
  const [libros, setLibros] = useState<Libro[]>(servicio.obtenerTodos());
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');
  const [error, setError] = useState('');

  const agregar = () => {
    try {
      servicio.agregar(titulo, autor, Number(anio));
      setLibros(servicio.obtenerTodos());
      setTitulo('');
      setAutor('');
      setAnio('');
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const eliminar = (id: number) => {
    servicio.eliminar(id);
    setLibros(servicio.obtenerTodos());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}> Mis Libros</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />
        <TextInput
          style={styles.input}
          placeholder="Año"
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <Pressable style={styles.botonAgregar} onPress={agregar}>
          <Text style={styles.botonTexto}>Agregar libro</Text>
        </Pressable>
      </View>

      <FlatList
        data={libros}
        keyExtractor={(l) => String(l.id)}
        ListEmptyComponent={<Text style={styles.vacio}>No hay libros registrados.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitulo}>{item.titulo}</Text>
              <Text style={styles.itemSub}>
                {item.autor} · {item.anio} ({item.antiguedad()} años)
              </Text>
            </View>
            <Pressable style={styles.botonEliminar} onPress={() => eliminar(item.id)}>
              <Text style={styles.botonTexto}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16, paddingTop: 48 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  form: { gap: 8, marginBottom: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  error: { color: '#c0392b' },
  botonAgregar: { backgroundColor: '#2e86de', padding: 12, borderRadius: 8, alignItems: 'center' },
  botonEliminar: { backgroundColor: '#e74c3c', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  botonTexto: { color: '#fff', fontWeight: '600' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
  },
  itemTitulo: { fontSize: 16, fontWeight: '600' },
  itemSub: { color: '#666' },
  vacio: { textAlign: 'center', color: '#888', marginTop: 24 },
});
